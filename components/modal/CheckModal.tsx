import { useDiedPlayer } from "@/store/game-store";
import { useGroupModalElement, useVoteResultElement } from "@/store/show-modal-store";
import S from "@/style/modal/modal.module.css";
import ModalProgress from "@/utils/ModalProgress";
import { socket } from "@/utils/socket/socket";
import { useLocalParticipant } from "@livekit/components-react";
import { useState } from "react";

const CheckModal = () => {
  const title = useGroupModalElement();
  const voteResults = useVoteResultElement();
  const [isVote, setIsVote] = useState(false);

  const diedPlayerId = useDiedPlayer();
  const { localParticipant } = useLocalParticipant();
  const localPlayerId = localParticipant.identity;

  //NOTE - 죽은 playerId
  const isDiedPlayer = diedPlayerId.find((playerId) => localPlayerId === playerId);

  //NOTE - 가장 많은 투표 수를 받는 player
  const votePlayer = voteResults[0];

  //NOTE - 최후의 투표 클릭 이벤트
  const chooseVoteHandler = (vote: boolean) => {
    setIsVote(true);
    socket.emit("voteYesOrNo", vote);
  };

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>{title}</h1>
            {!isVote && !isDiedPlayer ? (
              <>
                <div className={S.userCheckNickName}>
                  <p>
                    <strong>{votePlayer.user_nickname}</strong> 님을
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
