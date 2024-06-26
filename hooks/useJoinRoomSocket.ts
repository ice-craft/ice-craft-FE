import { Tables } from "@/types/supabase";
import { UserInfo } from "@/types";
import { useConnectActions } from "@/store/connect-store";
import { useRef } from "react";
import { toast } from "react-toastify";
import useSocketOn from "./useSocketOn";

const useJoinRoomSocket = () => {
  const { setRoomId, setUserId, setUserNickname } = useConnectActions();
  const isGoInClick = useRef(false);

  const joinSockets = {
    joinRoom: (item: Tables<"room_table">, userInfo: UserInfo) => {
      if (item.room_id) {
        console.log(item.room_id);
        setUserId(userInfo.userId);
        setRoomId(item.room_id);
        setUserNickname(userInfo.nickname);
      }
    },
    joinRoomError: (message: string) => {
      isGoInClick.current = false;
      toast.error(message);
    },
    fastJoinRoom: (item: Tables<"room_table">) => {
      setRoomId(item.room_id);
    },
    fastJoinRoomError: (message: string) => {
      isGoInClick.current = false;
      toast.error(message);
    }
  };
  useSocketOn(joinSockets);
};

export default useJoinRoomSocket;
