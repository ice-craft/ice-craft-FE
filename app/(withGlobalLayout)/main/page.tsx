"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import VisitEmptyImage from "@/assets/images/visit_empty.svg";
import S from "@/style/mainpage/main.module.css";
import GoTopButton from "@/utils/GoTopButton";
import MainCreateRoom from "@/components/main/CreateRoomModal";
import { useCreateStore } from "@/store/toggle-store";
import MainVisual from "@/components/main/MainVisual";
import RoomSearch from "@/utils/RoomSearch";
import RoomListItem from "@/components/main/RoomListItem";
import useGetRoomsSocket from "@/hooks/useGetRoomsSocket";
import MainSkeleton from "@/components/main/MainSkeleton";
import useJoinRoom from "@/hooks/useJoinRoom";

const Mainpage = () => {
  const { rooms } = useGetRoomsSocket();
  const { isCreate, setIsCreate } = useCreateStore();

  const isGoInClick = useRef(false);
  const { joinRoomHandler, fastJoinRoomHandler, gameStartHandler } = useJoinRoom();

  console.log("메인페이지 룸리스트", rooms);
  //NOTE - 이전 코드
  /*
  useEffect(() => {
    socket.connect();
    socket.emit("enterMafia", 0, 20);
    const checkUserInfo = async () => {
      const userInfo = await getUserInfo();

      // 세션 스토리지에 저장
      if (userInfo) {
        setUserId(crypto.randomUUID());
        setUserNickname(crypto.randomUUID());
        // setUserId(userInfo.id);
        // setUserNickname(userInfo.user_metadata.nickname);
      }
    };
    checkUserInfo();
  }, []);
  */

  //NOTE - 방 목록 리스트 데이터 불러오기 전까지 스켈레톤 UI
  if (!rooms) return <MainSkeleton />;

  return (
    <main className={S.main}>
      <section className={S.visualSection}>
        <MainVisual gameStartHandler={gameStartHandler} />
      </section>
      <div className={S.roomSectionWrap}>
        <section className={S.roomSection}>
          <div className={S.MainGnb}>
            <p>현재 활성화 되어있는 방</p>
            <div className={S.roomSearchAndButton}>
              <RoomSearch />
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
          {rooms ? (
            <ul className={S.roomList}>
              {rooms.map((item) => (
                <RoomListItem key={item.room_id} item={item} joinRoomHandler={joinRoomHandler} />
              ))}
            </ul>
          ) : (
            <div className={S.roomVisitEmpty}>
              <Image src={VisitEmptyImage} alt="Room list empty" />
            </div>
          )}
        </section>
      </div>
      <GoTopButton />
    </main>
  );
};

export default Mainpage;
