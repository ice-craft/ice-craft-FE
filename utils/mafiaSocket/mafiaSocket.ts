import { MediaState, ShowModalComponents } from "@/types";
import { TrackReferenceOrPlaceholder, useLocalParticipant, useParticipantTracks } from "@livekit/components-react";
import { allMediaSetting, specificUserVideoSetting } from "../participantCamSettings/camSetting";
import { socket } from "../socket/socket";
import { setStatus } from "../supabase/statusAPI";

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

  //NOTE - 모달창 요소
  setIsOpen(true);
  setTitle("게임 시작");
  setMessage("누군가 당신의 뒤를 노리고 있습니다.");
  setTimer(5);
  setIsOverlay(false); //클릭 이벤트 비활성화

  // 5초 후에 setStatus와 socket.emit 실행
  const r0NightStartTimer = setTimeout(async () => {
    await setStatus(userId, { r0NightStart: true });
    socket.emit("r0NightStart", roomId);
    console.log("r0NightStart 송신");
  }, 5000);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds) => [...prevTimerIds, r0NightStartTimer]);
};

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

  //NOTE - 모달창 요소
  setIsOpen(true);
  setTitle("마피아 시간");
  setMessage("클클클... 누군가를 죽여야한다니 흥미롭군, 나의 파트너는 누구지?");
  setTimer(5);
  setIsOverlay(false); //클릭 이벤트 비활성화

  // 5초 후에 setStatus와 socket.emit 실행
  const r0ShowMafiaUserEachOtherTimer = setTimeout(async () => {
    await setStatus(userId, { r0ShowMafiaUserEachOther: true });
    socket.emit("r0ShowMafiaUserEachOther", roomId);
    console.log("r0ShowMafiaUserEachOther 송신");
  }, 5000);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds) => [...prevTimerIds, r0ShowMafiaUserEachOtherTimer]);
};

//NOTE -  마피아 유저 화상 카메라와 마이크만 켬
export const r0TurnMafiaUserCameraOnHandler = async ({
  tracks,
  localUserId,
  specificUser,
  userId,
  roomId,
  setTimerIds
}: MediaState) => {
  console.log("r0TurnMafiaUserCameraOn 수신");

  console.log("localUserId", localUserId);
  console.log("specificUser", specificUser);
  allMediaSetting(tracks, false);
  //NOTE -  1) 특정 유저의 track을 받아온다.
  // specificUser
  //NOTE -  2) 현재 방의 유저 중에 특정 user인지를 파악한다.
  if (!localUserId || !specificUser) {
    return;
  }

  if (localUserId === userId) {
    //NOTE -  3) 해당 특정 유저일 경우 track 및 boolean값을 통해 캠 활성화 및 비활성화
    specificUserVideoSetting(specificUser, true);
  }

  // 5초 후에 setStatus와 socket.emit 실행
  const r0TurnMafiaUserCameraOnTimer = setTimeout(async () => {
    await setStatus(userId, { r0TurnMafiaUserCameraOn: true });
    socket.emit("r0TurnMafiaUserCameraOn", roomId);
    console.log("r0TurnMafiaUserCameraOn 송신");
  }, 5000);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds: any) => [...prevTimerIds, r0TurnMafiaUserCameraOnTimer]);
};

//NOTE -  마피아 유저 화상 카메라와 마이크만 켬
export const r0TurnMafiaUserCameraOffHandler = async ({
  tracks,
  localUserId,
  specificUser,
  userId,
  roomId,

  setTimerIds
}: MediaState) => {
  console.log("r0TurnMafiaUserCameraOff 수신");

  allMediaSetting(tracks, false);
  //NOTE -  1) 특정 유저의 track을 받아온다.
  //NOTE -  2) 현재 방의 유저 중에 특정 user인지를 파악한다.
  if (localUserId === userId) {
    //NOTE -  3) 해당 특정 유저일 경우 track 및 boolean값을 통해 캠 활성화 및 비활성화
    specificUserVideoSetting(specificUser, false);
  }

  // 5초 후에 setStatus와 socket.emit 실행
  const r0TurnMafiaUserCameraOffTimer = setTimeout(async () => {
    await setStatus(userId, { r0TurnMafiaUserCameraOff: true });
    socket.emit("r0TurnMafiaUserCameraOff", roomId);
    console.log("r0TurnMafiaUserCameraOff 송신");
  }, 5000);

  // 생성된 타이머 ID를 저장
  setTimerIds((prevTimerIds: any) => [...prevTimerIds, r0TurnMafiaUserCameraOffTimer]);
};
