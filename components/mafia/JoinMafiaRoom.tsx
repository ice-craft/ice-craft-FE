import MafiaPlayRooms from "@/components/mafia/MafiaPlayRooms";
import useBeforeUnloadHandler from "@/hooks/useBeforeUnloadHandler";
import usePopStateHandler from "@/hooks/usePopStateHandler";
import { useNickname, useUserId } from "@/store/connect-store";
import { useRoomAction } from "@/store/room-store";
import Style from "@/style/commons/commons.module.css";
import S from "@/style/livekit/livekit.module.css";
import { getToken } from "@/utils/livekit/liveKitApi";
import { socket } from "@/utils/socket/socket";
import { checkUserLoginInfo } from "@/utils/supabase/authAPI";
import { LiveKitRoom, PreJoin } from "@livekit/components-react";
import "@livekit/components-styles";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const JoinMafiaRoom = () => {
  const roomId = useParams();
  const [userInfo, setUserInfo] = useState({
    userId: "",
    nickname: ""
  });
  const [token, setToken] = useState("");
  const [isJoinError, setIsJoinError] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const isPopState = usePopStateHandler();
  const { setIsEntry, setIsBack } = useRoomAction();
  const { setIsReLoad } = useBeforeUnloadHandler();
  //FIXME - 임시 로그인
  const exUserIds = useUserId();
  const exNickname = useNickname();

  //NOTE - 뒤로가기 시 작동
  useEffect(() => {
    if (isPopState) {
      socket.emit("exitRoom", roomId.id, userInfo.userId);
      setIsEntry(false);
      setIsBack(true);
    }
  }, [isPopState]);

  //NOTE - 쿠키에 저장된 로그인 정보
  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const loginInfo = await checkUserLoginInfo();
        if (loginInfo) {
          const nickname = loginInfo.user_metadata.nickname || loginInfo.user_metadata.name;
          // setUserInfo({ userId: loginInfo.id, nickname });
          //FIXME - 임시 로그인
          setUserInfo({ userId: exUserIds, nickname: exNickname });
        }
      } catch (error) {
        joinErrorHandler(error);
      }
    };

    checkUserInfo();
  }, []);

  //NOTE - 토큰 발급
  useEffect(() => {
    const userToken = async () => {
      try {
        const token = await getToken(roomId.id, userInfo.userId, userInfo.nickname);

        if (token) {
          setToken(token);
        }
      } catch (error) {
        joinErrorHandler(error);
      }
    };

    // 로그인 정보 존재 시
    if (userInfo.userId && userInfo.nickname) {
      userToken();
    }
  }, [userInfo]);

  //NOTE - 방입장 이벤트
  const joinRoomHandler = () => {
    setIsReLoad(true); //새로고침 팝업창 on, off
    setIsJoin(true); //방 입장
  };

  //NOTE - 에러 이벤트 핸들러(로그인, 토큰, 방입장 등)
  const joinErrorHandler = (error: Error | string | unknown) => {
    setIsJoinError(true); // 미디어 비활성화 및 토큰 발급 error시 실행
  };

  //NOTE - 방 에러 UI
  if (isJoinError) {
    return (
      <section className={Style.mainSection}>
        <h2>게임 접속에 불편을 드려서 죄송합니다.</h2>
        <h3>현재 원활한 게임이 진행되지 않고 있으니, 다시 접속해 주시기 바랍니다.</h3>
        <button
          onClick={() => {
            socket.emit("exitRoom", roomId.id, userInfo.userId);
            setIsEntry(false);
          }}
        >
          메인페이지로 이동하기
        </button>
      </section>
    );
  }

  return (
    <main data-lk-theme="default">
      {isJoin ? (
        <>
          <LiveKitRoom
            token={token} // 필수 요소
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} // 필수 요소
            video={true}
            audio={true}
            onError={joinErrorHandler}
            connect={true}
          >
            <MafiaPlayRooms />
          </LiveKitRoom>
        </>
      ) : (
        <section className={S.settingWrapper}>
          <h2>오디오 & 캠 설정 창 입니다.</h2>
          <div className={S.settingCam}>
            <PreJoin
              onError={joinErrorHandler}
              joinLabel="입장하기"
              onSubmit={joinRoomHandler} // 입장하기 버튼 이벤트 헨들러
              onValidate={() => !isJoinError} // 입장하기 버튼 활성화
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
