import MafiaPlayRooms from "@/components/mafia/MafiaPlayRooms";
import { useGetToken } from "@/hooks/useToken";
import useConnectStore from "@/store/connect-store";
import { useExitStore } from "@/store/exit-store";
import S from "@/style/livekit/livekit.module.css";
import BeforeUnloadHandler from "@/utils/reload/beforeUnloadHandler";
import { LiveKitRoom, PreJoin, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const JoinMafiaRoom = () => {
  const [isJoin, setIsJoin] = useState(false);
  const { roomId, userId, nickname } = useConnectStore();
  const { setIsExit } = useExitStore();
  const router = useRouter();
  BeforeUnloadHandler();

  const { data: token, isPending, isSuccess, isError } = useGetToken(roomId, userId, nickname);

  if (isPending || !isSuccess) {
    console.log("로딩중입니다.");
  }

  if (isError) {
    console.log("토큰 발급중 에러 발생");
  }

  //NOTE - 방을 나갈 시에 작동되는 이벤트 헨들러
  // supabase의 성능문제를 해결하기위해 로딩창을 띄어 텀을 주었다.
  const disConnected = () => {
    setIsExit(true);

    const timer = setTimeout(() => {
      router.replace("/main");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <main data-lk-theme="default">
      {isJoin ? (
        <LiveKitRoom
          token={token} // 필수 요소
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} // 필수 요소
          video={true}
          audio={true}
          connect={true}
          onDisconnected={disConnected}
        >
          <MafiaPlayRooms />
          {/* 원격 참가자의 오디오 트랙을 처리 및 관리 */}
          <RoomAudioRenderer muted={false} />
        </LiveKitRoom>
      ) : (
        <section className={S.settingWrapper}>
          <h2>오디오 & 캠 설정 창 입니다.</h2>
          <div className={S.settingCam}>
            <PreJoin
              onError={(err) => console.log("setting error", err)}
              joinLabel="입장하기"
              onSubmit={() => setIsJoin(true)} // 입장하기 버튼 이벤트 헨들러
              onValidate={() => true} // 입장하기 버튼 활성화
            ></PreJoin>
            <div className={S.settingUserButton}>
              <ul>
                <li>오디오 설정 </li>
                <li>캠 설정 </li>
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
