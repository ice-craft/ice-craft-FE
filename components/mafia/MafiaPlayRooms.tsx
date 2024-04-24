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
import BeforeUnloadHandler from "@/utils/reload/beforeUnloadHandler";
import { setStatus } from "@/utils/supabase/statusAPI";

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
    //NOTE - 게임 시작 모달창 띄우기
    socket.on("r0NightStart", async (title, message, timer) => {
      console.log("r0NightStart 수신");

      // 타이머를 작동
      // console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId, { r0NightStart: true });
      socket.emit("r0NightStart", roomId);
      console.log("r0NightStart 송신");
    });

    //NOTE - 카메라 및 마이크 off
    socket.on("r0TurnAllUserCameraMikeOff", async (players) => {
      console.log("r0TurnAllUserCameraMikeOff 수신");

      allMediaSetting(tracks, false);

      //다음 동작을 실행하기 위해 supabase의 colum인 "r0TurnAllUserCameraMikeOff"의 상태를 true로 변경
      await setStatus(userId, { r0TurnAllUserCameraMikeOff: true });
      socket.emit("r0TurnAllUserCameraMikeOff", roomId);

      console.log("r0TurnAllUserCameraMikeOff 송신");
    });

    //NOTE - "역할 배정을 시작하겠습니다."" modal창 띄우기
    socket.on("r0SetAllUserRole", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r0SetAllUserRole 수신");

      // 타이머를 작동
      // console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId, { r0SetAllUserRole: true });
      socket.emit("r0SetAllUserRole", roomId);
      console.log("r0SetAllUserRole 송신");
    });

    //NOTE - 서버에서 배정한 직업에 대한 user의 정보 ==> 객체형태의 배열로 받는다.{[]}
    socket.on("r0ShowAllUserRole", async (role) => {
      console.log("r0ShowAllUserRole 수신");

      console.log(`역할들 : ${role}`);

      await setStatus(userId, { r0ShowAllUserRole: true });
      socket.emit("r0ShowAllUserRole", roomId);
      console.log("r0ShowAllUserRole 송신");
    });

    //NOTE - "마피아들은 고개를 들어 서로를 확인해 주세요." 모달창 띄우기
    socket.on("r0ShowMafiaUserEachOther", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r0ShowMafiaUserEachOther 수신");

      // 타이머를 작동
      // console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId, { r0ShowMafiaUserEachOther: true });
      socket.emit("r0ShowMafiaUserEachOther", roomId);
      console.log("r0ShowMafiaUserEachOther 송신");
    });

    //NOTE -  마피아 유저 화상 카메라와 마이크만 켬
    socket.on("r0TurnMafiaUserCameraOn", async (players) => {
      console.log("r0TurnMafiaUserCameraOn 수신");

      await setStatus(userId, { r0TurnMafiaUserCameraOn: true });

      console.log(`카메라 켤 마피아 목록 : ${players}`);

      // waitForMs(500); 마피아 시간

      socket.emit("r0TurnMafiaUserCameraOn", roomId);
      console.log("r0TurnMafiaUserCameraOn 송신");
    });

    //NOTE - 마피아 유저들 화면의 마피아 유저 화상 카메라와 마이크만 끔
    socket.on("r0TurnMafiaUserCameraOff", async (players) => {
      console.log("r0TurnMafiaUserCameraOff 수신");

      await setStatus(userId, { r0TurnMafiaUserCameraOff: true });

      console.log(`카메라 끌 마피아 목록 : ${players}`);

      socket.emit("r0TurnMafiaUserCameraOff", roomId);
      console.log("r0TurnMafiaUserCameraOff 송신");
    });

    //NOTE - 아침이 시작되었습니다 모달창 띄우기
    socket.on("r1MorningStart", async (title, message, timer, nickname, yesOrNo) => {
      console.log("r1MorningStart 수신");

      // waitForMs(timer); 토론시간
      // console.log(`${timer}ms 뒤에 ${message} 모달 창 띄움`);

      await setStatus(userId, { r1MorningStart: true });
      socket.emit("r1MorningStart", roomId);
      console.log("r1MorningStart 송신");
    });

    return () => {
      socket.off("r0NightStart");
      socket.off("r0TurnAllUserCameraMikeOff");
      socket.off("r0SetAllUserRole");
      socket.off("r0ShowAllUserRole");
      socket.off("r0ShowMafiaUserEachOther");
      socket.off("r0TurnMafiaUserCameraOn");
      socket.off("r0TurnMafiaUserCameraOff");
      socket.off("r1MorningStart");
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
