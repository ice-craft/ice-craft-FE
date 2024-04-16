import { MafiaRoom } from "../types";

export async function getToken({ room, userInfo }: MafiaRoom) {
  const response = await fetch(
    `/livekit/get-participant-token?room=${room}&userId=${userInfo!.id}&userNickname=${
      userInfo!.user_metadata.userNickname
    }`,
    {
      cache: "no-store"
    }
  );

  const { token }: { token: string } = await response.json();

  return token;
}
