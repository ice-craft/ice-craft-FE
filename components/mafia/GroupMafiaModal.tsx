import { useCountDown } from "@/hooks/useCountDown";
import useModal from "@/hooks/useModal";
import useShowModalStore from "@/store/showModal.store";
import S from "@/style/modal/modal.module.css";

const GroupMafiaModal = () => {
  const { isOpen, timer, title, message, nickname } = useShowModalStore();
  const count = useCountDown(timer);
  const { modalState } = useModal();

  if (count === 0) {
    return null;
  }

  console.log((timer * 10 - count) * (100 / (timer * 10)));

  // //NOTE - 모달이 열리지 않았을 때 아무것도 랜더링 하지 않아야 함
  if (!isOpen) return null;

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            {title && <h1>{title}</h1>}
            {message && <h2>{message}</h2>}
            {nickname && <h2>{nickname}</h2>}
            <progress className={S.progress} value={(timer * 10 - count) * (100 / (timer * 10))} max={100}></progress>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupMafiaModal;
