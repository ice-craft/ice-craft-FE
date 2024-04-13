"use client";

import CheckModal from "@/components/mafia/CheckModal";
import MafiaModal from "@/components/mafia/MafiaModal";
import MyVideoConference from "@/components/mafia/MyVideoConference";
import { useActiveStore } from "@/store/active-store";
import useOverlayStore from "@/store/overlay-store";
import { useModalStore } from "@/store/toggle-store";
import {
  allAudioSetting,
  allMediaSetting,
  remainUserMediaSetting,
  specificUserAudioSetting,
  specificUserVideoSetting
} from "@/utils/participantCamSettings/camSetting";
import { socket } from "@/utils/socket/socket";
import { useLocalParticipant, useParticipantTracks, useTracks } from "@livekit/components-react";
import "@livekit/components-styles";
import { useEffect } from "react";

const RoomPage = () => {
  const tracks = useTracks();
  const sources = tracks.map((item) => item.source);

  const { isModal, setIsModal } = useModalStore();
  const { setIsOverlay, clearActiveParticipant } = useOverlayStore();
  const { activeName, setActiveName } = useActiveStore();

  const mafiaTrack = useParticipantTracks(sources, "12323123");
  const mafiaTrackSecond = useParticipantTracks(sources, "321");

  // 로컬 user의 닉네임을 가져온다.
  const localParticipant = useLocalParticipant();
  const localIdentity = localParticipant.localParticipant.identity;

  useEffect(() => {
    socket.on("showModal", (title, message, timer, nickname, yesOrNo) => {
      //NOTE - 밤일 경우 모든 user의 캠 및 마이크 off
      if (message.indexOf("밤이 되었습니다.")) {
        allMediaSetting(tracks, false);
      }
    });
  });

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
              setActiveName("morning");
            }}
          >
            정해진 타이머 이후 모달창 on/off
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              setIsModal(true);
              setActiveName("check");
            }}
          >
            투표 찬성 반대 모달
          </button>
        </div>
      </div>
      <MyVideoConference />
      {isModal && activeName === "morning" && <MafiaModal />}
      {isModal && activeName === "check" && <CheckModal />}
    </>
  );
};

export default RoomPage;
