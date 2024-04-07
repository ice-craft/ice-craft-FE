import { useCountDown } from "@/app/_hooks/useCountDown";
import S from "@/app/_style/modal/modal.module.css";

const MafiaModal = ({ context }: { context: string }) => {
  const testTime = 5;
  const count = useCountDown(testTime);

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>첫번째 턴</h1>
            <h2>{context}</h2>
            <p>{count}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MafiaModal;
