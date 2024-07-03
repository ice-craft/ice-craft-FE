import MafiaPlayRooms from "@/components/mafia/MafiaPlayRooms";
import usePopStateHandler from "@/hooks/usePopStateHandler";
import { useGetToken } from "@/hooks/useToken";
<<<<<<< HEAD
import { useConnectActions, useNickname, useRoomId, useRoomsCurrent, useUserId } from "@/store/connect-store";
import { useExitAction } from "@/store/exit-store";
=======
import { useNickname, useRoomId, useUserId } from "@/store/connect-store";
import { useRoomAction } from "@/store/room-store";
>>>>>>> dc1d3a925cd64844345df35a242a5de6648c55d1
import S from "@/style/livekit/livekit.module.css";
import useBeforeUnloadHandler from "@/utils/reload/useBeforeUnloadHandler";
import { socket } from "@/utils/socket/socket";
import { LiveKitRoom, PreJoin } from "@livekit/components-react";
import "@livekit/components-styles";
import { useEffect, useState } from "react";

const JoinMafiaRoom = () => {
  const roomId = useRoomId();
  const userId = useUserId();
  const nickname = useNickname();

  const [isJoinError, setIsJoinError] = useState(true);
  const [isJoin, setIsJoin] = useState(false);
<<<<<<< HEAD
  const { setIsExit, setIsBack } = useExitAction();
  const isBack = usePopStateHandler();
  const { setRooms } = useConnectActions();
  const rooms = useRoomsCurrent();

  // BeforeUnloadHandler();
=======
  const { setIsEntry, setIsBack } = useRoomAction();
  const isPopState = usePopStateHandler();
  const { setIsReLoad } = useBeforeUnloadHandler();
>>>>>>> dc1d3a925cd64844345df35a242a5de6648c55d1

  //NOTE - 뒤로가기 시 작동
  useEffect(() => {
    if (isPopState) {
      socket.emit("exitRoom", roomId, userId);
      setIsEntry(false);
      setIsBack(true);
    }
  }, [isPopState]);

<<<<<<< HEAD
  // // exitRoom 이벤트 처리
  // useEffect(() => {
  //   socket.on("exitRoom", (rooms) => {
  //     setRooms(rooms); // 방 정보 업데이트
  //   });
  // }, [setRooms]);

=======
  //NOTE - 방입장 이벤트
  const joinRoomHandler = () => {
    setIsReLoad(true); //새로고침 팝업창 on, off
    setIsJoin(true); //방 입장
  };

  //NOTE - 방에러 이벤트
>>>>>>> dc1d3a925cd64844345df35a242a5de6648c55d1
  const joinError = (error: Error | string) => {
    // setIsJoinError(false);  // 미디어 비활성화 및 토큰 발급 error시 실행
    console.log("joinError", error);
  };

  const { data: token, isPending, isError, error } = useGetToken(roomId, userId, nickname);

  if (isPending) {
    console.log("로딩중");
  }

  if (isError) {
    joinError(error);
  }

  //NOTE - 방 에러 UI
  if (!isJoinError) {
    return (
      <div>
        <p>
          게임 접속에 불편을 드려서 죄송합니다. 현재 원활한 게임이 진행되지 않고 있으니, 다시 접속해 주시기 바랍니다.
        </p>
        <button
          onClick={() => {
            socket.emit("exitRoom", roomId, userId);
<<<<<<< HEAD
            setIsExit(true);
            // setRooms(rooms);
=======
            setIsEntry(false);
>>>>>>> dc1d3a925cd64844345df35a242a5de6648c55d1
          }}
        >
          나가기
        </button>
      </div>
    );
  }

  return (
    <main data-lk-theme="default">
      {isJoin ? (
        <LiveKitRoom
          token={token} // 필수 요소
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} // 필수 요소
          video={true}
          audio={true}
          onError={joinError}
          connect={true}
        >
          <MafiaPlayRooms />
        </LiveKitRoom>
      ) : (
        <section className={S.settingWrapper}>
          <h2>오디오 & 캠 설정 창 입니다.</h2>
          <div className={S.settingCam}>
            <PreJoin
              onError={joinError}
              joinLabel="입장하기"
              onSubmit={joinRoomHandler} // 입장하기 버튼 이벤트 헨들러
              onValidate={() => isJoinError} // 입장하기 버튼 활성화
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
