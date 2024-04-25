import { useCountDown } from "@/hooks/useCountDown";
import useModal from "@/hooks/useModal";
import useShowModalStore from "@/store/showModal.store";
import S from "@/style/modal/modal.module.css";

const GroupMafiaModal = () => {
  const { setIsClose, isOpen, timer, title, message } = useShowModalStore();
  const count = useCountDown(timer);
  const { modalState } = useModal();

  // 초기값인 0으로 인해 progress bar 게이지가 100% 상태가 유지되는 현상이 발생하므로
  // timer에 값이 들어가기 전 0값에 대한 처리문
  // useCountDown에서 초기값 0에 대한 처리문을 진행하면 더 깔끔하다.
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
            {modalState.message && <h2>{modalState.message}</h2>}
            {modalState.nickname && <h2>{modalState.nickname}</h2>}
            <progress className={S.progress} value={(timer * 10 - count) * (100 / (timer * 10))} max={100}></progress>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupMafiaModal;
