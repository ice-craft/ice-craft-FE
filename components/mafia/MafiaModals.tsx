import React, { useState } from "react";
import GroupMafiaModal from "../modal/GroupMafiaModal";
import UserRoleModal from "../modal/UserRoleModal";
import CheckModal from "../modal/CheckModal";
import VoteResultModal from "../modal/VoteResultModal";
import LastVoteResultModal from "../modal/LastVoteResultModal";
import VictoryModal from "../modal/VictoryModal";
import { useCurrentModal, useModalIsOpen } from "@/store/show-modal-store";
import useModalSocket from "@/hooks/useModalSocket";

const MafiaModals = () => {
  useModalSocket();
  const isOpen = useModalIsOpen();
  const currentModal = useCurrentModal();

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
      return <VictoryModal />;
    default:
      return null;
  }
};

export default MafiaModals;
