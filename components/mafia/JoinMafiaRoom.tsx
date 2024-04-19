import { useGetToken } from "@/hooks/useToken";
import useConnectStore from "@/store/connect-store";
import { LiveKitRoom, PreJoin, RoomAudioRenderer } from "@livekit/components-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MafiaPlayRooms from "@/components/mafia/MafiaPlayRooms";
import S from "@/style/livekit/livekit.module.css";
import "@livekit/components-styles";
import { useExitStore } from "@/store/exit-store";

const JoinMafiaRoom = () => {
  const [isJoin, setIsJoin] = useState(false);
  const { setIsExit } = useExitStore();
  const { roomId } = useConnectStore();
  const router = useRouter();

  const { data: token, isPending, isSuccess, isError } = useGetToken(roomId);

  if (isPending || !isSuccess) {
    console.log("로딩중입니다.");
  }

  if (isError) {
    console.log("토큰 발급중 에러 발생");
  }

  const disConnected = () => {
    setIsExit(true);
    setTimeout(() => {
      router.replace("/main");
    }, 3000); // 5초 후에 로딩을 완료합니다.
  };

  return (
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
  );
};

export default JoinMafiaRoom;
