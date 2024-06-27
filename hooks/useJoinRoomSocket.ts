import { Tables } from "@/types/supabase";
import { UserInfo } from "@/types";
import { useConnectActions } from "@/store/connect-store";
import { useRef } from "react";
import { toast } from "react-toastify";
import useSocketOn from "./useSocketOn";
import { useRouter } from "next/navigation";

const useJoinRoomSocket = () => {
  const router = useRouter();
  const { setRoomId, setUserId, setUserNickname } = useConnectActions();
  const isGoInClick = useRef(false);

  const joinSockets = {
    joinRoom: (item: Tables<"room_table">, userInfo: UserInfo) => {
      if (item.room_id) {
        setUserId(userInfo.userId);
        setRoomId(item.room_id);
        setUserNickname(userInfo.nickname);
        // router.push(`/room/${item.room_id}/`);
      }
    },
    joinRoomError: (message: string) => {
      isGoInClick.current = false;
      toast.error(message);
    },
    fastJoinRoom: (item: Tables<"room_table">, userInfo: UserInfo) => {
      console.log("fastJoinRoom", item.room_id);
      setUserId(userInfo.userId);
      setRoomId(item.room_id);
      setUserNickname(userInfo.nickname);
      router.push(`/room/${item.room_id}/`);
    },
    fastJoinRoomError: (message: string) => {
      isGoInClick.current = false;
      toast.error(message);
    }
  };

  useSocketOn(joinSockets);
};

export default useJoinRoomSocket;
