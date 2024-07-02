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
      console.log("enterMafia", item);
    },
    updateRoomInfo: (roomInfo: Tables<"room_table">) => {
      console.log("updateRoomInfo", roomInfo);
      setRooms((prevRooms) => prevRooms.map((room) => (room.room_id === roomInfo.room_id ? roomInfo : room)));
    }
  };

  useSocketOn(mainSockets);

  useEffect(() => {
    socket.connect();
    socket.emit("enterMafia");
  }, []);

  return { rooms, setRooms };
};

export default useGetRoomsSocket;
