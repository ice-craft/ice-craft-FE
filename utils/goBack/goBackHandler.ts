import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/utils/socket/socket";
import { useExitStore } from "@/store/exit-store";

const useHandleBack = (roomId: string, userId: string) => {
  const router = useRouter();
  const { setIsExit } = useExitStore();

  useEffect(() => {
    const disConnected = () => {
      setIsExit(true);
      socket.emit("exitRoom", roomId, userId);
      console.log("나갈거임", roomId, userId);

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
  }, [roomId, userId, setIsExit, router]);

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
