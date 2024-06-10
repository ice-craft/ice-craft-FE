import { useCountDown } from "@/hooks/useCountDown";
import {
  useGroupModalElement,
  useGroupModalIsOpen,
  useModalActions,
  useModalIsOpen,
  useModalTimer
} from "@/store/show-modal-store";

import S from "@/style/modal/modal.module.css";
import { useEffect, useState } from "react";

const VictoryResultModal = () => {
  const isModal = useModalIsOpen();
  const isGroupModal = useGroupModalIsOpen();
  const timer = useModalTimer();

  const [count, setCount] = useState(timer * 10);
  const { setIsOpen, setGroupIsOpen } = useModalActions();

  //NOTE - 타이머 기능
  useCountDown(() => setCount((prevCount) => prevCount - 1), 100, isGroupModal);

  // 모달창 종료
  useEffect(() => {
    if (count <= 0 && isGroupModal) {
      setGroupIsOpen(false);
    }
  }, [count]);

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <p>시민 승리!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VictoryResultModal;
