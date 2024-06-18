import { Tables } from "@/types/supabase";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useConnectStore from "@/store/connect-store";
import useSocketOn from "./useSocketOn";

const useGetRoomsSocket = () => {
  const roomId = useRef("");
  const router = useRouter();
  const isGoInClick = useRef(false);
  const { setRoomId } = useConnectStore();
  const [rooms, setRooms] = useState<Tables<"room_table">[]>();

  const mainSockets = {
    enterMafia: (rooms: Tables<"room_table">[]) => {
      setRooms(rooms);
    },
    joinRoom: () => {
      if (roomId.current) {
        router.push(`/room/${roomId.current}/`);
      }
    },
    joinRoomError: (message: string) => {
      isGoInClick.current = false;
      toast.error(message);
    },
    fastJoinRoom: (room_id: string) => {
      router.push(`/room/${room_id}/`);
      setRoomId(room_id);
    },
    fastJoinRoomError: (message: string) => {
      isGoInClick.current = false;
      toast.error(message);
    }
  };

  useSocketOn(mainSockets);
  return { rooms, setRooms };
};

export default useGetRoomsSocket;
