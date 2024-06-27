"use client";

import JoinMafiaRoom from "@/components/mafia/JoinMafiaRoom";
import Loading from "@/components/layout/Loading";
import { useIsExit } from "@/store/exit-store";

const RoomPage = () => {
  const isExit = useIsExit();

  return <>{isExit ? <Loading /> : <JoinMafiaRoom />}</>;
};

export default RoomPage;
