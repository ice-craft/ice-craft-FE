import { useGroupModalElement, useRoleModalElement } from "@/store/show-modal-store";
import S from "@/style/modal/modal.module.css";
import getPlayerJob from "@/utils/mafiaSocket/getPlayerJob";
import ModalConfetti from "@/utils/ModalConfetti";
import { useParticipants } from "@livekit/components-react";
import { useEffect, useState } from "react";

const VictoryModal = () => {
  const title = useGroupModalElement();
  const role = useRoleModalElement();
  const participants = useParticipants();

  const [victoryPlayerNickname, setVictoryPlayerNickname] = useState<string[]>([""]);

  //NOTE - 승리한 팀의 players nickname
  useEffect(() => {
    console.log("role", role);
    console.log("participants", participants);

    // 전체 player 정보의 배열
    participants.forEach((playerInfo) => {
      //Player의 직업 찾기
      const playerJob = getPlayerJob(role, playerInfo.identity);
      const playerNickname = playerInfo.name;

      console.log("🚀 ~ participant.forEach ~ playerJob:", playerJob, playerInfo.name);

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
  }, [participants]);

  return (
    <>
      <div className={S.modalWrap}>
        <div className={`${S.modal} ${S.victoryModal}`}>
          <div>
            <ModalConfetti title={title} />
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
