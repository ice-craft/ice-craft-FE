import { useConnectActions } from "@/store/connect-store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useSocketOn from "./useSocketOn";
import { useLoadingActions } from "@/store/loading-store";

const useJoinRoomSocket = () => {
  const router = useRouter();
  const { setLoading } = useLoadingActions();
  const { setRoomId } = useConnectActions();

  const joinSockets = {
    joinRoom: (roomId: string) => {
      if (roomId) {
        console.log("룸아이디@@@@@@@", roomId);
        setLoading(false);
        setRoomId(roomId);
        router.push(`/room/${roomId}/`);
      }
    },
    joinRoomError: (message: string) => {
      setLoading(false);
      console.log("조인룸에러####################################");
      toast.error(message);
    },
    fastJoinRoom: (roomId: string) => {
      setLoading(false);
      setRoomId(roomId);
      router.push(`/room/${roomId}/`);
    },
    fastJoinRoomError: (message: string) => {
      setLoading(false);
      toast.error(message);
    }
  };
  useSocketOn(joinSockets);
};

export default useJoinRoomSocket;
