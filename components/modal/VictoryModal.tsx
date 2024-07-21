import { useEffect, useState } from "react";
import { useCountDown } from "@/hooks/useCountDown";
import {
  useGroupModalElement,
  useModalActions,
  useModalIsOpen,
  useModalTimer,
  useRoleModalElement
} from "@/store/show-modal-store";
import S from "@/style/modal/modal.module.css";
import JSConfetti from "js-confetti";
import { useParticipants } from "@livekit/components-react";
import getPlayerJob from "@/utils/mafiaSocket/getPlayerJob";

const VictoryModal = () => {
  const title = useGroupModalElement();
  const role = useRoleModalElement();
  const participant = useParticipants();
  const [victoryPlayerNickname, setVictoryPlayerNickname] = useState<string[]>([""]);

  const timer = useModalTimer();
  const isModal = useModalIsOpen();
  const { setIsOpen } = useModalActions();
  const [count, setCount] = useState(timer);
  // 타이머 및 폭죽 효과
  useCountDown(() => setCount((prevCount) => prevCount - 1), 1000, isModal);

  const jsConfetti = new JSConfetti();

  jsConfetti.addConfetti({
    confettiColors: ["#5C5BAD", "#FFFFFF", "#EB7FEC", "#E72424"],
    confettiRadius: 5,
    confettiNumber: 300
  });

  //NOTE - 모달창 종료
  useEffect(() => {
    if (count <= 0 && isModal) {
      setIsOpen(false);
    }
  }, [count]);

  //NOTE - 승리한 팀의 players nickname
  useEffect(() => {
    console.log("role", role);
    console.log("participants", participant);

    // 전체 player 정보의 배열
    participant.forEach((playerInfo) => {
      //Player의 직업 찾기
      const playerJob = getPlayerJob(role, playerInfo.identity);
      const playerNickname = playerInfo.name;

      // playerInfo.name이 undefined가 아닌지 확인
      if (!playerNickname) {
        return null;
      }

      //시민 승리이면서, 직업: 시민, 의사, 경찰인 경우
      if (title === "citizen" && (playerJob === "citizen" || playerJob === "police" || playerJob === "doctor")) {
        setVictoryPlayerNickname((prevPlayers) => [...prevPlayers, playerNickname]);
        return;
      }

      //마피아 승리이면서, 직업: 마피아인 경우
      if (title === "mafia" && playerJob === "mafia") {
        setVictoryPlayerNickname((prevPlayers) => [...prevPlayers, playerNickname]);
      }
    });
  }, []);

  return (
    <>
      <div className={S.modalWrap}>
        <div className={`${S.modal} ${S.victoryModal}`}>
          <div>
            <p>{title} 승리!</p>
            {victoryPlayerNickname.map((player, index) => (
              <p key={index}>{player}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VictoryModal;
