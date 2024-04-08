"use client";
import { useGetToken } from "@/hooks/useToken";
import { LiveKitRoom, LocalUserChoices, RoomAudioRenderer } from "@livekit/components-react";

import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import * as React from "react";

const PreJoinNoSSR = dynamic(
  async () => {
    return (await import("@livekit/components-react")).PreJoin;
  },
  { ssr: false }
);

const Home: NextPage = () => {
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
  //   const router = useRouter();
  //   const { name: roomName } = router.query;

  const [preJoinChoices, setPreJoinChoices] = React.useState<LocalUserChoices | undefined>(undefined);

  function handlePreJoinSubmit(values: LocalUserChoices) {
    setPreJoinChoices(values);
  }
  return (
    <>
      <main data-lk-theme="default">
        {preJoinChoices ? (
          <LiveKitRoom
            token={token} // 필수 요소
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} // 필수 요소
            video={true}
            audio={true}
            data-lk-theme="default"
            // simulateParticipants={10} // 테스트용 카메라 생성
          >
            <RoomAudioRenderer />
          </LiveKitRoom>
        ) : (
          <div style={{ display: "grid", placeItems: "center", height: "100%" }}>
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
    </>
  );
};

export default Home;
