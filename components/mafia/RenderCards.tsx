import React from "react";
import Image from "next/image";
import { RenderCardsProps } from "@/types/index";
import { useLocalParticipant } from "@livekit/components-react";

const RenderCards = ({ cards, role, showAllCards }: RenderCardsProps) => {
  const { localParticipant } = useLocalParticipant();

  //NOTE - role 구조: {jobName: string, userList: []}
  const jobNameList = Object.keys(role);

  //NOTE - 해당 player의 직업
  const playerJob = jobNameList.find((job) => {
    //NOTE - 직업별 해당 userId[]
    const jobPlayerList = role[job];

    //NOTE - 직업이 존재하지 않을 경우
    if (!jobPlayerList) {
      return;
    }

    const isPlayerJob = jobPlayerList.find((userId: string) => localParticipant.identity === userId);

    if (isPlayerJob) {
      return job;
    }
  });

  return (
    <>
      {Object.entries(cards).map(([key, { src, alt }]) =>
        showAllCards || key === playerJob ? (
          <li key={key}>
            <Image width={100} height={100} src={src} alt={alt} />
          </li>
        ) : null
      )}
    </>
  );
};

export default RenderCards;
