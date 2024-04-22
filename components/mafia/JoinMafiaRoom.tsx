import { useGetToken } from "@/hooks/useToken";
import useConnectStore from "@/store/connect-store";
import { LiveKitRoom, PreJoin, RoomAudioRenderer } from "@livekit/components-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MafiaPlayRooms from "@/components/mafia/MafiaPlayRooms";
import S from "@/style/livekit/livekit.module.css";
import "@livekit/components-styles";
import { useExitStore } from "@/store/exit-store";
import useHandleBack from "@/utils/goBack/goBackHandler";

const JoinMafiaRoom = () => {
  const [isJoin, setIsJoin] = useState(false);
  const { roomId, userId } = useConnectStore();
  const { setIsExit } = useExitStore();
  const router = useRouter();

  const { data: token, isPending, isSuccess, isError } = useGetToken(roomId);

  if (isPending || !isSuccess) {
    console.log("로딩중입니다.");
  }

  if (isError) {
    console.log("토큰 발급중 에러 발생");
  }

  //NOTE - 방을 나갈 시에 작동되는 이벤트 헨들러 ==> useEffect와 비슷하다.
  const disConnected = () => {
    setIsExit(true);

    const timer = setTimeout(() => {
      router.replace("/main");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  };

  // useHandleBack(roomId, userId);

  //NOTE - 페이지를 나갈 시에 경고창을 띄우는 이벤트 헨들러
  useEffect(() => {
    const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
      const message = "정말 이 페이지를 나가겠습니까?";
      event.returnValue = message; // 표준에 따라 returnValue 설정
      return message;
    };

    // 이벤트 리스너 등록
    window.addEventListener("beforeunload", beforeUnloadHandler);

    // 클린업 함수
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, []);

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
