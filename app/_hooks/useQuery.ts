import { mafiaRoom } from '../_types';

export async function getToken({ room, name }: mafiaRoom): Promise<string> {
  //해당 room 이름 및 user name 전달
  const resp = await fetch(`/livekitAPI/get-participant-token?room=${room}&username=${name}`);
  const data = await resp.json();
  return data.token;
}
