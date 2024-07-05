import useSocketOn from "@/hooks/useSocketOn";
import {
  useCurrentModal,
  useGroupModalElement,
  useModalActions,
  useModalIsOpen,
  useRoleModalElement
} from "@/store/show-modal-store";
import { Role, VoteResult, YesOrNoResults } from "@/types";
import CheckModal from "../modal/CheckModal";
import GroupMafiaModal from "../modal/GroupMafiaModal";
import LastVoteResultModal from "../modal/LastVoteResultModal";
import UserRoleModal from "../modal/UserRoleModal";
import VictoryModal from "../modal/VictoryModal";
import VoteResultModal from "../modal/VoteResultModal";
import { useParticipants } from "@livekit/components-react";
import { useEffect, useState } from "react";
import getPlayerJob from "@/utils/mafiaSocket/getPlayerJob";

const MafiaModals = () => {
  const isOpen = useModalIsOpen();
  const role = useRoleModalElement();
  const title = useGroupModalElement();
  const participant = useParticipants();
  const currentModal = useCurrentModal();
  const [victoryPlayerNickname, setVictoryPlayerNickname] = useState<string[]>([""]);

  const { setYesOrNoVoteResult, setCurrentModal, setIsOpen, setTimer, setTitle, setRole, setVoteResult } =
    useModalActions();

  const sockets = {
    showModal: (title: string, timer: number) => {
      if (isOpen) {
        setIsOpen(false);
      }

      //NOTE -  CheckModal(찬성/반대) 투표 모달창 요소
      if (title.includes("찬성/반대 투표")) {
        setCurrentModal("CheckModal");
        setIsOpen(true);
        setTitle(title);
        setTimer(timer);
        return;
      }

      // console.log("isModal", isOpen);
      //NOTE - GroupModal 모달창 요소
      setCurrentModal("GroupMafiaModal");
      setIsOpen(true);
      setTitle(title);
      setTimer(timer);
    },

    //NOTE - UserRoleModal 모달창 요소
    showAllPlayerRole: (role: Role, timer: number) => {
      setCurrentModal("UserRoleModal");
      setIsOpen(true);
      setRole(role);
      setTimer(timer);
    },
    //NOTE - 투표 결과 모달창 요소
    showVoteResult: (voteResult: VoteResult[], timer: number) => {
      setCurrentModal("VoteResultModal");
      setIsOpen(true);
      setVoteResult(voteResult);
      setTimer(timer);
    },
    //NOTE - 찬성/반대 투표 결과 모달창 요소
    showVoteDeadOrLive: (voteResult: YesOrNoResults, timer: number) => {
      setCurrentModal("LastVoteResultModal");
      setIsOpen(true);
      setYesOrNoVoteResult(voteResult);
      setTimer(timer);
    },
    //NOTE - 승리한 팀 모달창 요소
    victoryPlayer: (victoryTeam: string, timer: number) => {
      if (isOpen) {
        setIsOpen(false);
      }

      //승리 모달창 요소
      setCurrentModal("VictoryModal");
      setIsOpen(true);
      setTitle(victoryTeam);
      setTimer(timer);
    }
  };

  //NOTE - socket On, Off 담당
  useSocketOn(sockets);

  //NOTE - 승리한 팀의 players nickname
  useEffect(() => {
    if (currentModal === "VictoryModal") {
      participant.forEach((playerInfo) => {
        const playerJob = getPlayerJob(role, playerInfo.identity);

        //시민, 의사, 경찰 승리일 경우
        if (title === "citizen" && (playerJob === "citizen" || playerJob === "police" || playerJob === "doctor")) {
          // playerInfo.name이 undefined가 아닌지 확인
          setVictoryPlayerNickname((prevPlayers) => [...prevPlayers, playerInfo.name!]);
          return;
        }

        //마피아일 경우
        if (title === "mafia" && playerJob === "mafia") {
          // playerInfo.name이 undefined가 아닌지 확인
          setVictoryPlayerNickname((prevPlayers) => [...prevPlayers, playerInfo.name!]);
        }
      });
    }
  }, [currentModal]);

  if (!isOpen) return null;

  //NOTE - 모달창 리스트
  /*
    GroupMafiaModal - 마피아 공용 모달창
    UserRoleModal - 직업 카드 모달창
    CheckModal - 찬반 투표 모달창 (yes or no)
    VoteResultModal - 찬반 투표 결과 모달창
    LastVoteResultModal - 최종 투표 결과 모달창
    VictoryModal - 승리 결과 모달창
  */

  switch (currentModal) {
    case "GroupMafiaModal":
      return <GroupMafiaModal />;
    case "UserRoleModal":
      return <UserRoleModal />;
    case "CheckModal":
      return <CheckModal />;
    case "VoteResultModal":
      return <VoteResultModal />;
    case "LastVoteResultModal":
      return <LastVoteResultModal />;
    case "VictoryModal":
      return <VictoryModal victoryPlayerNickname={victoryPlayerNickname} />;
    default:
      return null;
  }
};

export default MafiaModals;
