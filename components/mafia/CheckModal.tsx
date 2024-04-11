import React from "react";
import S from "@/style/modal/modal.module.css";
import { useCountDown } from "@/hooks/useCountDown";

const CheckModal = () => {
  const initialTime = 5;
  const count = useCountDown(initialTime);

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>찬반 투표</h1>
            <div className={S.userCheckNickName}>
              <p>
                <span>닉네임</span> 님을
                <br /> 최종적으로 지목하시겠습니까?
              </p>
            </div>
            <div className={S.checkButton}>
              <button>찬성</button>
              <button>반대</button>
            </div>
            <progress
              className={S.progress}
              value={(initialTime * 10 - count) * (100 / (initialTime * 10))}
              max={100}
            ></progress>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckModal;
