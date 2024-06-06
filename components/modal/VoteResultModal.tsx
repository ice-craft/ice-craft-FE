import { useCountDown } from "@/hooks/useCountDown";
import {
  useModalActions,
  useModalIsOpen,
  useModalTimer,
  useVoteModalIsOpen,
  useVoteResultElement,
  useYesOrNoResultElement
} from "@/store/show-modal-store";
import S from "@/style/modal/modal.module.css";
import { useEffect, useState } from "react";

const VoteResultModal = () => {
  const timer = useModalTimer();
  const [count, setCount] = useState(timer * 10);
  const isModal = useModalIsOpen();
  const isVoteModal = useVoteModalIsOpen();
  const voteResults = useVoteResultElement();
  const yesOrNoResults = useYesOrNoResultElement(); //찬반 투표 결과값
  const { setIsOpen, setVoteIsOpen } = useModalActions();

  //NOTE - 타이머 기능
  useCountDown(() => setCount((prevCount) => prevCount - 1), 100, isVoteModal);

  // 모달창 종료
  useEffect(() => {
    if (count === 0 && isVoteModal) {
      setVoteIsOpen(false);
    }
  }, [count]);

  // console.log("찬/반투표 결과", yesOrNoResults);

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

            <progress className={S.progress} value={(timer * 10 - count) * (100 / (timer * 10))} max={100}></progress>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoteResultModal;
