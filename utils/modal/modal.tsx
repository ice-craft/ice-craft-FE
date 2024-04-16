import React from "react";
import S from "@/style/modal/modal.module.css";
// 공용 모달창
const Modal = () => {
  return (
    <div className={S.modalWrap}>
      <div className={S.modal}></div>
    </div>
  );
};

export default Modal;
