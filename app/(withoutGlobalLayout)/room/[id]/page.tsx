"use client";

import MafiaPlayRooms from "@/components/mafia/MafiaPlayRooms";
import { useGetToken } from "@/hooks/useToken";
import useConnectStore from "@/store/connect-store";
import { socket } from "@/utils/socket/socket";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import { useParams } from "next/navigation";

const RoomPage = () => {
  const { id } = useParams();
  const { roomId } = useConnectStore();

  // const room = id as string;

  if (!roomId) {
    console.log("useSearchParams의 인자 error 발생 ");
  }
  const { data, isLoading, isSuccess, isError } = useGetToken(roomId);

  if (isLoading || !isSuccess) {
    console.log("로딩중입니다.");
  }

  if (isError) {
    console.log("토큰 발급중 에러 발생");
  }

  const test = () => {
    socket.emit("exitRoom", roomId, data?.userInfo?.id);
  };

  return (
    <>
      <LiveKitRoom
        token={data?.token} // 필수 요소
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} // 필수 요소
        video={true}
        audio={true}
        onDisconnected={test}
      >
        <MafiaPlayRooms />

        <RoomAudioRenderer />
      </LiveKitRoom>
    </>
  );
};

export default RoomPage;
