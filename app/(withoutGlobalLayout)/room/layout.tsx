"use client";
import { LiveKitRoom, LocalUserChoices, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React, { PropsWithChildren, useState } from "react";
import { useGetToken } from "../../../hooks/useToken";

const PreJoinNoSSR = dynamic(
  async () => {
    return (await import("@livekit/components-react")).PreJoin;
  },
  { ssr: false }
);

const layout = ({ children }: PropsWithChildren) => {
  const { id } = useParams();

  const [preJoinChoices, setPreJoinChoices] = useState<LocalUserChoices>();

  const room = id as string;
  const name = preJoinChoices?.username as string;

  const handlePreJoinSubmit = (values: LocalUserChoices) => {
    setPreJoinChoices(values);
  };

  if (!room) {
    console.log("useSearchParams의 인자 error 발생 ");
    return;
  }

  const { data: token, isLoading, isSuccess, isError } = useGetToken({ room, name });

  if (isLoading || !isSuccess) {
    console.log("token 발급 중입니다.");
  }
  if (isError) {
    console.log("token 발급 중 에러가 발생했습니다.");
  }

  return (
    <main data-lk-theme="default">
      {room && preJoinChoices ? (
        <LiveKitRoom
          token={token} // 필수 요소
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} // 필수 요소
          video={true}
          audio={true}

          // simulateParticipants={10} // 테스트용 카메라 생성
        >
          {children}
          <RoomAudioRenderer />
        </LiveKitRoom>
      ) : (
        <div style={{ display: "grid", placeItems: "center", height: "100", width: "100%" }}>
          <PreJoinNoSSR
            onError={(err) => console.log("setting error", err)}
            defaults={{
              username: "",
              audioEnabled: true,
              videoEnabled: true
            }}
            onSubmit={handlePreJoinSubmit}
          ></PreJoinNoSSR>
        </div>
      )}
    </main>
  );
};

export default layout;
