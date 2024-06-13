import RenderCards from "@/components/mafia/RenderCards";
import { useCountDown } from "@/hooks/useCountDown";
import {
  useModalActions,
  useModalIsOpen,
  useModalTimer,
  useRoleModalElement,
  useRoleModalIsOpen
} from "@/store/show-modal-store";
import S from "@/style/modal/modal.module.css";
import React, { useEffect, useState } from "react";

const UserRoleModal = () => {
  const isModal = useModalIsOpen();
  const isRoleModal = useRoleModalIsOpen();
  const { setIsOpen, setRoleIsOpen } = useModalActions();
  const timer = useModalTimer();
  const [count, setCount] = useState(timer * 10);

  useCountDown(() => setCount((prevCount) => prevCount - 1), 100, isRoleModal);

  // 모달창 종료
  useEffect(() => {
    if (count === 2 && isRoleModal) {
      setRoleIsOpen(false);
    }
  }, [count]);

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.workModal}>
          <h1 className={S.workTitle}>직업을 정하겠습니다.</h1>
          <ul className={S.workList}>
            <RenderCards />
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserRoleModal;
