import { Tables } from "@/types/supabase";
import useSocketOn from "./useSocketOn";
import { useState } from "react";

const useGetRoomsSocket = () => {
  const [rooms, setRooms] = useState<Tables<"room_table">[]>();

  const mainSockets = {
    enterMafia: (item: Tables<"room_table">[]) => {
      setRooms(item);
    }
  };
  useSocketOn(mainSockets);

  return rooms;
};

export default useGetRoomsSocket;
