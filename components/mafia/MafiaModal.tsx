import { useCountDown } from "@/hooks/useCountDown";
import S from "@/style/modal/modal.module.css";
import { socket } from "@/utils/socket/socket";
import { useEffect, useState } from "react";

const MafiaModal = () => {
  const initialSecond = 5;
  const count = useCountDown(initialSecond);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    socket.on("showModal", (title, message) => {
      setModalTitle(title);
      setModalMessage(message);
      setIsDay(message.includes("아침"));
    });
    return () => {
      socket.off("showModal");
    };
  }, []);

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          {/* NOTE - 아침, 밤에 따라 모달창 css 변경할 예정이라 조건부 랜더링 미리 설정 */}
          {isDay ? (
            <div>
              <h1>{modalTitle}</h1>
              <h2>{modalMessage}</h2>
              <progress
                className={S.progress}
                value={(initialSecond * 10 - count) * (100 / (initialSecond * 10))}
                max={100}
              ></progress>
            </div>
          ) : (
            <div>
              <h1>{modalTitle}</h1>
              <h2>{modalMessage}</h2>
              <progress
                className={S.progress}
                value={(initialSecond * 10 - count) * (100 / (initialSecond * 10))}
                max={100}
              ></progress>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MafiaModal;
