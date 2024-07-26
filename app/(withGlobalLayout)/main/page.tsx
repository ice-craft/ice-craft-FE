"use client";

import MainCreateRoom from "@/components/main/CreateRoomModal";
import MainVisual from "@/components/main/MainVisual";
import RoomList from "@/components/main/RoomList";
import useJoinRoom from "@/hooks/useJoinRoom";
import useJoinRoomSocket from "@/hooks/useJoinRoomSocket";
import { useCreate, useCreateActions } from "@/store/toggle-store";
import S from "@/style/mainpage/main.module.css";
import CommonsLoading from "@/utils/CommonsLoading";
import FormSearch from "@/utils/FormSearch";
import GoTopButton from "@/utils/GoTopButton";
import InfoChat from "@/utils/InfoChat";
import Popup from "@/utils/Popup";
import { socket } from "@/utils/socket/socket";
import { useEffect, useRef } from "react";

const Mainpage = () => {
  const isGoInClick = useRef(false);
  const isCreate = useCreate();
  const { setIsCreate } = useCreateActions();
  const { fastJoinRoomHandler } = useJoinRoom();
  useJoinRoomSocket();

  console.log("MainPage 작동");

  //NOTE - 소켓 연결, 메인 페이지 history 추가
  useEffect(() => {
    history.pushState(null, "", "");

    //NOTE - history stack 관리
    if (history.length >= 5) {
      const back = (history.length - 1) * -1;

      history.go(back);
      history.pushState(null, "", "");
    }

    socket.connect();
    socket.emit("enterMafia");
  }, []);

  return (
    <main className={S.main}>
      <section className={S.visualSection}>
        <MainVisual />
      </section>
      <div className={S.roomSectionWrap}>
        <section className={S.roomSection}>
          <div className={S.MainGnb}>
            <p>현재 활성화 되어있는 방</p>
            <div className={S.roomSearchAndButton}>
              <FormSearch placeholder="방 이름을 입력해 주세요." />
              <div className={S.gameGoButton}>
                <button disabled={isGoInClick.current} onClick={fastJoinRoomHandler}>
                  빠른입장
                </button>
                <div className={S.makeRoomButton}>
                  <button onClick={() => setIsCreate(true)} className={S.makeRoom}>
                    방 만들기
                  </button>
                </div>
                {isCreate ? <MainCreateRoom /> : null}
              </div>
            </div>
          </div>
          <RoomList />
          <CommonsLoading />
        </section>
      </div>
      <InfoChat />
      <GoTopButton />
      <Popup />
    </main>
  );
};

export default Mainpage;
