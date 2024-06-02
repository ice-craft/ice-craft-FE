import { useCountDown } from "@/hooks/useCountDown";
import useSocketOn from "@/hooks/useSocketOn";
import { useModalIsOpen, useModalTimer } from "@/store/show-modal-store";
import S from "@/style/modal/modal.module.css";
import { VoteResults } from "@/types";
import { useState } from "react";

const VoteResultModal = () => {
  const timer = useModalTimer();
  // const count = useCountDown(timer, 10, 100);

  const [voteResults, setVoteResults] = useState<VoteResults>({});

  // if (!timer || !count) {
  //   return;
  // }

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>마피아 의심 투표 결과</h1>
            <ul>
              {Object.entries(voteResults).map(([nickname, voteCount]) => (
                <li key={nickname}>
                  <span>{nickname}</span> &rarr; {voteCount}
                </li>
              ))}
            </ul>
            {/* <progress className={S.progress} value={(timer * 10 - count) * (100 / (timer * 10))} max={100}></progress> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default VoteResultModal;
