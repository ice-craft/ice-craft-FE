"use client";

import MafiaPlayRooms from "@/components/mafia/MafiaPlayRooms";
import { useGetToken } from "@/hooks/useToken";
import useConnectStore from "@/store/connect-store";
import S from "@/style/livekit/livekit.module.css";
import { socket } from "@/utils/socket/socket";
import { LiveKitRoom, PreJoin, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import { useState } from "react";

const RoomPage = () => {
  const [isJoin, setIsJoin] = useState(false);
  const { roomId, userId } = useConnectStore();

  const { data: token, isPending, isSuccess, isError } = useGetToken(roomId);

  if (isPending || !isSuccess) {
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
      <main data-lk-theme="default">
        {isJoin ? (
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
        ) : (
          <section className={S.settingWrapper}>
            <h2>오디오 & 캠 설정 창 입니다.</h2>
            <div className={S.settingCam}>
              <PreJoin
                onError={(err) => console.log("setting error", err)}
                defaults={{
                  username: "",
                  videoEnabled: true,
                  audioEnabled: true
                }}
                joinLabel="입장하기"
                onSubmit={() => setIsJoin(true)}
                onValidate={() => true}
              ></PreJoin>
              <div className={S.settingUserButton}>
                <ul>
                  <li>오디오 설정 확인</li>
                  <li>캠 설정 확인</li>
                </ul>
              </div>
              <div className={S.cover}></div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default RoomPage;
