import { MediaState, TotalSocketState, VoteState, SetModalState } from "@/types";
import { TrackReferenceOrPlaceholder } from "@livekit/components-react";
import { allAudioSetting, allMediaSetting, specificUserVideoSetting } from "../participantCamSettings/camSetting";
import { socket } from "../socket/socket";

//NOTE - 게임 시작
export const r0NightStartHandler = ({
  userId,
  setIsOpen,
  setTitle,
  setMessage,
  setTimer,
  setIsOverlay,
  setTimerIds
}: TotalSocketState) => {
  console.log("r0NightStart 수신");

  // 모달창 요소
  setIsOpen(true);
  setTitle("게임 시작");
  setMessage("누군가 당신의 뒤를 노리고 있습니다.");
  setTimer(5);
  setIsOverlay(false); //캠 클릭 이벤트 비활성화

  // const date = Date.now();
  // const timer = Math.random() * 2 + 1;
  // console.log("timer", timer);

  // 5초 후에 setStatus와 socket.emit 실행
  const r0NightStartTimer = setTimeout(() => {
    socket.emit("r0NightStart");
    console.log("r0NightStart 송신");
  }, 500);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds) => [...prevTimerIds, r0NightStartTimer]);
};

//NOTE - 카메라 및 마이크 off
export const r0TurnAllUserCameraMikeOffHandler = (tracks: TrackReferenceOrPlaceholder[], userId: string) => {
  console.log("r0TurnAllUserCameraMikeOff 수신");

  allMediaSetting(tracks, false);
  socket.emit("r0TurnAllUserCameraMikeOff");
  console.log("r0TurnAllUserCameraMikeOff 송신");
};

//NOTE - UI: 마피아 유저에게 "마피아들은 고개를 들어 서로를 확인해 주세요." 모달창 띄우기
export const r0ShowMafiaUserEachOther = ({
  userId,
  setIsOpen,
  setTitle,
  setMessage,
  setTimer,
  setIsOverlay,
  setTimerIds
}: TotalSocketState) => {
  console.log("r0ShowMafiaUserEachOther 수신");

  //모달창 요소
  setIsOpen(true);
  setTitle("마피아 시간");
  setMessage("클클클... 누군가를 죽여야한다니 흥미롭군, 나의 파트너는 누구지?");
  setTimer(5);
  setIsOverlay(false); //캠 클릭 이벤트 비활성화

  // 5초 후에 setStatus와 socket.emit 실행
  const r0ShowMafiaUserEachOtherTimer = setTimeout(() => {
    socket.emit("r0ShowMafiaUserEachOther");
    console.log("r0ShowMafiaUserEachOther 송신");
  }, 500);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds) => [...prevTimerIds, r0ShowMafiaUserEachOtherTimer]);
};

//NOTE -  마피아 유저의 캠 및 오디오 ON
export const r0TurnMafiaUserCameraOnHandler = ({
  tracks,
  localUserId,
  participants,
  players,
  userId,
  sources,
  setTimerIds
}: MediaState) => {
  console.log("r0TurnMafiaUserCameraOn 수신");

  if (!localUserId || !players) {
    return () => {};
  }

  //NOTE - 1. 특정 user의 track(데이터) 가져오기
  const MafiaUserTrack = players.map((userId) => {
    return participants.find((item) => item.metadata === userId);
  });

  //NOTE - 2. 해당 user일 경우에만 캠 및 오디오 ON
  MafiaUserTrack.forEach((track) => {
    if (localUserId === track?.metadata) {
      specificUserVideoSetting(MafiaUserTrack, true);
    } else {
      allAudioSetting(tracks, false);
    }
  });

  // 5초 후에 setStatus와 socket.emit 실행
  const r0TurnMafiaUserCameraOnTimer = setTimeout(() => {
    socket.emit("r0TurnMafiaUserCameraOn");
    console.log("r0TurnMafiaUserCameraOn 송신");
  }, 500);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds: any) => [...prevTimerIds, r0TurnMafiaUserCameraOnTimer]);
};

//NOTE -  마피아 유저의 캠 및 오디오 Off
export const r0TurnMafiaUserCameraOffHandler = ({
  tracks,
  localUserId,
  participants,
  players,
  userId,

  setTimerIds
}: MediaState) => {
  console.log("r0TurnMafiaUserCameraOff 수신");

  if (!localUserId || !players) {
    return () => {};
  }

  console.log("participants", participants);
  // 2) 특정 유저의 track 및 boolean값을 통해 캠 활성화
  const MafiaUserId = players.map((userId) => {
    if (localUserId === userId) {
    }

    return participants.map((participant) => {
      if (participant.metadata === userId && localUserId === userId) {
        return participant;
      }
    });
  });
  console.log("MafiaUserId", MafiaUserId);

  // 5초 후에 setStatus와 socket.emit 실행
  const r0TurnMafiaUserCameraOffTimer = setTimeout(() => {
    socket.emit("r0TurnMafiaUserCameraOff");
    console.log("r0TurnMafiaUserCameraOff 송신");
  }, 500);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds: any) => [...prevTimerIds, r0TurnMafiaUserCameraOffTimer]);
};

//NOTE - (토론시간) 아침이 시작되었습니다 모달창 띄우기
export const r1MorningStartHandler = ({
  userId,
  setIsOpen,
  setTitle,
  setMessage,
  setTimer,
  setIsOverlay,
  setTimerIds,
  clearActiveParticipant
}: TotalSocketState) => {
  console.log("r1MorningStart 수신");

  // 모달창 요소
  setIsOpen(true);
  setTitle("아침 시간");
  setMessage("난 살거야! 그리고 범인은 바로... 너");
  setTimer(5);
  setIsOverlay(false); //캠 클릭 이벤트 비활성화

  // 5초 후에 setStatus와 socket.emit 실행
  const r1MorningStartTimer = setTimeout(() => {
    socket.emit("r1MorningStart");
    console.log("r1MorningStart 송신");
  }, 5000);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds) => [...prevTimerIds, r1MorningStartTimer]);
};

//NOTE - 전체 user의 캠 및 오디오 활성화
export const r1TurnAllUserCameraMikeOnHandler = (tracks: TrackReferenceOrPlaceholder[], userId: string) => {
  console.log("r1TurnAllUserCameraMikeOn 수신");

  allMediaSetting(tracks, true);

  socket.emit("r1TurnAllUserCameraMikeOn");
  console.log("r1TurnAllUserCameraMikeOn 송신");
};

//NOTE - 아침시간(토론시간) 1분 카운트
export const r1FindMafiaHandler = ({
  userId,
  setIsOpen,
  setTitle,
  setMessage,
  setTimer,
  setIsClose,
  setIsOverlay,
  setTimerIds
}: TotalSocketState) => {
  console.log("r1FindMafia 수신");
  setIsOverlay(false); //캠 클릭 이벤트 비활성화
  // setTimer(60); UI에 보여질 타이머

  // 1분 후에 setStatus와 socket.emit 실행
  const r1FindMafiaTimer = setTimeout(() => {
    socket.emit("r1FindMafia");
    console.log("r1FindMafia 송신");
  }, 10000);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds: any) => [...prevTimerIds, r1FindMafiaTimer]);
};

//NOTE -  토론 종료 모달창 띄우기
export const r1MeetingOverHandler = ({
  userId,
  setIsOpen,
  setTitle,
  setMessage,
  setTimer,
  setIsClose,
  setIsOverlay,
  setTimerIds
}: TotalSocketState) => {
  console.log("r1MeetingOver 수신");

  // 모달창 요소
  setIsOpen(true);
  setTitle("토론 시간 종료");
  setTimer(5);
  setIsOverlay(false); //캠 클릭 이벤트 비활성화

  // 5초 후에 setStatus와 socket.emit 실행
  const r1MeetingOverTimer = setTimeout(() => {
    socket.emit("r1MeetingOver");
    console.log("r1MeetingOver 송신");
  }, 5000);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds: any) => [...prevTimerIds, r1MeetingOverTimer]);
};

//NOTE - UI 모달창 띄우기: 투표시간 (마피아일 것 같은 사람의 화면을 클릭해주세요.)
export const r1VoteToMafiaModalHandler = ({
  setIsOpen,
  setTitle,
  setMessage,
  setTimer,
  setIsClose,
  setIsOverlay
}: SetModalState) => {
  // 모달창 요소
  setIsOpen(true);
  setTitle("투표 시간");
  setTimer(5);
  setIsOverlay(true); //캠 클릭 이벤트 활성화
  console.log("r1VoteToMafia 수신");
};

//NOTE - 투표 시간의 캠 클릭 이벤트 핸들러 (userId 값 전달)
export const r1VoteToMafiaHandler = ({
  votedPlayer,
  isVoted,
  timerRef,
  setVoteTimerClose,
  setIsOverlay,
  setVoted,
  clearActiveParticipant
}: VoteState) => {
  // 15초 후에 setStatus와 socket.emit 실행
  // setTitle에 값을 넣을 시기에 ui쪽에서는 모달 창이 띄어지며 5초라는 시간이 흘러가므로 15초동안 투표하기 위해서는
  // 위의 모달창 타이머를 포함한 시간인 20초를 넣어야한다.
  let r1VoteToMafiaTimer;

  // setTimeout 함수를 한 번만 실행
  // 캠 클릭시 마다 setTimeout이 새로 생성되어 유저별 동작이 달라진다.
  if (!timerRef.current) {
    timerRef.current = true;
    console.log("작동 횟수 체크");

    r1VoteToMafiaTimer = setTimeout(() => {
      setVoted(true);
      setIsOverlay(false); // 캠 클릭 이벤트 비활성화
      clearActiveParticipant(); // 캠 이미지 및 활성화된 user 정보 초기화
    }, 10000);
  }

  //타이머 종료 후 다음 동자을 실행
  //votedPlayer의 최신 값을 인식하지 못한다.
  if (isVoted) {
    console.log("userId", votedPlayer);
    socket.emit("r1VoteToMafia", votedPlayer);
    setVoteTimerClose(r1VoteToMafiaTimer);
    console.log("r1VoteToMafia 송신");
  }
};

//NOTE - UI 모달창 띄우기: 투표 개표(결과)
export const r1ShowVoteToResultHandler = ({
  userId,
  votedPlayer,
  voteBoard,
  setIsOpen,
  setTitle,
  setMessage,
  setTimer,
  setIsClose,
  setIsOverlay,
  setTimerIds
}: TotalSocketState) => {
  console.log("r1ShowVoteToResult 수신");
  console.log("투표 결과", voteBoard);

  const manyVote = voteBoard[0].voted_count;
  const nextVote = voteBoard[1].voted_count;
  let socketEmitEvent = "";

  //동등표일 경우(최후의 반론 및 투표 찬성 반대 스킵) ==> 밤으로 이동
  if (manyVote === nextVote || manyVote === 0) {
    setMessage("아무도 선택되지 않았습니다.");
    socketEmitEvent = "r1TurnAllUserCameraMikeOff"; //밤이 되었습니다.
  }

  //가장 많은 투표를 받았을 경우
  if (manyVote > nextVote && manyVote > 0) {
    setMessage(`${voteBoard[0].user_nickname}님이 마피아로 지목되었습니다.`);
    socketEmitEvent = "r1ShowVoteToResult";
  }

  // 모달창 요소
  setIsOpen(true);
  setTitle("투표 결과");
  setTimer(5);

  // 15초 후에 setStatus와 socket.emit 실행
  const r1ShowVoteToResultTimer = setTimeout(() => {
    socket.emit(socketEmitEvent);
    console.log(socketEmitEvent);
  }, 15000);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds: any) => [...prevTimerIds, r1ShowVoteToResultTimer]);
};
