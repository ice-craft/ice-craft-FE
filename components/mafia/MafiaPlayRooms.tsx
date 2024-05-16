import CamCheck from "@/assets/images/cam_check.svg";
import Citizen from "@/assets/images/cam_citizen.svg";
import Doctor from "@/assets/images/cam_doctor.svg";
import Mafia from "@/assets/images/cam_mafia.svg";
import useConnectStore from "@/store/connect-store";
import { useCamClickImageState } from "@/store/image-store";
import useOverlayStore from "@/store/overlay-store";
import useShowModalStore from "@/store/showModal.store";
import S from "@/style/livekit/livekit.module.css";
import {
  eventError,
  r0NightStartHandler,
  r0ShowMafiaUserEachOther,
  r0TurnAllUserCameraMikeOffHandler,
  r0TurnMafiaUserCameraOffHandler,
  r0TurnMafiaUserCameraOnHandler,
  r1FindMafiaHandler,
  r1MeetingOverHandler,
  r1MorningStartHandler,
  r1ShowVoteToResultHandler,
  r1TurnAllUserCameraMikeOnHandler,
  r1VoteToMafiaHandler,
  r1VoteToMafiaModalHandler
} from "@/utils/mafiaSocket/mafiaSocket";
import { allAudioSetting } from "@/utils/participantCamSettings/camSetting";
import BeforeUnloadHandler from "@/utils/reload/beforeUnloadHandler";
import { socket } from "@/utils/socket/socket";

import {
  DisconnectButton,
  useLocalParticipant,
  useParticipantTile,
  useParticipants,
  useTracks
} from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
import CheckModal from "@/components/modal/CheckModal";
import GroupMafiaModal from "@/components/modal/GroupMafiaModal";
import LocalParticipant from "./LocalParticipant";
import MafiaToolTip from "./MafiaToolTip";
import RemoteParticipant from "./RemoteParticipant";
import UserRoleModal from "@/components/modal/UserRoleModal";
import useSocket from "@/hooks/useSocket";

const MafiaPlayRooms = () => {
  const { userId, roomId, nickname } = useConnectStore();
  const { toggleOverlay, setIsOverlay, clearActiveParticipant, setIsRemoteOverlay } = useOverlayStore();
  const { setImageState } = useCamClickImageState();
  const [currentModal, setCurrentModal] = useState<React.ReactNode>(<GroupMafiaModal />);
  const { title, setIsOpen, setTitle, setMessage, setTimer, setIsClose } = useShowModalStore();
  const [timerIds, setTimerIds] = useState<NodeJS.Timeout[]>([]); // 여러 setTimeout의 타이머 상태를 저장하여 return시 한번에 제거
  const [role, setRole] = useState(null);
  const [votedPlayer, setVotedPlayer] = useState("");
  const [isVoted, setVoted] = useState(false);
  const timerRef = useRef(false);
  const [voteTimerClose, setVoteTimerClose] = useState<NodeJS.Timeout>();

  const timeOutClear = useRef<NodeJS.Timeout[]>([]);
  const errorCount = useRef(0);

  //NOTE -  전체 데이터
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true }
    ],
    { onlySubscribed: false }
  );

  const sources = tracks.map((item) => item.source);

  //NOTE -  로컬 user의 ID
  const localParticipant = useLocalParticipant();
  const localUserId = localParticipant.localParticipant.identity;
  // console.log("localParticipant", (localParticipant.isCameraEnabled = true));

  //NOTE -  모든 user들의 정보
  const participants = useParticipants();
  // console.log("participants", participants);

  const sockets = [
    {
      eventName: "r0NightStart",
      handler: () => {
        r0NightStartHandler({
          roomId,
          userId,
          votedPlayer,
          setIsOpen,
          setTitle,
          setMessage,
          setTimer,
          setIsClose,
          setIsOverlay,
          setTimerIds,
          clearActiveParticipant
        });
      }
    },
    {
      eventName: "r0TurnAllUserCameraMikeOff",
      handler: () => {
        r0TurnAllUserCameraMikeOffHandler(tracks, userId);
      }
    }
    // 추가 소켓 리스트
  ];

  useSocket(sockets);

  useEffect(() => {
    socket.on("r0NightStartError", () => {
      eventError("r0NightStart", { timeOutClear, errorCount });
    });

    socket.on("r0TurnAllUserCameraMikeOffError", () => {
      eventError("r0TurnAllUserCameraMikeOff", { timeOutClear, errorCount });
    });

    socket.on("r0SetAllUserRoleError", () => {
      eventError("r0SetAllUserRole", { timeOutClear, errorCount });
    });
  }, []);

  // Clear Timer
  useEffect(() => {
    return () => {
      console.log("timerId", timerIds);
      // 저장된 모든 타이머 클리어
      timerIds.forEach((timerId) => {
        console.log("timerId", timerId);
        clearTimeout(timerId);
      });
    };
  }, []);

  useEffect(() => {
    if (title.includes("투표 시간")) {
      r1VoteToMafiaHandler({
        votedPlayer,
        isVoted,
        timerRef,
        setVoteTimerClose,
        setIsOverlay,
        setVoted,
        clearActiveParticipant
      });
      console.log("votedPlayer", votedPlayer);
    }

    // 컴포넌트가 unmount되면 타이머를 클리어
    return () => clearTimeout(voteTimerClose);

    // title: 처음 동작 시기를 설정, votedPlayer: 변화되는 값을 설정, isVoted: 타이머 종료 후 다음 동작 설정
  }, [title, votedPlayer, isVoted]);

  const checkClickHandle = (event: React.MouseEvent<HTMLElement>, participant: Participant, index: number) => {
    event.stopPropagation();
    toggleOverlay(participant.sid, index); // 캠 클릭시 이미지 띄우기

    const exampleSocket = "마피아시간";
    const exampleServerUserinfo: string = "시민";

    if (!participant.identity) {
      return;
    }

    if (title.includes("투표 시간")) {
      setVotedPlayer(participant.identity); //userId값 상태 저장
    }

    //NOTE - 마피아 시간 종료
    if (exampleSocket.includes("mafiaEndTime")) {
      // 마지막으로 클릭 된 user의 정보를 server에 전달
      if (participant.identity) {
        console.log("userId", participant.identity);
        setIsOverlay(false);
        clearActiveParticipant();
      }
    }

    //NOTE - 의사 시간 종료
    if (exampleSocket.includes("doctorEndTime")) {
      //NOTE - 의사가 선택한 유저의 정보
      if (participant.identity) {
        console.log("userId", participant.identity);
        setIsOverlay(false);
        clearActiveParticipant();
      }
    }

    //NOTE - 경찰 시간
    const policeTime = () => {
      // 클릭한 유저의 정보를 서버에 전달
      const postData = participant.identity;

      // 서버에서 전송 받은 유저의 정보(직업)
      if (exampleServerUserinfo == postData) {
        setImageState(Mafia);
      }

      if (exampleServerUserinfo == postData) {
        setImageState(Doctor);
      }

      if (exampleServerUserinfo == postData) {
        setImageState(Citizen);
      }
      //경찰인 경우 클릭 이벤트는 1번으로 제한
      setIsOverlay(false);
    };

    //NOTE - 경찰 시간 종료
    if (exampleSocket.includes("policeTime")) {
      //시간 종료 후 이미지 초기화
      clearActiveParticipant();
    }
  };

  const leaveRoom = () => {
    socket.emit("exitRoom", roomId, userId);
  };

  BeforeUnloadHandler();

  return (
    <section className={S.section}>
      <LocalParticipant tracks={tracks} checkClickHandle={checkClickHandle} />
      <RemoteParticipant tracks={tracks} checkClickHandle={checkClickHandle} />
      <div className={S.goToMainPage}>
        <button
          onClick={() => {
            allAudioSetting(tracks, false);
          }}
          style={{ background: "red" }}
        >
          전체 소리 끄기
        </button>
        <DisconnectButton onClick={leaveRoom}>나가기</DisconnectButton>
      </div>
      <MafiaToolTip />
      {currentModal}
    </section>
  );
};

export default MafiaPlayRooms;
