import { useYesOrNoResultElement } from "@/store/show-modal-store";
import S from "@/style/modal/modal.module.css";
import ModalProgress from "@/utils/ModalProgress";

const LastVoteResultModal = () => {
  const yesOrNoResults = useYesOrNoResultElement();

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>최종 투표 결과</h1>
            <div>
              찬성: <span>{yesOrNoResults.detail.yesCount}</span> 반대: {yesOrNoResults.detail.noCount}
            </div>
            <ModalProgress />
          </div>
        </div>
      </div>
    </>
  );
};

export default LastVoteResultModal;
