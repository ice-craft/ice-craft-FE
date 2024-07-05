import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/utils/socket/socket";
import { useRoomAction } from "@/store/room-store";

const useHandleBack = (roomId: string, userId: string) => {
  const router = useRouter();
  const { setIsEntry } = useRoomAction();

  useEffect(() => {
    const disConnected = () => {
      setIsEntry(false);
      socket.emit("exitRoom", roomId, userId);

      const timer = setTimeout(() => {
        router.replace("/main");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    };

    const goBackHandler = () => {
      disConnected();
    };

    window.onpopstate = goBackHandler;

    return () => {
      window.onpopstate = null;
    };
  }, [roomId, userId, setIsEntry, router]);

  useEffect(() => {
    socket.on("exitRoomError", (message) => {
      console.log("exitRoomError:", message);
    });

    return () => {
      socket.off("exitRoomError");
    };
  }, []);
};

export default useHandleBack;
