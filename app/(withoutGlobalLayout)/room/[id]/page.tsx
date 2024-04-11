"use client";

import MafiaModal from "@/components/mafia/MafiaModal";
import MyVideoConference from "@/components/mafia/MyVideoConference";
import useOverlayStore from "@/store/overlay-store";
import { useModalStore } from "@/store/toggle-store";
import {
  allAudioSetting,
  allMediaSetting,
  remainUserMediaSetting,
  specificUserAudioSetting,
  specificUserVideoSetting
} from "@/utils/participantCamSettings/camSetting";
import { useLocalParticipant, useParticipantTracks, useTracks } from "@livekit/components-react";
import "@livekit/components-styles";

const RoomPage = () => {
  const tracks = useTracks();
  const sources = tracks.map((item) => item.source);

  const { isModal, setIsModal } = useModalStore();
  const { setIsOverlay, clearActiveParticipant } = useOverlayStore();

  const mafiaTrack = useParticipantTracks(sources, "12323123");
  const mafiaTrackSecond = useParticipantTracks(sources, "321");

  const localParticipant = useLocalParticipant();
  const localIdentity = localParticipant.localParticipant.identity;

  const MafiaLogic = () => {
    if (localIdentity == "12323123" || "321") {
      specificUserVideoSetting(mafiaTrack, true);
      specificUserVideoSetting(mafiaTrackSecond, true);
    } else {
      const remainAudio = localParticipant.microphoneTrack;
      const remainCam = localParticipant.cameraTrack;
      remainUserMediaSetting(remainAudio, remainCam);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => {
            allMediaSetting(tracks, false);
          }}
        >
          밤이 되었습니다.
        </button>
      </div>
      <div>
        <button onClick={MafiaLogic}>마피아 카메라 켜짐</button>
      </div>
      <div>
        <button onClick={() => allMediaSetting(tracks, true)}> 아침이 밝았습니다. </button>
      </div>
      <div>
        <button
          onClick={() => {
            setIsOverlay(true);
            allAudioSetting(tracks, false);
          }}
        >
          투표 시간
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setIsOverlay(false);
            allAudioSetting(tracks, false);
            specificUserAudioSetting(mafiaTrack, true);
            clearActiveParticipant();
          }}
        >
          최후의 반론 시간
        </button>
        <div>
          <button
            onClick={() => {
              allAudioSetting(tracks, false);
            }}
          >
            모든 유저의 오디오 off
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setIsModal(true);
            }}
          >
            정해진 타이머 이후 모달창 on/off
          </button>
        </div>
      </div>

      <MyVideoConference />
      {isModal ? <MafiaModal /> : null}
    </>
  );
};

export default RoomPage;
