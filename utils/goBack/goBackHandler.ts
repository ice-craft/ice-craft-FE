import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/utils/socket/socket";

const useHandleBack = (roomId: string, userId: string) => {
  const router = useRouter();

  useEffect(() => {
    const disConnected = () => {
      socket.emit("exitRoom", roomId, userId);
      console.log("나갈거임", roomId, userId);

      router.replace("/main");
      console.log("뒤로가기 버튼 클릭 감지");
    };

    const goBackHandler = () => {
      disConnected();
    };

    window.onpopstate = goBackHandler;

    return () => {
      window.onpopstate = null;
    };
  }, [roomId, userId]);

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
