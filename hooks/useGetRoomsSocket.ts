import { Tables } from "@/types/supabase";
import { useEffect } from "react";
import useSocketOn from "./useSocketOn";
import { socket } from "@/utils/socket/socket";
import { useConnectActions, useRoomsCurrent } from "@/store/connect-store";
import useLoading from "./useLoading";

const useGetRoomsSocket = () => {
  const rooms = useRoomsCurrent();
  const { setRooms } = useConnectActions();
  const { startLoading, stopLoading } = useLoading();

  const mainSockets = {
    enterMafia: (item: Tables<"room_table">[]) => {
      setRooms(item);
      stopLoading();
    }
  };
  useSocketOn(mainSockets);

  useEffect(() => {
    socket.connect();
    socket.emit("enterMafia");
  }, [startLoading]);

  return { rooms, setRooms };
};

export default useGetRoomsSocket;
