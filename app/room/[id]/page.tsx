"use client";

import { AllMikeOff, allCamOff, allCamOn, lastSpeak } from "@/app/_utils/participantCamSettings/camSetting";
import MafiaModal from "@/app/_components/mafia/MafiaModal";
import MyVideoConference from "@/app/_components/mafia/MyVideoConference";
import { useModalStore } from "@/app/_store/modal-store";
import { useParticipantTracks, useRemoteParticipant, useTracks } from "@livekit/components-react";
import "@livekit/components-styles";
import { useRouter } from "next/navigation";

const RoomPage = () => {
  const routers = useRouter();
  const tracks = useTracks();
  const { isModal, setIsModal } = useModalStore();
  const RemoteParticipant = useRemoteParticipant("identity"); //현재 방의 특정 원격 참가자

  const sources = tracks.map((item) => {
    return item.source;
  });

  const ParticipantTrack = useParticipantTracks(sources, "identity");

  //토큰을 별도로 저장하고 있지 않기에 임시로 route 변경
  const deleteToken = () => {
    routers.replace(`/room`);
  };

  return (
    <>
      <div>
        <button
          onClick={() => {
            setIsModal(true);
          }}
        >
          타이머 버튼 클릭
        </button>
      </div>
      <div>
        <button onClick={() => AllMikeOff(tracks)}> 투표 시간 </button>
      </div>
      <div>
        <button onClick={() => lastSpeak(tracks, RemoteParticipant, ParticipantTrack)}>최후의 반론 시간 </button>
      </div>
      <div>
        <button onClick={() => allCamOn(tracks)}>전체 캠 및 오디오 on </button>
      </div>
      <div>
        <button onClick={() => allCamOff(tracks)}>전체 캠 및 오디오 off </button>
      </div>

      <MyVideoConference />
      {isModal ? <MafiaModal /> : null}
    </>
  );
};

export default RoomPage;
