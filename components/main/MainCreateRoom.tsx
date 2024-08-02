import React, { useState } from "react";
import CreateRoomModal from "./CreateRoomModal";
import S from "@/style/mainpage/main.module.css";

const MainCreateRoom = () => {
  const [isCreate, setIsCreate] = useState(false);

  return (
    <>
      <div className={S.makeRoomButton}>
        <button onClick={() => setIsCreate(true)} className={S.makeRoom}>
          방 만들기
        </button>
      </div>
      {isCreate && <CreateRoomModal setIsCreate={setIsCreate} />}
    </>
  );
};

export default MainCreateRoom;
