import { MafiaRoom } from "../types";

export async function getToken({ room, userId }: MafiaRoom) {
  const response = await fetch(`/livekit/get-participant-token?room=${room}&userId=${userId}`, {
    cache: "no-store"
  });

  const { token }: { token: string } = await response.json();

  return token;
}
