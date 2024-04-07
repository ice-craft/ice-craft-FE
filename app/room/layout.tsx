"use client";

import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import { useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";
import { useGetToken } from "../_hooks/useToken";

const layout = ({ children }: PropsWithChildren) => {
  const params = useSearchParams();
  const room = params.get("room");
  const name = params.get("name");

  if (!room || !name) {
    console.log("useSearchParams의 인자 error 발생 ");
    return;
  }
  const { data: token, isLoading, isSuccess, isError } = useGetToken({ room, name });

  if (isLoading || !isSuccess) {
    console.log("token 발급 로딩중 발생");
    return;
  }
  if (isError) {
    console.log("token 발급 로딩중 발생");
    return;
  }

  return (
    <LiveKitRoom
      token={token} // 필수 요소
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} // 필수 요소
      video={true}
      audio={true}
      data-lk-theme="default"
      simulateParticipants={10} // 테스트용 카메라 생성
    >
      {children}
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
};

export default layout;
