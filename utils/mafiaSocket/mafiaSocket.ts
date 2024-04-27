import { MediaState, ShowModalComponents } from "@/types";
import { TrackReferenceOrPlaceholder } from "@livekit/components-react";
import { allAudioSetting, allMediaSetting, specificUserVideoSetting } from "../participantCamSettings/camSetting";
import { socket } from "../socket/socket";
import { setStatus } from "../supabase/statusAPI";

//NOTE - 게임 시작
export const r0NightStartHandler = async ({
  roomId,
  userId,
  setIsOpen,
  setTitle,
  setMessage,
  setTimer,
  setIsOverlay,
  setTimerIds
}: ShowModalComponents) => {
  console.log("r0NightStart 수신");

  // 모달창 요소
  setIsOpen(true);
  setTitle("게임 시작");
  setMessage("누군가 당신의 뒤를 노리고 있습니다.");
  setTimer(5);
  setIsOverlay(false); //캠 클릭 이벤트 비활성화

  // 5초 후에 setStatus와 socket.emit 실행
  const r0NightStartTimer = setTimeout(async () => {
    await setStatus(userId, { r0NightStart: true });
    socket.emit("r0NightStart", roomId);
    console.log("r0NightStart 송신");
  }, 5000);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds) => [...prevTimerIds, r0NightStartTimer]);
};

//NOTE - 카메라 및 마이크 off
export const r0TurnAllUserCameraMikeOffHandler = async (
  tracks: TrackReferenceOrPlaceholder[],
  userId: string,
  roomId: string
) => {
  console.log("r0TurnAllUserCameraMikeOff 수신");

  allMediaSetting(tracks, false);

  await setStatus(userId, { r0TurnAllUserCameraMikeOff: true });
  socket.emit("r0TurnAllUserCameraMikeOff", roomId);

  console.log("r0TurnAllUserCameraMikeOff 송신");
};

//NOTE - UI: 마피아 유저에게 "마피아들은 고개를 들어 서로를 확인해 주세요." 모달창 띄우기
export const r0ShowMafiaUserEachOther = async ({
  roomId,
  userId,
  setIsOpen,
  setTitle,
  setMessage,
  setTimer,
  setIsOverlay,
  setTimerIds
}: ShowModalComponents) => {
  console.log("r0ShowMafiaUserEachOther 수신");

  //모달창 요소
  setIsOpen(true);
  setTitle("마피아 시간");
  setMessage("클클클... 누군가를 죽여야한다니 흥미롭군, 나의 파트너는 누구지?");
  setTimer(5);
  setIsOverlay(false); //캠 클릭 이벤트 비활성화

  // 5초 후에 setStatus와 socket.emit 실행
  const r0ShowMafiaUserEachOtherTimer = setTimeout(async () => {
    await setStatus(userId, { r0ShowMafiaUserEachOther: true });
    socket.emit("r0ShowMafiaUserEachOther", roomId);
    console.log("r0ShowMafiaUserEachOther 송신");
  }, 5000);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds) => [...prevTimerIds, r0ShowMafiaUserEachOtherTimer]);
};

//NOTE -  마피아 유저의 캠 및 오디오 ON
export const r0TurnMafiaUserCameraOnHandler = async ({
  tracks,
  localUserId,
  participants,
  players,
  userId,
  sources,
  roomId,
  setTimerIds
}: MediaState) => {
  console.log("r0TurnMafiaUserCameraOn 수신");
  console.log("players", players);

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
  const r0TurnMafiaUserCameraOnTimer = setTimeout(async () => {
    await setStatus(userId, { r0TurnMafiaUserCameraOn: true });
    socket.emit("r0TurnMafiaUserCameraOn", roomId);
    console.log("r0TurnMafiaUserCameraOn 송신");
  }, 5000);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds: any) => [...prevTimerIds, r0TurnMafiaUserCameraOnTimer]);
};

//NOTE -  마피아 유저의 캠 및 오디오 Off
export const r0TurnMafiaUserCameraOffHandler = async ({
  tracks,
  localUserId,
  participants,
  players,
  userId,
  roomId,

  setTimerIds
}: MediaState) => {
  console.log("r0TurnMafiaUserCameraOff 수신");

  if (!localUserId || !participants || !players) {
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
  const r0TurnMafiaUserCameraOffTimer = setTimeout(async () => {
    await setStatus(userId, { r0TurnMafiaUserCameraOff: true });
    socket.emit("r0TurnMafiaUserCameraOff", roomId);
    console.log("r0TurnMafiaUserCameraOff 송신");
  }, 5000);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds: any) => [...prevTimerIds, r0TurnMafiaUserCameraOffTimer]);
};
