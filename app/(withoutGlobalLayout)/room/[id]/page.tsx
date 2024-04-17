"use client";

import MafiaPlayRooms from "@/components/mafia/MafiaPlayRooms";
import { useGetToken } from "@/hooks/useToken";
import useConnectStore from "@/store/connect-store";
import { socket } from "@/utils/socket/socket";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";

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
  };

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
