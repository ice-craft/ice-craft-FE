import { useVoteResultElement } from "@/store/show-modal-store";
import S from "@/style/modal/modal.module.css";
import ModalProgress from "@/utils/ModalProgress";

const VoteResultModal = () => {
  const voteResults = useVoteResultElement();

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>마피아 의심 투표 결과</h1>
            <ul>
              {voteResults.map((vote) => (
                <li key={vote.user_id}>
                  <span>{vote.user_nickname}</span> &rarr; {vote.voted_count}
                </li>
              ))}
            </ul>
            <ModalProgress />
          </div>
        </div>
      </div>
    </>
  );
};

export default VoteResultModal;
