import { useCountDown } from "@/hooks/useCountDown";
import useShowModalStore from "@/store/showModal.store";
import S from "@/style/modal/modal.module.css";

const VoteResultModal = () => {
  const { isOpen, timer, title, message, nickname } = useShowModalStore();
  const count = useCountDown(timer);

  if (count === 0) {
    return null;
  }

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

export default VoteResultModal;
