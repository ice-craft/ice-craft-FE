"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const MainPage = () => {
  // TODO: get user input for room and name
  const [room, setRoom] = useState<string>("");
  const [name, setName] = useState<string>("");

  const router = useRouter();

  const SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/room/${room}?room=${room}&name=${name}`);
  };

  return (
    <form onSubmit={SubmitHandler} className="flex flex-col justify-center item-center min-h-screen">
      <input type="text" placeholder="Room" value={room} className="mb-4" onChange={(e) => setRoom(e.target.value)} />
      <input type="text" placeholder="Name" value={name} className="mb-4" onChange={(e) => setName(e.target.value)} />
      <button type="submit">방 생성</button>
    </form>
  );
};
