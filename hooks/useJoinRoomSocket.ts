import { UserInfo } from "@/types";
import { useConnectActions, useNickname, useUserId } from "@/store/connect-store";
import { toast } from "react-toastify";
import useSocketOn from "./useSocketOn";
import { useRouter } from "next/navigation";
import { socket } from "@/utils/socket/socket";
import { useCreateStore } from "@/store/toggle-store";
import { useRef } from "react";

const useJoinRoomSocket = () => {
  const router = useRouter();
  const { setRoomId } = useConnectActions();

  const joinSockets = {
    joinRoom: (userInfo: UserInfo, roomId: string) => {
      if (roomId) {
        setRoomId(roomId);
        router.push(`/room/${roomId}/`);
      }
    },
    joinRoomError: (message: string) => {
      toast.error(message);
    },
    fastJoinRoom: (userInfo: UserInfo, roomId: string) => {
      setRoomId(roomId);
      router.push(`/room/${roomId}/`);
    },
    fastJoinRoomError: (message: string) => {
      toast.error(message);
    }
  };
  useSocketOn(joinSockets);
};

export default useJoinRoomSocket;
