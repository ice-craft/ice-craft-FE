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

  useEffect(() => {
    const showModalHandler = (data: ModalData) => {
      setModalState({ ...data, isOpen: true });
      setIsStart(true);
      setTimer(data.timer);

      const timer = setTimeout(() => {
        setModalState((prev) => ({ ...prev, isOpen: false }));
        setIsStart(false);
      }, data.timer * 1000);

      return () => clearTimeout(timer);
    };

    socket.on("showModal", showModalHandler);

    return () => {
      socket.off("showModal");
    };
  }, [setTimer, setIsStart]);

  return { modalState };
};

export default useModal;
