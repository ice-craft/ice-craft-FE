import { useCountDown } from "@/hooks/useCountDown";
import useSocketOff from "@/hooks/useSocketOff";
import useSocketOn from "@/hooks/useSocketOn";
import { useGroupModalElement, useModalActions, useModalTimer } from "@/store/show-modal-store";

import S from "@/style/modal/modal.module.css";
import { useEffect, useState } from "react";

const GroupMafiaModal = () => {
  const title = useGroupModalElement();
  const timer = useModalTimer();
  const { setIsOpen } = useModalActions();
  const count = useCountDown(timer);

  useEffect(() => {
    console.log("실행되니?");
  }, []);

  // 모달창 종료
  useEffect(() => {
    if (count === 0) {
      setIsOpen(false);
      // console.log("ModalTime 종료", count);
    }
  }, [count]);

  // console.log("GroupModalCount", count);

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            {title && <h1>{title}</h1>}
            <progress className={S.progress} value={(timer * 10 - count) * (100 / (timer * 10))} max={100}></progress>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupMafiaModal;
