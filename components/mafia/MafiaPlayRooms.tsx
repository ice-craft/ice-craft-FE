import useMediaSocket from "@/hooks/useMediaSocket";
import useSelectSocket from "@/hooks/useSelectSocket";
import useSocketOn from "@/hooks/useSocketOn";
import { useExitStore } from "@/store/exit-store";
import { useGameActions } from "@/store/game-store";
import S from "@/style/livekit/livekit.module.css";
import { allAudioSetting } from "@/utils/participantCamSettings/camSetting";
import { socket } from "@/utils/socket/socket";
import { DisconnectButton, RoomAudioRenderer, useLocalParticipant, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import LocalParticipant from "./LocalParticipant";
import MafiaModals from "./MafiaModals";
import MafiaToolTip from "./MafiaToolTip";
import RemoteParticipant from "./RemoteParticipant";

const MafiaPlayRooms = () => {
  const { localParticipant } = useLocalParticipant();
  const roomId = localParticipant.metadata;
  const userId = localParticipant.identity;

  const { setDiedPlayer } = useGameActions();
  const { setIsExit } = useExitStore();

  useMediaSocket(); // 카메라 및 오디오 처리
  useSelectSocket(); // 클릭 이벤트 처리

  //NOTE -  전체 데이터
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true }
    ],
    { onlySubscribed: false } // 구독 여부 상관없이 실행
  );

  //NOTE - 죽은 playerId 관리
  const sockets = {
    diedPlayer: (playerId: string) => {
      setDiedPlayer(playerId);
    }
  };
  // NOTE - socket On 담당
  useSocketOn(sockets);

  //NOTE - 방 나가기 이벤트 헨들러
  // supabase의 성능문제를 해결하기위해 로딩창을 띄어 텀을 주었다.
  const leaveRoom = () => {
    setIsExit(true);
    socket.emit("exitRoom", roomId, userId);
  };

  return (
    <section className={S.section}>
      <LocalParticipant tracks={tracks} />
      <RemoteParticipant tracks={tracks} />
      {/* 원격 참가자의 오디오 트랙을 처리 및 관리 */}
      <RoomAudioRenderer muted={false} />
      <div className={S.goToMainPage}>
        <button
          onClick={() => {
            allAudioSetting(tracks, false);
          }}
          style={{ background: "red" }}
        >
          전체 소리 끄기
        </button>
        <DisconnectButton onClick={leaveRoom}>나가기</DisconnectButton>
      </div>
      <MafiaToolTip />
      <MafiaModals />
    </section>
  );
};

export default MafiaPlayRooms;
