import { Tables } from "@/types/supabase";
import { useState } from "react";
import useSocketOn from "./useSocketOn";

const useGetRoomsSocket = () => {
  const [rooms, setRooms] = useState<Tables<"room_table">[]>();

  const mainSockets = {
    enterMafia: (rooms: Tables<"room_table">[]) => {
      setRooms(rooms);
    }
  };

  useSocketOn(mainSockets);
  return { rooms, setRooms };
};

export default useGetRoomsSocket;
