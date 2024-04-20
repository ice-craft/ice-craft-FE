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
import { Participant, Track } from "livekit-client";
import { useEffect, useState } from "react";
import CheckModal from "./CheckModal";
import GroupMafiaModal from "./GroupMafiaModal";
import LocalParticipant from "./LocalParticipant";
import MafiaToolTip from "./MafiaToolTip";
import RemoteParticipant from "./RemoteParticipant";
import UserRoleModal from "./UserRoleModal";

const MafiaPlayRooms = () => {
  const { userId, roomId, nickname } = useConnectStore();
  const { toggleOverlay, setIsOverlay, clearActiveParticipant, setIsRemoteOverlay } = useOverlayStore();
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

  const gameStart = () => {
    setIsOverlay(false); //클릭 이벤트 비활성화
    clearActiveParticipant(); //캠 이미지 및 활성화된 user 정보 초기화
  };

  const morning = () => {
    setIsOverlay(false); //클릭 이벤트 비활성화
    clearActiveParticipant(); //캠 이미지 및 활성화된 user 정보 초기화
  };

  const voteTime = () => {
    setIsOverlay(true);
  };

  const night = () => {
    setIsOverlay(false);
    clearActiveParticipant();
  };

  const mafiaTime = () => {
    //NOTE - 마피아 유저에게만 클릭 이벤트 활성화
    if (localUserId == "getUserId") {
      setIsRemoteOverlay(true);
      setImageState(CamCheck);
    }
  };

  const mafiaEndTime = () => {
    setIsOverlay(false);
    clearActiveParticipant();
  };

  const doctorTime = () => {
    //NOTE - 의사 유저에게만 클릭 이벤트 활성화
    if (localUserId == "1111") {
      setIsRemoteOverlay(true);
      setImageState(CamCheck);
    }
  };

  const doctorEndTime = () => {
    setIsOverlay(false);
    clearActiveParticipant();
  };

  const policeTime = () => {
    //NOTE - 경찰 유저에게만 클릭 이벤트 활성화
    if (localUserId == "1111") {
      setIsRemoteOverlay(true);
    }
  };

  const policeEndTime = () => {
    setIsOverlay(false);
    clearActiveParticipant();
  };

  const checkClickHandle = (event: React.MouseEvent<HTMLElement>, participant: Participant, index: number) => {
    event.stopPropagation();
    toggleOverlay(participant.sid, index);
    console.log("checkClickHandle", participant);

    const exampleSocket = "마피아시간";
    const exampleServerJob: string = "시민";

    if (exampleSocket.includes("mafiaEndTime")) {
      // 마지막으로 클릭 된 user의 정보를 server에 전달
      if (participant.identity == "1111") {
        console.log(userId);
        setIsOverlay(false);
        clearActiveParticipant();
      }
    }

    if (exampleSocket.includes("doctorEndTime")) {
      //NOTE - 의사가 선택한 유저의 정보
      if (participant.identity == "1111") {
        console.log(userId);
        setIsOverlay(false);
        clearActiveParticipant();
      }
    }

    if (exampleSocket.includes("policeTime")) {
      // 클릭한 유저의 정보를 서버에 전달
      // 현재 클라이언트 측에서 전달할 수 있는 내용은 nickName
      // 방에 접속한 user의 정보를 가져와 닉네임과 비교하여 userId값을 서버에 전달
      // participant.identity == users[0].nickname ==> users[0].userId
      if (participant.identity == nickname) {
        console.log(participant.metadata);
      }

      // 서버에서 전송 받은 유저의 정보(직업)
      if (exampleServerJob == "마피아") {
        setImageState(Mafia);
      }

      if (exampleServerJob == "의사") {
        setImageState(Doctor);
      }

      if (exampleServerJob == "시민") {
        setImageState(Citizen);
      }
    }
  };

  const leaveRoom = () => {
    socket.emit("exitRoom", roomId, userId);
  };

  //NOTE - 조건에 따른 모달창 띄우기 (case: "check" 라고 들어와야 랜더링 가능, 모달 이름들은 서버랑 이야기 해봐야함. ^^...)
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
