import React from "react";
import S from "@/app/_style/modal/modal.module.css";
// 공용 모달창
const Modal = () => {
  return (
    <div className={S.modalWrap}>
      <div className={S.modal}>
        <div>
          <p>모달 내용</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
