import { useDiedPlayer } from "@/store/game-store";
import { useGroupModalElement, useVoteResultElement } from "@/store/show-modal-store";
import S from "@/style/modal/modal.module.css";
import ModalProgress from "@/utils/ModalProgress";
import { socket } from "@/utils/socket/socket";
import { useLocalParticipant } from "@livekit/components-react";
import { useEffect, useState } from "react";

const CheckModal = () => {
  const title = useGroupModalElement();
  const voteResults = useVoteResultElement();
  const [isVote, setIsVote] = useState<boolean | null>(null);

  const diedPlayerId = useDiedPlayer();
  const { localParticipant } = useLocalParticipant();
  const localPlayerId = localParticipant.identity;

  // 가장 많은 투표 수를 받는 player
  const votePlayer = voteResults[0];

  //NOTE - 투표 대상자 or 참여자인 지 여부
  useEffect(() => {
    // 가장 많은 투표를 받은 player가 자신일 경우(투표 대상자)
    if (votePlayer.user_id === localPlayerId) {
      setIsVote(false);
      return;
    }
    // 가장 많은 투표를 받은 player가 자신이 아닌 경우(투표 참여자)
    if (votePlayer.user_id !== localPlayerId) {
      setIsVote(true);
    }
  }, [votePlayer]);

  //NOTE - 죽은 playerId
  const isDiedPlayer = diedPlayerId.find((playerId) => localPlayerId === playerId);

  //NOTE - 최후의 투표 클릭 이벤트
  const chooseVoteHandler = (vote: boolean) => {
    setIsVote(false);
    socket.emit("voteYesOrNo", vote);
  };

  //NOTE - 초기 렌더링 필터
  if (isVote === null) {
    return;
  }

  return (
    <>
      <div className={S.modalWrap}>
        <div className={S.modal}>
          <div>
            <h1>{title}</h1>
            {isVote && !isDiedPlayer ? (
              <>
                <div className={S.userCheckNickName}>
                  <p>
                    <strong>{votePlayer.user_nickname}</strong> 님을
                    <br /> 최종적으로 지목하시겠습니까?
                  </p>
                </div>
                <div className={S.checkButton}>
                  <button disabled={!isVote} onClick={() => chooseVoteHandler(true)}>
                    찬성
                  </button>
                  <button disabled={!isVote} onClick={() => chooseVoteHandler(false)}>
                    반대
                  </button>
                </div>
              </>
            ) : (
              <h2>투표 중입니다.</h2>
            )}
            <ModalProgress />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckModal;
