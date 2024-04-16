"use client";
import { useUserInfo } from "@/hooks/useInfo";
import S from "@/style/livekit/livekit.module.css";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import dynamic from "next/dynamic";
import { redirect, useParams } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { useGetToken } from "../../../hooks/useToken";

const PreJoinNoSSR = dynamic(
  async () => {
    return (await import("@livekit/components-react")).PreJoin;
  },
  { ssr: false }
);

const RoomLayout = ({ children }: PropsWithChildren) => {
  const { id } = useParams();

  const room = id as string;

  if (!room) {
    console.log("useSearchParams의 인자 error 발생 ");
  }

  const { data: userInfo, isLoading: isUserLoading, isSuccess: isUserSuccess, isError: isUserError } = useUserInfo();
  const { data: token } = useGetToken(room);

  // if (isTokenLoading || !isTokenSuccess) {
  //   console.log("user 정보를 받는 중입니다.");
  // }

  // if (!userInfo) {
  //   return () => {
  //     alert("로그인 후 입장 가능합니다.");
  //     redirect("/login");
  //   };
  // }

  console.log(token);

  // if (isTokenLoading || !isTokenSuccess) {
  //   console.log("token 발급 중입니다.");
  // }

  // if (isTokenError) {
  //   console.log("token 발급 중 에러가 발생했습니다.");
  // }

  return (
    <main data-lk-theme="default">
      {room ? (
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
        <section className={S.settingWrapper}>
          <h2>오디오 & 캠 설정 창 입니다.</h2>
          <div className={S.settingCam}>
            <PreJoinNoSSR
              onError={(err) => console.log("setting error", err)}
              defaults={{
                username: "",
                videoEnabled: true,
                audioEnabled: true
              }}
              joinLabel="입장하기"
              onValidate={() => true}
            ></PreJoinNoSSR>
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

export default RoomLayout;
