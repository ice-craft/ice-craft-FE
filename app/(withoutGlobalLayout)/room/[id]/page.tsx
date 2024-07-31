"use client";

import JoinMafiaRoom from "@/components/mafia/JoinMafiaRoom";
import Loading from "@/components/layout/Loading";
import { useIsEntry } from "@/store/room-store";

const RoomPage = () => {
  const isEntry = useIsEntry();

  return <>{isEntry ? <JoinMafiaRoom /> : <Loading />}</>;
};

export default RoomPage;
