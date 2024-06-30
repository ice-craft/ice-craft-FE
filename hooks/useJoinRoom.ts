import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useConnectActions } from "@/store/connect-store";
import { socket } from "@/utils/socket/socket";
import { checkUserLogIn, getUserInfo } from "@/utils/supabase/authAPI";
import { Tables } from "@/types/supabase";
import useJoinRoomSocket from "./useJoinRoomSocket";

const useJoinRoom = () => {
  const isGoInClick = useRef(false);
  const { setRoomId, setUserNickname, setUserId } = useConnectActions();
  const userId = useRef("");
  const nickname = useRef("");
  const roomId = useRef("");
  const [loading, setLoading] = useState(false);
  useJoinRoomSocket();

  //NOTE - 로그인 정보 없애야함
  useEffect(() => {
    const checkUserInfo = async () => {
      const userInfo = await getUserInfo();
      // 세션 스토리지에 저장
      if (userInfo) {
        // userId.current = userInfo.id;
        // nickname.current = userInfo.user_metadata.nickname;
        userId.current = crypto.randomUUID();
        nickname.current = crypto.randomUUID();
        setUserId(userId.current);
        setUserNickname(nickname.current);
      }
    };
    checkUserInfo();
  }, []);

  //NOTE - 방 리스트 입장하기
  const joinRoomHandler = async (item: Tables<"room_table">) => {
    await loginErrorHandler(() => {
      roomId.current = item.room_id;
      setRoomId(item.room_id);
      socket.emit("joinRoom", userId.current, roomId.current, nickname.current);
    });
  };

  //NOTE - 메인페이지 visual에서 게임시작 버튼 클릭시(추후 마피아 & 노래맞추기 조건 추가)
  const gameStartHandler = () => {
    loginErrorHandler(() => {
      console.log("마피아 게임 클릭했음", userId.current, nickname.current);
      socket.emit("fastJoinRoom", userId.current, nickname.current);
    });
  };

  //NOTE - 빠른 입장 (랜덤 방 입장)
  const fastJoinRoomHandler = () => {
    loginErrorHandler(() => {
      console.log("빠른입장 클릭했음", userId.current, nickname.current);
      socket.emit("fastJoinRoom", userId.current, nickname.current);
    });
  };

  //NOTE - 로그인 체크, 공통 로직 함수 정의 -> boolean 값 말고 실제 userId nickname 리턴해줘야함
  const loginErrorHandler = async (emitCallback: () => void) => {
    try {
      setLoading(true);
      const isLogin = await checkUserLogIn();

      if (!isLogin) {
        toast.info("로그인 후 입장가능합니다.");
        return;
      }
      if (!isGoInClick.current) {
        isGoInClick.current = true;
        emitCallback();
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
      isGoInClick.current = false;
    }
  };

  return { joinRoomHandler, fastJoinRoomHandler, gameStartHandler, loading };
};

export default useJoinRoom;
