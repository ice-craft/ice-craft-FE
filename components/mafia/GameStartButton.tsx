import { useGameActions, useIsReady } from "@/store/game-store";
import useConnectStore from "@/store/connect-store";
import { socket } from "@/utils/socket/socket";

const GameStartButton = () => {
  const { roomId, userId } = useConnectStore();
  const isReady = useIsReady();
  const { setIsStart, setIsReady } = useGameActions();

  const readyHandler = () => {
    const newIsReady = !isReady;
    setIsReady(newIsReady);
    socket.emit("setReady", userId, newIsReady, roomId);
  };

  //FIXME - 추후) 방장일 경우에만 버튼 활성화
  const startHandler = () => {
    setIsStart(true);
    socket.emit("testStart", roomId, 5);
  };

  return (
    <>
      <button style={{ backgroundColor: isReady ? "#5c5bad" : "#bfbfbf" }} onClick={readyHandler}>
        {isReady ? "취소" : "게임 준비"}
      </button>
      <button onClick={startHandler}>게임시작</button>
    </>
  );
};

export default GameStartButton;
