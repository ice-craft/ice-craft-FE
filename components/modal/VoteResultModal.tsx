import { useCountDown } from "@/hooks/useCountDown";
import useSocketOff from "@/hooks/useSocketOff";
import useSocketOn from "@/hooks/useSocketOn";
import useShowModalStore from "@/store/showModal.store";
import S from "@/style/modal/modal.module.css";
import { VoteResults } from "@/types";
import { useState } from "react";

const VoteResultModal = () => {
  const { isOpen, timer } = useShowModalStore();
  const count = useCountDown(timer);
  const [voteResults, setVoteResults] = useState<VoteResults>({});

  if (count === 0) {
    return null;
  }

  const socketArr = [
    {
      eventName: "showVoteResult",
      handler: (data: VoteResults) => {
        console.log("showVoteResult Event Message", data);
        setVoteResults(data);
      }
    }
  ];

  useSocketOn(socketArr);
  useSocketOff(socketArr);

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
            <progress className={S.progress} value={(timer * 10 - count) * (100 / (timer * 10))} max={100}></progress>
          </div>
        </div>
      </div>
    </>
  );
};

export default VoteResultModal;
