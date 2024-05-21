import { useCountDown } from "@/hooks/useCountDown";
import useShowModalStore from "@/store/showModal.store";
import S from "@/style/modal/modal.module.css";
import { useState } from "react";

interface VoteResults {
  [nickname: string]: number;
}

const VoteResultModal = () => {
  const { isOpen, timer } = useShowModalStore();
  const count = useCountDown(timer);
  const [voteResults, setVoteResults] = useState<VoteResults>({});

  if (count === 0) {
    return null;
  }

  if (!isOpen) return null;

  //NOTE - 서버로부터 데이터 수신하는 내용 가정 (useEffect 생략)
  socket.on("showVoteResult", (data: VoteResults) => {
    setVoteResults(data);
  });

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            {<h1>마피아 의심 투표 결과</h1>}
            <ul>
              {Object.entries(voteResults).map(([nickname, voteCount]) => (
                <li key={nickname}>
                  <span>{nickname}</span> &rarr; {voteCount}
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
