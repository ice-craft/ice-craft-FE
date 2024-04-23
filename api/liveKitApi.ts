import { getUserInfo } from "@/utils/supabase/authAPI";
import { User } from "@supabase/supabase-js";

export async function getToken(room: string, userId: string, nickname: string) {
  const userInfo = await getUserInfo();

  // const response = await fetch(
  //   `/livekit/get-participant-token?room=${room}&userId=${userInfo!.id}&userNickname=${
  //     userInfo!.user_metadata.nickname
  //   }`,
  //   {
  //     cache: "no-store"
  //   }
  // );

  const response = await fetch(
    `/livekit/get-participant-token?room=${room}&userId=${userId}&userNickname=${nickname}`,
    {
      cache: "no-store"
    }
  );

  const { token }: { token: string } = await response.json();

  return token;
}
