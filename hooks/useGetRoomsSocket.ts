import { Tables } from "@/types/supabase";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useConnectStore from "@/store/connect-store";
import useSocketOn from "./useSocketOn";
import { socket } from "@/utils/socket/socket";

const useGetRoomsSocket = () => {
  // const roomId = useRef("");
  const router = useRouter();
  const isGoInClick = useRef(false);
  const { setRoomId, roomId } = useConnectStore();
  const [rooms, setRooms] = useState<Tables<"room_table">[]>();
  // useEffect(() => {
  //   socket.on("joinRoom", () => {

  //   });
  // }, []);
  const mainSockets = {
    enterMafia: (rooms: Tables<"room_table">[]) => {
      setRooms(rooms);
    },
    joinRoom: () => {
      if (roomId) {
        router.push(`/room/${roomId}/`);
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
