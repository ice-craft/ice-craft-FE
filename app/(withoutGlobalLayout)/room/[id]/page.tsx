"use client";

import JoinMafiaRoom from "@/components/mafia/JoinMafiaRoom";
import Loading from "@/components/layout/Loading";
import { useExitStore } from "@/store/exit-store";
import { useEffect } from "react";

const RoomPage = () => {
  const { isExit, setIsExit } = useExitStore();

  useEffect(() => {
    setIsExit(false);
  }, []);

  return <>{isExit ? <Loading /> : <JoinMafiaRoom />}</>;
};

export default RoomPage;
