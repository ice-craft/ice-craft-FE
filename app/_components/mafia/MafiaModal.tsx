import { useCountDown } from "@/app/_hooks/useCountDown";
import S from "@/app/_style/modal/modal.module.css";

//FIXME - 추후 Zustand로 관리
const MafiaModal = () => {
  const count = 1;
  const content = "밤이 시작되었습니다.";
  const nickname = "";

  const testTime = 5;
  const timer = useCountDown(testTime);

  const agreeClickHandler = () => {};

  const oppositionClickHandler = () => {};
  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>첫번째 턴</h1>
            <h2>{content}</h2>
            <p>{count}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MafiaModal;
