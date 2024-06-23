import { Tables } from "@/types/supabase";
import { useEffect } from "react";
import useSocketOn from "./useSocketOn";
import { socket } from "@/utils/socket/socket";
import { useConnectActions, useRoomsCurrent } from "@/store/connect-store";

const useGetRoomsSocket = () => {
  const rooms = useRoomsCurrent();
  const { setRooms } = useConnectActions();

  const mainSockets = {
    enterMafia: (item: Tables<"room_table">[]) => {
      setRooms(item);
    }
  };

  useSocketOn(mainSockets);

  useEffect(() => {
    socket.connect();
    socket.emit("enterMafia", 0, 20);
  }, [setRooms]);

  return { rooms, setRooms };
};

export default useGetRoomsSocket;
