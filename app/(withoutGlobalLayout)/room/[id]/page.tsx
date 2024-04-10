"use client";

import MafiaModal from "@/components/mafia/MafiaModal";
import MyVideoConference from "@/components/mafia/MyVideoConference";
import { useModalStore } from "@/store/toggle-store";
import {
  allAudioSetting,
  allMediaSetting,
  remainUserMediaSetting,
  specificUserAudioSetting,
  specificUserVideoSetting
} from "@/utils/participantCamSettings/camSetting";
import { DisconnectButton, useLocalParticipant, useParticipantTracks, useTracks } from "@livekit/components-react";
import "@livekit/components-styles";
import { useRouter } from "next/navigation";

const RoomPage = () => {
  const routers = useRouter();
  const tracks = useTracks();
  const { isModal, setIsModal } = useModalStore();

  const sources = tracks.map((item) => item.source);

  // 서버에서 userId or nickName 부여
  const participantTrack = useParticipantTracks(sources, "12323123");
  const participantTrack2 = useParticipantTracks(sources, "321");
  const localParticipant = useLocalParticipant();

  const leaveRoom = () => {
    routers.replace(`/main`);
  };

  const MafiaLogic = () => {
    if (
      localParticipant.localParticipant.identity == "12323123" ||
      localParticipant.localParticipant.identity == "321"
    ) {
      specificUserVideoSetting(participantTrack, true);
      specificUserVideoSetting(participantTrack2, true);
    } else {
      const remainAudio = localParticipant.microphoneTrack;
      const remainCam = localParticipant.cameraTrack;
      remainUserMediaSetting(remainAudio, remainCam);
    }
  };

  return (
    <>
      <DisconnectButton style={{ width: "200px" }} onClick={leaveRoom}>
        나가기
      </DisconnectButton>
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
        <button onClick={() => allAudioSetting(tracks, false)}> 투표 시간 </button>
      </div>
      <div>
        <button
          onClick={() => {
            allAudioSetting(tracks, false);
            specificUserAudioSetting(participantTrack, true);
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
