import { Role } from "@/types";

const getPlayerJob = (role: Role, playerId: string) => {
  //NOTE - role 구조: {jobName: string, userList: []}
  const jobNameList = Object.keys(role);

  //NOTE - 해당 player의 직업
  const PlayerJob = jobNameList.find((job) => {
    //NOTE - 직업별 해당 userId[]
    const jobPlayerList = role[job];

    // NOTE - 직업이 존재하지 않을 경우(경찰, 의사)
    if (!jobPlayerList) return null;

    const isPlayerJob = jobPlayerList.find((jobId: string) => playerId === jobId);

    if (isPlayerJob) return job;
  });

  return PlayerJob;
};

export default getPlayerJob;
