import React, { useState } from "react";
import CreateRoomModal from "./CreateRoomModal";
import S from "@/style/mainpage/main.module.css";
import useJoinRoom from "@/hooks/useJoinRoom";

const MainCreateRoom = () => {
  const [isCreate, setIsCreate] = useState(false);
  const { createRoomModalHandler } = useJoinRoom();

  return (
    <>
      <div className={S.makeRoomButton}>
        <button onClick={() => createRoomModalHandler(setIsCreate)} className={S.makeRoom}>
          방 만들기
        </button>
      </div>
      {isCreate && <CreateRoomModal setIsCreate={setIsCreate} />}
    </>
  );
};

export default MainCreateRoom;
