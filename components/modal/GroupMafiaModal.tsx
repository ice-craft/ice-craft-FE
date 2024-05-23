import { useCountDown } from "@/hooks/useCountDown";
import { useGroupModalElement, useModalActions, useModalTimer } from "@/store/show-Modal-store";

import S from "@/style/modal/modal.module.css";
import { useEffect } from "react";

const GroupMafiaModal = () => {
  const title = useGroupModalElement();
  const { setIsOpen } = useModalActions();
  const timer = useModalTimer();
  const count = useCountDown(timer);

  // 모달창 종료 시점
  useEffect(() => {
    if (count === 0) {
      setIsOpen(false);
      // console.log("ModalTime 종료", count);
    }
  }, [count]);

  // console.log("GroupModal", timer);

  if (!timer || !count) {
    return;
  }

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
