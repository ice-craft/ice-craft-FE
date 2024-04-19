import { useCountDown } from "@/hooks/useCountDown";
import S from "@/style/modal/modal.module.css";
import { socket } from "@/utils/socket/socket";
import { useEffect, useState } from "react";

const MafiaModal = () => {
  const initialSecond = 5;
  const count = useCountDown(initialSecond);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [secondTimer, setSecondTimer] = useState("");
  const [userNickName, setUserNickName] = useState("");

  useEffect(() => {
    socket.on("showModal", (title, message, timer, nickname) => {
      setModalTitle(title);
      setModalMessage(message);
      setSecondTimer(timer);
      setUserNickName(nickname);
    });
    return () => {
      socket.off("showModal");
    };
  }, []);

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>{modalTitle}</h1>
            <h2>{modalMessage}</h2>
            <h3>{secondTimer}</h3>
            <h4>{userNickName}</h4>
            <progress
              className={S.progress}
              value={(initialSecond * 10 - count) * (100 / (initialSecond * 10))}
              max={100}
            ></progress>
          </div>
        </div>
      </div>
    </>
  );
};

export default MafiaModal;
