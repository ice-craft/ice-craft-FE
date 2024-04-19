import { useState, useEffect } from "react";
import { socket } from "@/utils/socket/socket";
import { ModalData } from "@/types/index";
import { useCountStore } from "@/store/count-store";

const useModal = () => {
  const { setTimer, setIsStart } = useCountStore();
  const [modalState, setModalState] = useState<ModalData>({
    isOpen: false,
    title: "",
    message: "",
    nickname: "",
    timer: 0
  });

  // 타이머를 저장하기 위한 상태 state
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  function openModal(data: ModalData) {
    setModalState({ ...data, isOpen: true });
    setIsStart(true);
    setTimer(data.timer);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 새 타이머 설정, 자동으로 닫힘
    const id = setTimeout(() => {
      setModalState((prev) => ({ ...prev, isOpen: false }));
      setIsStart(false);
    }, data.timer * 1000);
    setTimeoutId(id);
  }

  useEffect(() => {
    const showModalHandler = (data: ModalData) => {
      openModal({ ...data, isOpen: true });
    };

    socket.on("showModal", showModalHandler);

    return () => {
      socket.off("showModal");
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [openModal, timeoutId]);

  return { modalState, openModal };
};

export default useModal;
