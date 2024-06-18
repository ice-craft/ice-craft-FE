import React from "react";

const MainSkeleton = () => {
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
              <RoomSearch searchHandler={searchHandler} search={search} setSearch={setSearch} />
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
    </main>
  );
};

export default MainSkeleton;
