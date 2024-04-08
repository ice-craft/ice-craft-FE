import { useCountDown } from "@/hooks/useCountDown";
import S from "@/style/modal/modal.module.css";

//FIXME - 추후 Zustand로 관리
const MafiaModal = () => {
  // const count = 1;
  // const content = "밤이 시작되었습니다.";
  // const nickname = "";

  const testTime = 5;
  const count = useCountDown(testTime);

  const agreeClickHandler = () => {};

  const oppositionClickHandler = () => {};

  // if (timer == 100) {
  // }

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>첫번째 턴</h1>
            {/* <h2>{content}</h2>
            <p>{timer}</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MafiaModal;
