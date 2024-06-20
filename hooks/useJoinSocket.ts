import { useConnectActions } from "@/store/connect-store";
import useSocketOn from "./useSocketOn";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface UserInfo {
  userId: string;
  nickname: string;
  isReady: boolean;
}

const useJoinRoomSockets = () => {
  const { setRoomId, setUserId, setUserNickname } = useConnectActions();
  const router = useRouter();
  const isGoInClick = useRef(false);

  const joinSockets = {
    joinRoom: (roomId: string, userInfo: UserInfo) => {
      if (roomId) {
        setRoomId(roomId);
        setUserId(userInfo.userId);
        setUserNickname(userInfo.nickname);
        router.push(`/room/${roomId}/`);
      }
    },
    joinRoomError: (message: string) => {
      isGoInClick.current = false;
      toast.error(message);
    },
    fastJoinRoom: (roomId: string) => {
      router.push(`/room/${roomId}/`);
      setRoomId(roomId);
    },
    fastJoinRoomError: (message: string) => {
      isGoInClick.current = false;
      toast.error(message);
    }
  };

  useSocketOn(joinSockets);
};

export default useJoinRoomSockets;
