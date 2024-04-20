import CamCheck from "@/assets/images/cam_check.svg";
import Citizen from "@/assets/images/cam_citizen.svg";
import Doctor from "@/assets/images/cam_doctor.svg";
import Mafia from "@/assets/images/cam_mafia.svg";
import useConnectStore from "@/store/connect-store";
import { useCamClickImageState } from "@/store/image-store";
import useOverlayStore from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import {
  allAudioSetting,
  allMediaSetting,
  specificUserAudioSetting,
  specificUserVideoSetting
} from "@/utils/participantCamSettings/camSetting";
import { socket } from "@/utils/socket/socket";
import { DisconnectButton, useLocalParticipant, useParticipantTracks, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LocalParticipant from "./LocalParticipant";
import MafiaToolTip from "./MafiaToolTip";
import RemoteParticipant from "./RemoteParticipant";
import { useExitStore } from "@/store/exit-store";
import CheckModal from "./CheckModal";
import UserRoleModal from "./UserRoleModal";
import GroupMafiaModal from "./GroupMafiaModal";

const MafiaPlayRooms = () => {
  const { userId, roomId } = useConnectStore();
  const { toggleOverlay } = useOverlayStore();
  const { setIsExit } = useExitStore();
  const router = useRouter();
  const { setImageState } = useCamClickImageState();
  const [currentModal, setCurrentModal] = useState<React.ReactNode>(<GroupMafiaModal />);

  //NOTE -  전체 데이터
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true }
    ],
    { onlySubscribed: false }
  );

  const sources = tracks.map((item) => item.source);

  //NOTE -  로컬 user의 정보
  const localParticipant = useLocalParticipant();
  const localUserId = localParticipant.localParticipant.metadata;
  /*
    //훅 정리
    const { localParticipant } = useLocalParticipant(); //로컬 사용자
    const [remoteParticipant] = useRemoteParticipants(); //다른 사용자
  */

  useEffect(() => {
    socket.on("showModal", (message) => {
      //NOTE - 밤일 경우 모든 user의 캠 및 마이크 off
      if (message.includes("밤")) {
        allMediaSetting(tracks, false);
      }
      //NOTE - 아침일 경우 모든 user의 캠 및 마이크 on
      if (message.includes("아침")) {
        allMediaSetting(tracks, true);
      }
      //NOTE - 투표시간일 경우 모든 user의 마이크 off
      if (message.includes("투표")) {
        allAudioSetting(tracks, false);
      }
    });

    // 특정 user의 캠을 활성화 및 비활성화
    socket.on("setCamera", (userId, isOn) => {
      //NOTE -  1) 특정 유저의 track을 받아온다.
      const specificUser = useParticipantTracks(sources, userId);
      //NOTE -  2) 현재 방의 유저 중에 특정 user인지를 파악한다.
      if (localUserId === userId) {
        //NOTE -  3) 해당 특정 유저일 경우 track 및 boolean값을 통해 캠 활성화 및 비활성화
        specificUserVideoSetting(specificUser, isOn);
      }
    });

    // 특정 user의 마이크를 활성화 및 비활성화
    socket.on("setMike", (userId, isOn) => {
      //NOTE 1) 특정 유저의 track을 받아온다.
      const specificUser = useParticipantTracks(sources, userId);
      //NOTE 2) 현재 방의 유저 중에 특정 user인지를 파악한다.
      if (localUserId === userId) {
        //NOTE  3) 해당 특정 유저일 경우 track 및 boolean값을 통해 캠 활성화 및 비활성화
        specificUserAudioSetting(specificUser, isOn);
      }
    });

    return () => {
      socket.off("showModal");
      socket.off("setCamera");
      socket.off("setMike");
    };
  }, []);

  const checkClickHandle = (event: React.MouseEvent<HTMLElement>, participantSid: string, index: number) => {
    event.stopPropagation();

    const exampleServerData: string = "마피아시간";
    const exampleJob: string = "시민";

    // 해당 시간(투표 시간 및 저녁시간의 특정 직업의 능력)에 캠 클릭 시 user의 정보(id 및 nickname)을 서버에 전달 ==> 서버에서 직업 및 특정 값을 알려준다.
    // 클라이언트에서는 정답에 대한 이미지를 띄어준다.

    // 이미지 조건부
    //마피아 시간 or 의사시간 or 투표시간
    if (exampleServerData === "마피아시간" || "의사시간" || "투표시간") {
      setImageState(CamCheck);
    }

    // 경찰 시간
    if (exampleServerData === "경찰") {
      if (exampleJob == "의사") {
        setImageState(Doctor);
      } else if (exampleJob == "마피아") {
        setImageState(Mafia);
      } else if (exampleJob == "시민") {
        setImageState(Citizen);
      }
    }

    toggleOverlay(participantSid, index);
  };

  const leaveRoom = () => {
    socket.emit("exitRoom", roomId, userId);
  };

  //NOTE - 조건에 따른 모달창 띄우기 (case: "chack" 라고 들어와야 랜더링 가능, 모달 이름들은 서버랑 이야기 해봐야함. ^^...)
  useEffect(() => {
    const showModal = (modalType: string) => {
      switch (modalType) {
        case "check":
          setCurrentModal(<CheckModal />);
          break;
        case "globalModal":
          setCurrentModal(<GroupMafiaModal />);
          break;
        case "userRole":
          setCurrentModal(<UserRoleModal />);
          break;
        default:
          setCurrentModal(null);
      }
    };

    socket.on("showModal", showModal);

    return () => {
      socket.off("showModal", showModal);
    };
  }, []);

  return (
    <section className={S.section}>
      <LocalParticipant tracks={tracks} checkClickHandle={checkClickHandle} />
      <RemoteParticipant tracks={tracks} checkClickHandle={checkClickHandle} />
      <div className={S.goToMainPage}>
        <DisconnectButton onClick={leaveRoom}>나가기</DisconnectButton>
      </div>
      <MafiaToolTip />
      {currentModal}
    </section>
  );
};

export default MafiaPlayRooms;
