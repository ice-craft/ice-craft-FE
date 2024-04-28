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

import { DisconnectButton, useLocalParticipant, useParticipants, useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useEffect, useRef, useState } from "react";
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
  const { title, setIsOpen, setTitle, setMessage, setTimer, setIsClose } = useShowModalStore();
  const [timerIds, setTimerIds] = useState<NodeJS.Timeout[]>([]); // 여러 setTimeout의 타이머 상태를 저장하여 return시 한번에 제거
  const [votedPlayer, setVotedPlayer] = useState("");

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

  //NOTE -  모든 user들의 정보
  const participants = useParticipants();
  // console.log("participants", participants);

  //훅 정리
  // const { localParticipant } = useLocalParticipant(); //로컬 사용자
  // const [remoteParticipant] = useRemoteParticipants(); //다른 사용자

  useEffect(() => {
    //NOTE - 게임 시작
    socket.on("r0NightStart", () => {
      clearActiveParticipant(); //캠 이미지 및 활성화된 user 정보 초기화

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
    });

    //NOTE - 카메라 및 마이크 off
    socket.on("r0TurnAllUserCameraMikeOff", () => r0TurnAllUserCameraMikeOffHandler(tracks, userId));

    //NOTE - "역할 배정을 시작하겠습니다."" modal창 띄우기
    socket.on("r0SetAllUserRole", () => {
      console.log("r0SetAllUserRole 수신");

      // 10초 후에 setStatus와 socket.emit 실행
      const r0SetAllUserRoleTimer = setTimeout(() => {
        socket.emit("r0SetAllUserRole", roomId);
        console.log("r0SetAllUserRole 송신");
      }, 10000);

      setTimerIds((prevTimerIds) => [...prevTimerIds, r0SetAllUserRoleTimer]);
    });

    //NOTE - 서버에서 배정한 직업에 대한 user의 정보 ==> 객체형태의 배열로 받는다.{[]}
    socket.on("r0ShowAllUserRole", (role) => {
      console.log("r0ShowAllUserRole 수신");

      console.log(`역할들 : ${role}`);

      socket.emit("r0ShowAllUserRole", roomId);
      console.log("r0ShowAllUserRole 송신");
    });

    //NOTE - "마피아들은 고개를 들어 서로를 확인해 주세요." 모달창 띄우기
    socket.on("r0ShowMafiaUserEachOther", () => {
      r0ShowMafiaUserEachOther({
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
    });

    //NOTE -  마피아 유저 캠 및 오디오 On
    socket.on("r0TurnMafiaUserCameraOn", (player) => {
      //임시 데이터
      const players = ["664cdff0-8fbe-47db-bb66-5006866fe3b8"];
      r0TurnMafiaUserCameraOnHandler({
        tracks,
        localUserId,
        participants,
        players,
        userId,
        roomId,
        sources,
        setTimerIds
      });
    });

    //NOTE -  마피아 유저 캠 및 오디오 Off
    socket.on("r0TurnMafiaUserCameraOff", (player) => {
      //임시 데이터
      const players = ["664cdff0-8fbe-47db-bb66-5006866fe3b84"];
      r0TurnMafiaUserCameraOffHandler({
        tracks,
        localUserId,
        participants,
        players,
        userId,
        roomId,
        sources,
        setTimerIds
      });
    });

    //NOTE -  (토론시간) 아침이 시작되었습니다 모달창 띄우기
    socket.on("r1MorningStart", () => {
      clearActiveParticipant(); //캠 이미지 및 활성화된 user 정보 초기화
      r1MorningStartHandler({
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
    });

    //NOTE - 전체 user의 캠 및 오디오 ON
    socket.on("r1TurnAllUserCameraMikeOn", () => {
      r1TurnAllUserCameraMikeOnHandler(tracks, userId);
    });

    //NOTE - UI 모달창 띄우기:  "모든 유저는 토론을 통해 마피아를 찾아내세요." (?)
    socket.on("r1FindMafia", () => {
      r1FindMafiaHandler({
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
    });

    //NOTE - UI 모달창 띄우기: 토론이 끝났습니다.(토론 시간 종료)
    socket.on("r1MeetingOver", () => {
      r1MeetingOverHandler({
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
    });
    // console.log("OutState", votedPlayer);
    //NOTE - UI 모달창 띄우기: 마피아일 것 같은 사람의 화면을 클릭해주세요.(투표시간)
    socket.on("r1VoteToMafia", () => {
      r1VoteToMafiaModalHandler({
        setIsOpen,
        setTitle,
        setMessage,
        setTimer,
        setIsClose,
        setIsOverlay,
        clearActiveParticipant
      });

      // 의존성 배열에 votedPlayer, test.current 넣어 사용해봤지만 socket 내부쪽에서는 상태 변화가 이루어지지 않는 걸 볼 수 있다.
      // console.log("state", votedPlayer);
    });

    //NOTE - UI 모달창 띄우기: 투표 개표(투표결과)
    socket.on("r1ShowVoteToResult", (voteBoard) => {
      // console.log("state", votedPlayer);

      r1ShowVoteToResultHandler({
        roomId,
        userId,
        votedPlayer,
        voteBoard,
        setIsOpen,
        setTitle,
        setMessage,
        setTimer,
        setIsClose,
        setIsOverlay,
        setTimerIds,
        clearActiveParticipant
      });
    });

    return () => {
      // 저장된 모든 타이머 클리어
      // 의존성 배열에 track을 제거하고 사용하면 문제 없다.
      // timerIds.forEach((timerId) => {
      //   console.log("timerId", timerId);
      //   clearTimeout(timerId);
      // });

      socket.off("r0NightStart");
      socket.off("r0TurnAllUserCameraMikeOff");
      socket.off("r0SetAllUserRole");
      socket.off("r0ShowAllUserRole");
      socket.off("r0ShowMafiaUserEachOther");
      socket.off("r0TurnMafiaUserCameraOn");
      socket.off("r0TurnMafiaUserCameraOff");
      socket.off("r1MorningStart");
      socket.off("r1TurnAllUserCameraMikeOn");
      socket.off("r1FindMafia");
      socket.off("r1MetingOver");
      socket.off("r1VoteToMafia");
      socket.off("r1ShowVoteToResult");
    };
  }, [tracks]);

  useEffect(() => {
    if (title.includes("투표 시간")) {
      console.log("OutState", votedPlayer);
      r1VoteToMafiaHandler({ votedPlayer, setTimerIds, setIsOverlay, clearActiveParticipant });
    }
  }, [votedPlayer]);

  const checkClickHandle = (event: React.MouseEvent<HTMLElement>, participant: Participant, index: number) => {
    event.stopPropagation();
    toggleOverlay(participant.sid, index); // 캠 클릭시 이미지 띄우기

    const exampleSocket = "마피아시간";
    const exampleServerUserinfo: string = "시민";

    if (!participant.metadata) {
      return;
    }

    if (title.includes("투표 시간")) {
      setVotedPlayer(participant.metadata); //userId값 상태 저장
    }

    //NOTE - 마피아 시간 종료
    if (exampleSocket.includes("mafiaEndTime")) {
      // 마지막으로 클릭 된 user의 정보를 server에 전달
      if (participant.metadata) {
        console.log("userId", participant.metadata);
        setIsOverlay(false);
        clearActiveParticipant();
      }
    }

    //NOTE - 의사 시간 종료
    if (exampleSocket.includes("doctorEndTime")) {
      //NOTE - 의사가 선택한 유저의 정보
      if (participant.metadata) {
        console.log("userId", participant.metadata);
        setIsOverlay(false);
        clearActiveParticipant();
      }
    }

    //NOTE - 경찰 시간
    const policeTime = () => {
      // 클릭한 유저의 정보를 서버에 전달
      const postData = participant.metadata;

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

  BeforeUnloadHandler();

  return (
    <section className={S.section}>
      <LocalParticipant tracks={tracks} checkClickHandle={checkClickHandle} />
      <RemoteParticipant tracks={tracks} checkClickHandle={checkClickHandle} />
      <div className={S.goToMainPage}>
        <button onClick={() => allAudioSetting(tracks, false)} style={{ background: "red" }}>
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
