import React from "react";
import S from "@/style/modal/modal.module.css";

const CheckModal = () => {
  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>찬반 투표</h1>
            {/* <h2>{content}</h2> */}
            {/* <p>{timer}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckModal;
