import { showModalComponents } from "@/types";
import { socket } from "../socket/socket";
import { setStatus } from "../supabase/statusAPI";

export const r0NightStartHandler = async ({
  roomId,
  userId,
  setIsOpen,
  setTitle,
  setMessage,
  setTimer,
  setIsClose,
  setIsOverlay,
  setTimerIds
}: showModalComponents) => {
  //NOTE - 모달창 띄우기
  console.log("r0NightStart 수신");
  setIsOpen(true);
  setTitle("게임이 시작됩니다.");
  setMessage("다들 즐길 준비 되셨나요? 그러면 출발~~");
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
