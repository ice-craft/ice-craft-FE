import { useCountDown } from "@/hooks/useCountDown";
import useSocketOff from "@/hooks/useSocketOff";
import useSocketOn from "@/hooks/useSocketOn";
import { useGroupModalElement, useModalActions, useModalTimer } from "@/store/show-modal-store";

import S from "@/style/modal/modal.module.css";
import { useEffect, useState } from "react";

const GroupMafiaModal = () => {
  // const title = useGroupModalElement();
  // const timer = useModalTimer();
  const [title, setTitle] = useState("");
  const [timer, setTimer] = useState(-1);
  const { setIsOpen } = useModalActions();
  const count = useCountDown(timer);
  // const { toggleOverlay, setIsOverlay, clearActiveParticipant, setIsRemoteOverlay } = useOverlayStore();

  // const { setIsOpen, setTitle, setTimer } = useModalActions();

  const showModalSocket = "showModal";
  const showModalHandler = (title: string, timer: number) => {
    // 모달창 요소
    setIsOpen(true);
    setTitle(title);
    setTimer(timer);
    // setIsOverlay(false); //캠 클릭 이벤트 비활성화
    console.log("showModal 정상작동");
  };

  //NOTE - socket On, Off 담당
  useSocketOn(showModalSocket, showModalHandler);
  useSocketOff(showModalSocket);

  // 모달창 종료
  useEffect(() => {
    if (count === 0) {
      setIsOpen(false);
      // console.log("ModalTime 종료", count);
    }
  }, [count]);

  console.log("GroupModalCount", count);

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
