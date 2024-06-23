import { Tables } from "@/types/supabase";
import { useEffect, useState } from "react";
import useSocketOn from "./useSocketOn";
import { socket } from "@/utils/socket/socket";

const useGetRoomsSocket = () => {
  const [rooms, setRooms] = useState<Tables<"room_table">[]>();

  const mainSockets = {
    enterMafia: (rooms: Tables<"room_table">[]) => {
      console.log("소켓안에있는 룸리스트", rooms);
      setRooms(rooms);
    }
  };

  useSocketOn(mainSockets);

  useEffect(() => {
    socket.connect();
    socket.emit("enterMafia", 0, 20);
  }, [setRooms]);

  useEffect(() => {
    console.log("변경된룸 소켓", rooms);
  }, [rooms]);

  return { rooms, setRooms };
};

export default useGetRoomsSocket;
