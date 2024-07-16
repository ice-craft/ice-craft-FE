import { useConnectActions } from "@/store/connect-store";
import { toast } from "react-toastify";
import useSocketOn from "./useSocketOn";
import { useRouter } from "next/navigation";

const useJoinRoomSocket = () => {
  const router = useRouter();
  const { setRoomId } = useConnectActions();

  const joinSockets = {
    joinRoom: (roomId: string) => {
      if (roomId) {
        setRoomId(roomId);
        router.push(`/room/${roomId}/`);
      }
    },
    joinRoomError: (message: string) => {
      toast.error(message);
    },
    fastJoinRoom: (roomId: string) => {
      setRoomId(roomId);
      router.push(`/room/${roomId}/`);
    },
    fastJoinRoomError: (message: string) => {
      toast.error(message);
    }
  };
  useSocketOn(joinSockets);
};

export default useJoinRoomSocket;
