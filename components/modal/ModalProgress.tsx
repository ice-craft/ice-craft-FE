import { useCountDown } from "@/hooks/useCountDown";
import { useCheckModalIsOpen, useModalActions, useModalIsOpen, useModalTimer } from "@/store/show-modal-store";
import S from "@/style/modal/modal.module.css";
import { useEffect, useState } from "react";

//NOTE - 추후 합칠 예정
const ModalProgress = () => {
  const isModal = useModalIsOpen();
  const timer = useModalTimer();
  const [count, setCount] = useState(timer * 10);

  // const isGroupModal = useGroupModalIsOpen();
  // const isVoteModal = useVoteModalIsOpen();
  const isCheckModal = useCheckModalIsOpen();
  const { setIsOpen, setCheckIsOpen, setGroupIsOpen, setVoteIsOpen } = useModalActions();

  //NOTE - 타이머 기능
  useCountDown(() => setCount((prevCount) => prevCount - 1), 100, isCheckModal);
  // useCountDown(() => setCount((prevCount) => prevCount - 1), 100, isGroupModal);
  // useCountDown(() => setCount((prevCount) => prevCount - 1), 100, isVoteModal);

  // 모달창 종료
  useEffect(() => {
    if (count === 0 && isCheckModal) {
      setCheckIsOpen(false);
    }
    // if (count === 0 && isVoteModal) {
    //   console.log("VoteModal 종료");
    //   setVoteIsOpen(false);
    // }
    // if (count <= 0 && isGroupModal) {
    //   console.log("GroupModal 종료");
    //   setGroupIsOpen(false);
    // }
  }, [count]);

  return <progress className={S.progress} value={(timer * 10 - count) * (100 / (timer * 10))} max={100}></progress>;
};

export default ModalProgress;
