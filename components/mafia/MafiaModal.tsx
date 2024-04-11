import { useCountDown } from "@/hooks/useCountDown";
import S from "@/style/modal/modal.module.css";

const MafiaModal = () => {
  const initialTime = 5;
  const count = useCountDown(initialTime);

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>첫번째 턴</h1>
            <progress
              className={S.progress}
              value={(initialTime * 10 - count) * (100 / (initialTime * 10))}
              max={100}
            ></progress>
          </div>
        </div>
      </div>
    </>
  );
};

export default MafiaModal;
