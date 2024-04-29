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
  r0TurnMafiaUserCameraOnHandler
} from "@/utils/mafiaSocket/mafiaSocket";
import { allAudioSetting } from "@/utils/participantCamSettings/camSetting";
import BeforeUnloadHandler from "@/utils/reload/beforeUnloadHandler";
import { socket } from "@/utils/socket/socket";
import { setStatus } from "@/utils/supabase/statusAPI";
import { DisconnectButton, useLocalParticipant, useRemoteParticipants, useTracks } from "@livekit/components-react";
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
  const { setIsOpen, setTitle, setMessage, setTimer, setIsClose } = useShowModalStore();
  const [timerIds, setTimerIds] = useState<NodeJS.Timeout[]>([]); // 여러 setTimeout의 타이머 상태를 저장하여 return시 한번에 제거
  const [role, setRole] = useState(null);

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

  //NOTE -  원격 user들의 정보
  const remoteParticipants = useRemoteParticipants();

  //훅 정리
  // const { localParticipant } = useLocalParticipant(); //로컬 사용자
  // const [remoteParticipant] = useRemoteParticipants(); //다른 사용자

  useEffect(() => {
    //NOTE - 게임 시작
    socket.on("r0NightStart", () => {
      r0NightStartHandler({
        roomId,
        userId,
        setIsOpen,
        setTitle,
        setMessage,
        setTimer,
        setIsClose,
        setIsOverlay,
        setTimerIds
      });
    });

    //NOTE - 카메라 및 마이크 off
    socket.on("r0TurnAllUserCameraMikeOff", () => r0TurnAllUserCameraMikeOffHandler(tracks, userId, roomId));

    //NOTE - "역할 배정을 시작하겠습니다."" modal창 띄우기
    socket.on("r0SetAllUserRole", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r0SetAllUserRole 수신");

      // 10초 후에 setStatus와 socket.emit 실행
      const r0SetAllUserRoleTimer = setTimeout(async () => {
        await setStatus(userId, { r0SetAllUserRole: true });
        socket.emit("r0SetAllUserRole", roomId);
        console.log("r0SetAllUserRole 송신");
      }, 10000);

      setTimerIds((prevTimerIds) => [...prevTimerIds, r0SetAllUserRoleTimer]);
    });

    //NOTE - 서버에서 배정한 직업에 대한 user의 정보 ==> 객체형태의 배열로 받는다.{[]}
    socket.on("r0ShowAllUserRole", async (role) => {
      console.log("r0ShowAllUserRole 수신");

      setIsOpen(true);
      setRole(role);
      setCurrentModal(<UserRoleModal role={role} setRole={setRole} />);
      console.log(`역할들 : ${role}`);

      await setStatus(userId, { r0ShowAllUserRole: true });
      socket.emit("r0ShowAllUserRole", roomId);
      console.log("r0ShowAllUserRole 송신");
    });

    //NOTE - "마피아들은 고개를 들어 서로를 확인해 주세요." 모달창 띄우기
    socket.on("r0ShowMafiaUserEachOther", () => {
      r0ShowMafiaUserEachOther({
        roomId,
        userId,
        setIsOpen,
        setTitle,
        setMessage,
        setTimer,
        setIsClose,
        setIsOverlay,
        setTimerIds
      });
    });

    //NOTE -  마피아 유저 캠 및 오디오 On
    socket.on("r0TurnMafiaUserCameraOn", async (players) => {
      r0TurnMafiaUserCameraOnHandler({
        tracks,
        localUserId,
        remoteParticipants,
        players,
        userId,
        roomId,
        sources,
        setTimerIds
      });
    });

    //NOTE -  마피아 유저 캠 및 오디오 Off
    socket.on("r0TurnMafiaUserCameraOff", async (players) => {
      r0TurnMafiaUserCameraOffHandler({
        tracks,
        localUserId,
        remoteParticipants,
        players,
        userId,
        roomId,
        sources,
        setTimerIds
      });
    });

    //NOTE - 아침이 시작되었습니다 모달창 띄우기
    //NOTE - (토론시간)
    socket.on("r1MorningStart", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r1MorningStart 수신");

      // waitForMs(timer); 토론시간
      // console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId, { r1MorningStart: true });
      socket.emit("r1MorningStart", roomId);
      console.log("r1MorningStart 송신");
    });

    //NOTE - 전체 user의 캠 및 오디오 활성화
    socket.on("r1TurnAllUserCameraMikeOn", async (players) => {
      console.log("r1TurnAllUserCameraMikeOn 수신");

      await setStatus(userId, { r1TurnAllUserCameraMikeOn: true });

      console.log(`카메라와 마이크를 켤 플레이어 목록 : ${players}`);

      socket.emit("r1TurnAllUserCameraMikeOn", roomId);
      console.log("r1TurnAllUserCameraMikeOn 송신");
    });

    //NOTE - UI 모달창 띄우기:  "모든 유저는 토론을 통해 마피아를 찾아내세요."
    socket.on("r1FindMafia", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r1FindMafia 수신");

      // waitForMs(timer);
      // console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId, { r1FindMafia: true });
      socket.emit("r1FindMafia", roomId);
      console.log("r1FindMafia 송신");
    });

    //NOTE - UI 모달창 띄우기: 토론이 끝났습니다.(토론 시간 종료)
    socket.on("r1MetingOver", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r1MetingOver 수신");

      // waitForMs(timer);
      // console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId, { r1MetingOver: true });
      socket.emit("r1MetingOver", roomId);
      console.log("r1MetingOver 송신");
    });

    //NOTE - UI 모달창 띄우기: 마피아일 것 같은 사람의 화면을 클릭해주세요.(투표시간)
    socket.on("r1VoteToMafia", async (title, message, timer, nickname, yesOrNo) => {
      const votedPlayer = "55555555-f1b4-46eb-a187-2da752eed29c";
      console.log("r1VoteToMafia 수신");
      console.log("투표 진행");

      // waitForMs(timer);
      // console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId, { r1VoteToMafia: true });
      socket.emit("r1VoteToMafia", roomId, votedPlayer);
      console.log("r1VoteToMafia 송신");
    });

    //NOTE - UI 모달창 띄우기: 투표 개표(투표결과)
    socket.on("r1ShowVoteToResult", async (voteBoard) => {
      console.log("r1ShowVoteToResult 수신");

      console.log("투표 결과", voteBoard);

      await setStatus(userId, { r1VoteToMafia: true });
      socket.emit("r1ShowVoteToResult", roomId);
      console.log("r1ShowVoteToResult 송신");
    });

    return () => {
      // 저장된 모든 타이머 클리어
      timerIds.forEach((timerId) => {
        // console.log("timerId", timerId);
        clearTimeout(timerId);
      });
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

  //NOTE - 게임 시작
  const socketGameStart = () => {
    setIsOverlay(false); //클릭 이벤트 비활성화
    clearActiveParticipant(); //캠 이미지 및 활성화된 user 정보 초기화
  };

  //NOTE - 아침
  const socketMorning = () => {
    setIsOverlay(false); //클릭 이벤트 비활성화
    clearActiveParticipant(); //캠 이미지 및 활성화된 user 정보 초기화
  };

  //NOTE - 투표 시간
  const socketVoteTime = () => {
    setIsOverlay(true);
  };

  //NOTE - 밤
  const socketNight = () => {
    setIsOverlay(false);
    clearActiveParticipant();
  };

  //NOTE - 마피아 시간
  const mafiaTime = () => {
    // 마피아 유저에게만 클릭 이벤트 활성화
    if (localUserId == "getUserId") {
      setIsRemoteOverlay(true);
      setImageState(CamCheck);
    }
  };

  //NOTE - 의사 시간
  const doctorTime = () => {
    //NOTE - 의사 유저에게만 클릭 이벤트 활성화
    if (localUserId == "getUserId") {
      setIsRemoteOverlay(true);
      setImageState(CamCheck);
    }
  };

  //NOTE - 경찰 시간
  const policeTime = () => {
    //NOTE - 경찰 유저에게만 클릭 이벤트 활성화
    if (localUserId == "getUserId") {
      setIsRemoteOverlay(true);
    }
  };

  const checkClickHandle = (event: React.MouseEvent<HTMLElement>, participant: Participant, index: number) => {
    event.stopPropagation();
    toggleOverlay(participant.sid, index); // 캠 클릭시 이미지 띄우기

    const exampleSocket = "마피아시간";
    const exampleServerUserinfo: string = "시민";

    //NOTE - 투표 시간 종료
    if (exampleSocket.includes("voteEndTime")) {
      // 마지막으로 클릭 된 user의 정보를 server에 전달
      if (participant.metadata) {
        console.log("userId", participant.metadata);
        setIsOverlay(false);
        clearActiveParticipant();
      }
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
