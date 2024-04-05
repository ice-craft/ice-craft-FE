import { MafiaRoom } from "../_types";

export async function getToken({ room, name }: MafiaRoom) {
  const response = await fetch(`/livekit/get-participant-token?room=${room}&username=${name}`, {
    cache: "no-cache"
  });

  const { token }: { token: string } = await response.json();

  return token;
}
