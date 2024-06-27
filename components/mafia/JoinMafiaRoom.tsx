import MafiaPlayRooms from "@/components/mafia/MafiaPlayRooms";
import { useGetToken } from "@/hooks/useToken";
import useConnectStore from "@/store/connect-store";
import { useExitStore } from "@/store/exit-store";
import S from "@/style/livekit/livekit.module.css";
import BeforeUnloadHandler from "@/utils/reload/beforeUnloadHandler";
import { socket } from "@/utils/socket/socket";
import { LiveKitRoom, PreJoin } from "@livekit/components-react";
import "@livekit/components-styles";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const JoinMafiaRoom = () => {
  const [isJoin, setIsJoin] = useState(false);
  const { setIsExit } = useExitStore();

  const { roomId, userId, nickname } = useConnectStore();
  // BeforeUnloadHandler();

  useEffect(() => {
    history.pushState(null, "", "");

    const handlePopstate = (e: PopStateEvent) => {
      socket.emit("exitRoom", roomId, userId);
      setIsExit(true);
    };

    // 이벤트 리스너 등록
    window.addEventListener("popstate", handlePopstate);
    // 이벤트 리스너 제거
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  const { data: token, isPending, isSuccess, isError } = useGetToken(roomId, userId, nickname);

  if (isPending || !isSuccess) {
    console.log("로딩중입니다.");
  }

  if (isError) {
    console.log("토큰 발급중 에러 발생");
  }

  return (
    <main data-lk-theme="default">
      {isJoin ? (
        <LiveKitRoom
          token={token} // 필수 요소
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} // 필수 요소
          video={true}
          audio={true}
          connect={true}
        >
          <MafiaPlayRooms />
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
