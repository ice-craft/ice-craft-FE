import CamCheck from "@/assets/images/cam_check.svg";
import PlayerDieImage from "@/assets/images/player_die.svg";
import useClickHandler from "@/hooks/useClickHandler";
import usePlayerNumber from "@/hooks/usePlayerNumber";
import { useDiedPlayer, useGameState } from "@/store/game-store";
import { useActivePlayer, useIsLocalOverlay, useReadyPlayers } from "@/store/overlay-store";
import S from "@/style/livekit/livekit.module.css";
import {
  ParticipantTile,
  TrackLoop,
  TrackReferenceOrPlaceholder,
  useLocalParticipant
} from "@livekit/components-react";
import Image from "next/image";
import GameStartButton from "./GameStartButton";
import SpeakTimer from "./SpeakTimer";

const LocalParticipant = ({ tracks }: { tracks: TrackReferenceOrPlaceholder[] }) => {
  const activePlayerId = useActivePlayer();
  const isLocalOverlay = useIsLocalOverlay();
  const { localParticipant } = useLocalParticipant();
  const isGameState = useGameState();
  const playerNumber = usePlayerNumber(localParticipant.identity, isGameState);
  const localReadyState = useReadyPlayers();
  const { clickHandler } = useClickHandler();

  const diedPlayers = useDiedPlayer();
  const isDied = diedPlayers.find((diedPlayer) => diedPlayer === localParticipant.identity);
  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid);

  return (
    <div className={S.localParticipant}>
      <SpeakTimer />
      {isGameState === "gameStart" && <p className={"text-red-600"}>{playerNumber}</p>}
      <TrackLoop tracks={localTracks}>
        <div
          className={`${S.participantOverlay} ${activePlayerId === localParticipant.identity ? S.active : ""}`}
          onClick={isLocalOverlay ? (e) => clickHandler(e, localParticipant.identity) : undefined}
        >
          <ParticipantTile disableSpeakingIndicator={true} className={isLocalOverlay ? S.localCam : undefined} />

          {!isDied ? (
            <div className={`${S.imageOverlay} ${localReadyState[localParticipant.identity] ? S.active : ""}`}>
              <Image src={CamCheck} alt={localParticipant.identity} />
            </div>
          ) : (
            <div className={S.playerDieOverlay}>
              <Image src={PlayerDieImage} alt={localParticipant.identity} />
            </div>
          )}
        </div>
      </TrackLoop>
      {isGameState === "gameReady" && <GameStartButton />}
    </div>
  );
};

export default LocalParticipant;
