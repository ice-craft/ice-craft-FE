import { cache } from "react";
import { MafiaRoom } from "../_types";

export async function getToken({ room, name }: MafiaRoom) {
  //해당 room 이름 및 user name 전달
  const response = await fetch(`/livekitAPI/get-participant-token?room=${room}&username=${name}`, {
    cache: "no-cache"
  });
  const token: string = await response.json();
  return token;
}
