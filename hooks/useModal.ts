import { useState, useCallback, useEffect } from "react";
import { socket } from "@/utils/socket/socket";
import { ModalData } from "@/types/index";
import { useCountStore } from "@/store/count-store";

function useModal() {
  const { timer, setTimer, setIsStart } = useCountStore();
  const [modalState, setModalState] = useState<ModalData>({
    isOpen: false,
    title: "",
    message: "",
    nickname: "",
    timer: 0
  });
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null); // 타이머 ID 저장을 위한 상태

  const closeModal = useCallback(() => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
    setIsStart(false);
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  }, [setIsStart, timeoutId]);

  const openModal = useCallback(
    (data: ModalData) => {
      setModalState({ ...data, isOpen: true });
      setIsStart(true);
      setTimer(data.timer);

      // 기존에 설정된 타이머가 있다면 취소
      if (timeoutId) clearTimeout(timeoutId);

      // 새 타이머 설정
      const id = setTimeout(() => {
        closeModal();
      }, data.timer * 1000);
      setTimeoutId(id);
    },
    [closeModal, setTimer, setIsStart, timeoutId]
  );

  useEffect(() => {
    const showModalHandler = (data: ModalData) => {
      openModal({ ...data, isOpen: true });
    };

    socket.on("showModal", showModalHandler);

    return () => {
      socket.off("showModal");
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [openModal, timeoutId]);

  useEffect(() => {
    if (timer === 0 && modalState.isOpen) {
      closeModal();
    }
  }, [timer, modalState.isOpen, closeModal]);

  return { modalState, openModal, closeModal };
}

export default useModal;
