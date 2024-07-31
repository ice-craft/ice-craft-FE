import { Tables } from "@/types/supabase";
import useSocketOn from "./useSocketOn";
import { useConnectActions, useRoomsCurrent } from "@/store/connect-store";
import { socket } from "@/utils/socket/socket";

const useGetRoomsSocket = () => {
  const rooms = useRoomsCurrent();
  const { setRooms } = useConnectActions();

  const mainSockets = {
    enterMafia: (item: Tables<"room_table">[]) => {
      setRooms(item);
    },
    updateRoomInfo: () => {
      socket.emit("enterMafia");
    }
  };
  useSocketOn(mainSockets);

  return { rooms, setRooms };
};

export default useGetRoomsSocket;
