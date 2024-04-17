"use client";

import MafiaPlayRooms from "@/components/mafia/MafiaPlayRooms";
import { useGetToken } from "@/hooks/useToken";
import useConnectStore from "@/store/connect-store";
import { socket } from "@/utils/socket/socket";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import { useRouter } from "next/navigation";

const RoomPage = () => {
  const { roomId, userId } = useConnectStore();
  const { data: token, isLoading, isSuccess, isError } = useGetToken(roomId);

  if (isLoading || !isSuccess) {
    console.log("로딩중입니다.");
  }

  if (isError) {
    console.log("토큰 발급중 에러 발생");
  }

  const disConnected = () => {
    socket.emit("exitRoom", roomId, userId);
    console.log("방 나가기 정상 작동");
  };

  // addEventListener("beforeunload", (event) => {
  //   event.preventDefault();
  //   router.replace("/main");
  //   return true;
  // });
  // window.addEventListener("beforeunload", (event) => {
  //   event.preventDefault();
  //   return "";
  // });
  // window.addEventListener("unload", function (event) {
  //   // 이동할 URL 지정
  //   var destinationUrl = "http://localhost:3000/main";

  //   // 새로운 URL로 이동
  //   window.location.href = destinationUrl;
  // });

  return (
    <>
      <LiveKitRoom
        token={token} // 필수 요소
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} // 필수 요소
        video={true}
        audio={true}
        onDisconnected={disConnected}
      >
        <MafiaPlayRooms />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </>
  );
};

export default RoomPage;
