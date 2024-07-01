import { LocalParticipant, RemoteParticipant } from "livekit-client";

const getPlayerNumber = (participants: (LocalParticipant | RemoteParticipant)[]) => {
  // NOTE - 입장 순서로 정렬
  const gamePlayerName = participants.sort((a, b) => {
    if (!a.joinedAt || !b.joinedAt) {
      return 1; // 존재 하지 않을 시 뒤로 이동
    }
    return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
  });

  // NOTE - gamePlayers: {playerName, playerJoinAt, playerNumber}
  const gamePlayers = gamePlayerName.map((player, index) => ({
    playerId: player.identity,
    playerName: player.name,
    playerJoinAt: player.joinedAt,
    number: index + 1
  }));

  return gamePlayers;
};

export default getPlayerNumber;
