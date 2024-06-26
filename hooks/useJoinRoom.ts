import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useConnectActions } from "@/store/connect-store";
import useSocketOn from "./useSocketOn";
import { socket } from "@/utils/socket/socket";
import { checkUserLogIn, getUserInfo } from "@/utils/supabase/authAPI";
import { Tables } from "@/types/supabase";
import { UserInfo } from "@/types";
import { useRouter } from "next/navigation";

const useJoinRoom = () => {
  const router = useRouter();
  const isGoInClick = useRef(false);
  const { setRoomId, setUserId, setUserNickname } = useConnectActions();
  const userId = useRef("");
  const nickname = useRef("");
  const roomId = useRef("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.connect();
    const checkUserInfo = async () => {
      const userInfo = await getUserInfo();
      // 세션 스토리지에 저장
      if (userInfo) {
        userId.current = userInfo.id;
        nickname.current = userInfo.user_metadata.nickname;
      }
    };
    checkUserInfo();
  }, []);

  const joinSockets = {
    joinRoom: (item: Tables<"room_table">, userInfo: UserInfo) => {
      console.log("joinroom", item.room_id);
      if (item.room_id) {
        console.log(item.room_id);
        setRoomId(item.room_id);
        setUserId(userInfo.userId);
        setUserNickname(userInfo.nickname);
        // router.push(`/room/${item.room_id}/`);
      }
    },
    joinRoomError: (message: string) => {
      isGoInClick.current = false;
      toast.error(message);
    },
    fastJoinRoom: (item: Tables<"room_table">) => {
      joinSockets.joinRoom;
      setRoomId(item.room_id);
      router.push(`/room/${item.room_id}/`);
    },
    fastJoinRoomError: (message: string) => {
      isGoInClick.current = false;
      toast.error(message);
    }
  };
  useSocketOn(joinSockets);

  //NOTE - 방 리스트 입장하기
  const joinRoomHandler = async (item: Tables<"room_table">) => {
    await loginErrorHandler(() => {
      roomId.current = item.room_id;
      setRoomId(item.room_id);
      console.log(
        `Joining room with userId: ${userId.current}, roomId: ${item.room_id}, nickname: ${nickname.current}`
      );
      router.push(`/room/${item.room_id}/`);
      socket.emit("joinRoom", item.room_id, userId.current, nickname.current);
    });
  };

  //NOTE - 빠른 입장 (랜덤 방 입장)
  const fastJoinRoomHandler = async (item: Tables<"room_table">) => {
    await loginErrorHandler(() => {
      // router.push(`/room/${item.room_id}/`);
      socket.emit("fastJoinRoom", userId.current, nickname.current);
    });
  };

  //NOTE - 메인페이지 visual에서 게임시작 버튼 클릭시(추후 마피아 & 노래맞추기 조건 추가)
  const gameStartHandler = async (item: Tables<"room_table">) => {
    await loginErrorHandler(() => {
      // const result = joinSockets.joinRoom(item.room_id);
      // console.log("빠른방입장", result);
      // router.push(`/room/${item.room_id}/`);
      socket.emit("fastJoinRoom", userId.current, nickname.current);
    });
  };

  //NOTE - 로그인 체크, 공통 로직 함수 정의
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
    }
  };

  return { joinRoomHandler, fastJoinRoomHandler, gameStartHandler, loading };
};

export default useJoinRoom;
