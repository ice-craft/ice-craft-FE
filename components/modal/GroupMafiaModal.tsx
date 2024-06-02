import { useCountDown } from "@/hooks/useCountDown";
import { useGroupModalElement, useModalActions, useModalIsOpen, useModalTimer } from "@/store/show-modal-store";

import S from "@/style/modal/modal.module.css";
import { useEffect, useState } from "react";

const GroupMafiaModal = () => {
  const isModal = useModalIsOpen();
  const title = useGroupModalElement();
  const timer = useModalTimer();

  const [count, setCount] = useState(timer * 10);
  const { setIsOpen, setGroupIsOpen } = useModalActions();

  //NOTE - 타이머 기능
  useCountDown(() => setCount((prevCount) => prevCount - 1), 100, isModal);

  // 모달창 종료
  useEffect(() => {
    if (count === 0 && isModal) {
      setGroupIsOpen(false);
    }
  }, [count]);

  // console.log("Modal", count);

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
