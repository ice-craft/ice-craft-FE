import { Tables } from "@/types/supabase";
import { UserInfo } from "@/types";
import { useConnectActions } from "@/store/connect-store";
import { useRef } from "react";
import { toast } from "react-toastify";
import useSocketOn from "./useSocketOn";
import { useRouter } from "next/navigation";

const useJoinRoomSocket = () => {
  const router = useRouter();
  const { setRoomId } = useConnectActions();

  const joinSockets = {
    joinRoom: (userInfo: UserInfo, roomId: string) => {
      console.log("joinRoom event received", userInfo, roomId);
      if (roomId) {
        setRoomId(roomId);
        router.push(`/room/${roomId}/`);
      }
    },
    joinRoomError: (message: string) => {
      toast.error(message);
    },
    fastJoinRoom: (userInfo: UserInfo, roomId: string) => {
      console.log("fastJoinRoom", roomId);
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
