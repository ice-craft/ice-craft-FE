import JSConfetti from "js-confetti";
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

const VictoryModal = () => {
  const jsConfetti = new JSConfetti();

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

  jsConfetti.addConfetti({
    confettiColors: ["#ff0000", "#00ff00", "#0000ff"],
    confettiRadius: 5,
    confettiNumber: 300
  });

  return (
    <>
      <div className={S.modalWrap}>
        <div className={`${S.modal} ${S.victoryModal}`}>
          <div>
            <p>시민 승리!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VictoryModal;
