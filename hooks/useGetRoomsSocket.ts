import { Tables } from "@/types/supabase";
import { useEffect, useState } from "react";
import useSocketOn from "./useSocketOn";
import { socket } from "@/utils/socket/socket";
import { useConnectActions, useRoomsCurrent } from "@/store/connect-store";

const useGetRoomsSocket = () => {
  const rooms = useRoomsCurrent();
  const { setRooms } = useConnectActions();
  const [loading, setLoading] = useState(true);

  const mainSockets = {
    enterMafia: (item: Tables<"room_table">[]) => {
      setRooms(item);
      setLoading(false);
    }
  };
  useSocketOn(mainSockets);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("enterMafia");
  }, []);

  return { rooms, setRooms, loading };
};

export default useGetRoomsSocket;
