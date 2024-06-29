"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import VisitEmptyImage from "@/assets/images/visit_empty.svg";
import S from "@/style/mainpage/main.module.css";
import GoTopButton from "@/utils/GoTopButton";
import MainCreateRoom from "@/components/main/CreateRoomModal";
import { useCreateStore } from "@/store/toggle-store";
import MainVisual from "@/components/main/MainVisual";
import FormSearch from "@/utils/FormSearch";
import RoomListItem from "@/components/main/RoomListItem";
import useGetRoomsSocket from "@/hooks/useGetRoomsSocket";
import MainSkeleton from "@/components/main/MainSkeleton";
import useJoinRoom from "@/hooks/useJoinRoom";
import CommonsLoading from "@/utils/CommonsLoading";
import Popup from "@/utils/Popup";

const Mainpage = () => {
  const { rooms } = useGetRoomsSocket();
  const { isCreate, setIsCreate } = useCreateStore();

  const isGoInClick = useRef(false);
  const { joinRoomHandler, fastJoinRoomHandler, loading } = useJoinRoom();

  //NOTE - 메인 페이지 history 추가
  useEffect(() => {
    history.pushState(null, "", "");
  }, []);

  //NOTE - 방 목록 리스트 데이터 불러오기 전까지 스켈레톤 UI
  if (!rooms) return <MainSkeleton />;

  return (
    <>
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
            {rooms.length > 0 ? (
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
            {loading && <CommonsLoading />}
          </section>
        </div>
        <GoTopButton />
      </main>
      <Popup />
    </>
  );
};

export default Mainpage;
