import { useRef } from "react";
import { toast } from "react-toastify";
import { useConnectActions } from "@/store/connect-store";
import { socket } from "@/utils/socket/socket";
import { checkUserLogIn } from "@/utils/supabase/authAPI";
import { Tables } from "@/types/supabase";
import { useRoomAction } from "@/store/room-store";
import useLoading from "./useLoading";

const useJoinRoom = () => {
  const isGoInClick = useRef(false);
  const { setRoomId } = useConnectActions();
  const { setIsEntry } = useRoomAction();
  const { startLoading, stopLoading } = useLoading();

  //NOTE - 클릭시 로그인 안한 유저 처리
  const loginErrorHandler = async (emitCallback: (userId: string, userNickname: string) => void) => {
    const userInfo = await checkUserLogIn();

    startLoading();
    try {
      if (!userInfo) {
        toast.info("로그인 후 입장 가능합니다.");
        return;
      }
      if (!isGoInClick.current) {
        isGoInClick.current = true;
        emitCallback(userInfo.id, userInfo.user_metadata.nickname);
      }
    } catch {
      toast.error("로그인 확인 중 오류가 발생했습니다.");
    } finally {
      stopLoading();
      isGoInClick.current = false;
    }
  };

  //NOTE - 방 리스트 입장하기
  const joinRoomHandler = async (item: Tables<"room_table">) => {
    await loginErrorHandler((userId, userNickname) => {
      setRoomId(item.room_id);
      setIsEntry(true);
      socket.emit("joinRoom", userId, item.room_id, userNickname);
    });
  };

  //NOTE - 메인페이지 visual에서 게임시작 버튼 클릭시(추후 마피아 & 노래맞추기 조건 추가)
  const gameStartHandler = () => {
    loginErrorHandler((userId, userNickname) => {
      setIsEntry(true);
      socket.emit("fastJoinRoom", userId, userNickname);
    });
  };

  //NOTE - 빠른 입장 (랜덤 방 입장)
  const fastJoinRoomHandler = () => {
    loginErrorHandler((userId, userNickname) => {
      setIsEntry(true);
      socket.emit("fastJoinRoom", userId, userNickname);
    });
  };

  return { joinRoomHandler, fastJoinRoomHandler, gameStartHandler };
};

export default useJoinRoom;
