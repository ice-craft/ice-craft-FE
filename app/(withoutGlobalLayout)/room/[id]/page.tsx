"use client";

import JoinMafiaRoom from "@/components/mafia/JoinMafiaRoom";
import Loading from "@/components/mafia/Loading";
import { useExitStore } from "@/store/exit-store";

const RoomPage = () => {
  const { isExit } = useExitStore();

  return <>{isExit ? <Loading /> : <JoinMafiaRoom />}</>;
};

export default RoomPage;
