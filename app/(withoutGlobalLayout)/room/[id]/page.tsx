"use client";

import MafiaModal from "@/components/mafia/MafiaModal";
import MyVideoConference from "@/components/mafia/MyVideoConference";
import { useModalStore } from "@/store/toggle-store";
import { allMediaOff, allMikeOff, allMediaOn, oneUserMediaOn } from "@/utils/participantCamSettings/camSetting";
import { useParticipantTracks, useTracks } from "@livekit/components-react";
import "@livekit/components-styles";
import { useRouter } from "next/navigation";

const RoomPage = () => {
  const routers = useRouter();
  const tracks = useTracks();
  const { isModal, setIsModal } = useModalStore();

  const sources = tracks.map((item) => {
    return item.source;
  });

  const ParticipantTrack = useParticipantTracks(sources, "identity");

  //토큰을 별도로 저장하고 있지 않기에 임시로 route 변경
  const deleteToken = () => {
    routers.replace(`/room`);
  };
  const test = () => {
    // const te = allMediaOff(tracks);
    console.log("adfsdf", allMediaOff(tracks));
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
        <button onClick={() => allMikeOff(tracks)}> 투표 시간 </button>
      </div>
      <div>
        <button onClick={() => oneUserMediaOn(ParticipantTrack)}>최후의 반론 시간 </button>
      </div>
      <div>
        <button onClick={() => allMediaOn(tracks)}>전체 캠 및 오디오 on </button>
      </div>
      <div>
        <button onClick={test}>전체 캠 및 오디오 off </button>
      </div>

      <MyVideoConference />
      {isModal ? <MafiaModal /> : null}
    </>
  );
};

export default RoomPage;
