"use client";

import MafiaPlayRooms from "@/components/mafia/MafiaPlayRooms";
import { useGetToken } from "@/hooks/useToken";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import { useParams } from "next/navigation";

const RoomPage = () => {
  const { id } = useParams();

  const room = id as string;

  if (!room) {
    console.log("useSearchParams의 인자 error 발생 ");
  }

  const { data: token, isLoading, isSuccess, isError } = useGetToken(room);

  if (isLoading || !isSuccess) {
    console.log("로딩중입니다.");
  }

  if (isError) {
    console.log("토큰 발급중 에러 발생");
  }

  return (
    <>
      <LiveKitRoom
        token={token} // 필수 요소
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} // 필수 요소
        video={true}
        audio={true}
      >
        <MafiaPlayRooms />

        <RoomAudioRenderer />
      </LiveKitRoom>
    </>
  );
};

export default RoomPage;
