import { useCountDown } from "@/hooks/useCountDown";
import useModal from "@/hooks/useModal";
import S from "@/style/modal/modal.module.css";

const MafiaModal = () => {
  const initialSecond = 5;
  const count = useCountDown(initialSecond);
  const { modalState } = useModal();

  //NOTE - 모달이 열리지 않았을 때 아무것도 랜더링 하지 않아야 함
  if (!modalState.isOpen) return null;

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            {modalState.title && <h1>{modalState.title}</h1>}
            {modalState.message && <h2>{modalState.message}</h2>}
            {modalState.nickname && <h2>{modalState.nickname}</h2>}
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
