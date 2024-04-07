import React from "react";
import S from "@/app/_style/modal/modal.module.css";
import { useModalStore } from "@/app/_store/modal-store";

const MainCreateRoom = () => {
  const { setIsModal } = useModalStore();
  const closeModalHandler = (e: any) => {
    if (e.target === e.currentTarget) {
      setIsModal(false);
    }
  };
  return (
    <div className={S.modalWrap} onClick={closeModalHandler}>
      <div className={S.modal}>
        <div className="MainCreateRoom">
          <div className="MainCreateRoom-content">
            <h2>게임을 선택해주세요</h2>
            <p>게임 고르기</p>
            <button>마피아</button>
            <button>노래 맞추기</button>
            <p>방제목</p>
            <input type="text" />
            <p>인원수</p>
            {/* 인원수 선택 드랍다운 */}
            <button>인원수를 선택하세요</button>
            <button onClick={() => setIsModal(false)}>닫기</button>
            <button>확인</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCreateRoom;
