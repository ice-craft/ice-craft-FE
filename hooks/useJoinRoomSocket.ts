import { useConnectActions } from "@/store/connect-store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useSocketOn from "./useSocketOn";
import { useLoadingActions } from "@/store/loading-store";
import { useEffect } from "react";

const useJoinRoomSocket = () => {
  const router = useRouter();
  const { setLoading } = useLoadingActions();
  const { setRoomId } = useConnectActions();

  const joinSockets = {
    joinRoom: (joinRoom: any, roomId: string) => {
      if (roomId) {
        setRoomId(roomId);
        router.push(`/room/${roomId}/`);
      }
    },
    joinRoomError: (message: string) => {
      setLoading(false);
      toast.error(message);
    },
    fastJoinRoom: (roomId: string) => {
      setRoomId(roomId);
      router.push(`/room/${roomId}/`);
    },
    fastJoinRoomError: (message: string) => {
      setLoading(false);
      toast.error(message);
    }
  };

  useSocketOn(joinSockets);

  useEffect(() => {
    return setLoading(false);
  }, []);
};

export default useJoinRoomSocket;
