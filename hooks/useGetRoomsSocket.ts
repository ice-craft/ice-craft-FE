import { Tables } from "@/types/supabase";
import useSocketOn from "./useSocketOn";
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

  return { rooms, setRooms };
};

export default useGetRoomsSocket;
