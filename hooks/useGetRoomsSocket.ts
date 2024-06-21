import { Tables } from "@/types/supabase";
import { useEffect, useState } from "react";
import useSocketOn from "./useSocketOn";
import { socket } from "@/utils/socket/socket";

const useGetRoomsSocket = () => {
  const [rooms, setRooms] = useState<Tables<"room_table">[]>();

  const mainSockets = {
    enterMafia: (rooms: Tables<"room_table">[]) => {
      setRooms(rooms);
    }
  };

  useSocketOn(mainSockets);

  useEffect(() => {
    socket.connect();
    socket.emit("enterMafia", 0, 20);
  }, []);

  return { rooms, setRooms };
};

export default useGetRoomsSocket;
