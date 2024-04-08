"use client";
import { LiveKitRoom, LocalUserChoices, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { useGetToken } from "../../../hooks/useToken";

const PreJoinNoSSR = dynamic(
  async () => {
    return (await import("@livekit/components-react")).PreJoin;
  },
  { ssr: false }
);

const layout = ({ children }: PropsWithChildren) => {
  const [preJoinChoices, setPreJoinChoices] = React.useState<LocalUserChoices | undefined>(undefined);

  const params = useSearchParams();
  const room = params.get("room");
  const name = params.get("name");

  function handlePreJoinSubmit(values: LocalUserChoices) {
    setPreJoinChoices(values);
  }

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
            onError={(err) => console.log("error while setting up prejoin", err)}
            defaults={{
              username: "",
              videoEnabled: true,
              audioEnabled: true
            }}
            onSubmit={handlePreJoinSubmit}
          ></PreJoinNoSSR>
        </div>
      )}
    </main>
  );
};

export default layout;
