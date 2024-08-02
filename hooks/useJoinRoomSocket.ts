import { useConnectActions } from "@/store/connect-store";
import { useLoadingActions } from "@/store/loading-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useSocketOn from "@/hooks/useSocketOn";

const useJoinRoomSocket = () => {
  const router = useRouter();
  const { setLoading } = useLoadingActions();
  const { setRoomId } = useConnectActions();

  const joinSockets = {
    joinRoom: (roomId: string) => {
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
