import { useCountDown } from "@/hooks/useCountDown";
import {
  useCheckModalIsOpen,
  useGroupModalElement,
  useModalActions,
  useModalTimer,
  useVoteResultElement
} from "@/store/show-modal-store";
import S from "@/style/modal/modal.module.css";
import { socket } from "@/utils/socket/socket";
import { useEffect, useRef, useState } from "react";
import ModalProgress from "./ModalProgress";

const CheckModal = () => {
  const title = useGroupModalElement();
  const voteResults = useVoteResultElement();
  const [isVote, setIsVote] = useState(false);

  //NOTE - 가장 많은 투표 수를 받는 player
  const diePlayer = voteResults[0];

  //NOTE - 최후의 투표 클릭 이벤트
  const chooseVoteHandler = (vote: boolean) => {
    setIsVote(true);
    socket.emit("VoteYesOrNo", vote);
  };

  console.log("checkModal실행");

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>찬반 투표</h1>
            {!isVote ? (
              <>
                <div className={S.userCheckNickName}>
                  <p>
                    <strong>{diePlayer.user_nickname}</strong> 님을
                    <br /> 최종적으로 지목하시겠습니까?
                  </p>
                </div>
                <div className={S.checkButton}>
                  <button disabled={isVote} onClick={() => chooseVoteHandler(true)}>
                    찬성
                  </button>
                  <button disabled={isVote} onClick={() => chooseVoteHandler(false)}>
                    반대
                  </button>
                </div>
              </>
            ) : (
              "투표 중입니다."
            )}
            <ModalProgress />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckModal;
