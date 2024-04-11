import { useCountDown } from "@/hooks/useCountDown";
import S from "@/style/modal/modal.module.css";

const MafiaModal = () => {
  const initialTime = 5;
  const count = useCountDown(initialTime);

  const agreeClickHandler = () => {};

  const oppositionClickHandler = () => {};

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>첫번째 턴</h1>
            <h2>{count}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default MafiaModal;
