import { getUserInfo } from "@/utils/supabase/authAPI";

export async function getToken(room: string) {
  const userInfo = await getUserInfo();

  const response = await fetch(
    `/livekit/get-participant-token?room=${room}&userId=${userInfo!.id}&userNickname=${
      userInfo!.user_metadata.nickname
    }`,
    {
      cache: "no-store"
    }
  );

  const { token }: { token: string } = await response.json();

  return token;
}
