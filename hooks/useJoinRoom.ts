import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useConnectActions } from "@/store/connect-store";
import { socket } from "@/utils/socket/socket";
import { checkUserLogIn, getUserInfo } from "@/utils/supabase/authAPI";
import { Tables } from "@/types/supabase";
import { useRouter } from "next/navigation";

const useJoinRoom = () => {
  const router = useRouter();
  const isGoInClick = useRef(false);
  const { setRoomId, setUserNickname, setUserId } = useConnectActions();
  const userId = useRef("");
  const nickname = useRef("");
  const roomId = useRef("");
  const [loading, setLoading] = useState(false);

  //NOTE - 로그인 정보
  useEffect(() => {
    const checkUserInfo = async () => {
      const userInfo = await getUserInfo();
      // 세션 스토리지에 저장
      if (userInfo) {
        userId.current = userInfo.id;
        nickname.current = userInfo.user_metadata.nickname;
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
      router.push(`/room/${item.room_id}/`);
      socket.emit("joinRoom", userId.current, item.room_id, nickname.current);
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
      console.log("메인페이지 방입장", item);
      router.push(`/room/${item.room_id}/`);
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
