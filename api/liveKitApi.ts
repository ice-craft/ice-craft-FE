export async function getToken(room: string | string[], userId: string, nickname: string) {
  const response = await fetch(
    `/livekit/get-participant-token?room=${room}&userId=${userId}&userNickname=${nickname}`,
    {
      cache: "no-store"
    }
  );

  const { token, error }: { token: string; error: string } = await response.json();

  if (token) {
    return token;
  }

  if (error) {
    throw new Error(error);
  }
}
