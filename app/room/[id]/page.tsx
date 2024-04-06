"use client";

import React from "react";
import Timer from "@/app/_components/mafia/Timer";
import { useModalStore } from "@/app/_store/modal-store";
import { useParticipantTracks, useRemoteParticipant, useTracks } from "@livekit/components-react";
import "@livekit/components-styles";
import { useRouter } from "next/navigation";
import MyVideoConference from "@/app/_components/mafia/MyVideoConference";

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

  //NOTE -  모든 유저 마이크만 off
  const AllMikeOff = () => {
    tracks.forEach((track) => {
      const trackAudioOn = track.publication.audioTrack;
      if (trackAudioOn) {
        trackAudioOn.mediaStreamTrack.enabled = false;
      }
    });
  };

  //NOTE - 특정 1명의 유저를 제외한 모든 캠 및 오디오 off
  const lastSpeak = () => {
    // 전체 마이크 및 캠 off
    tracks.forEach((track) => {
      const trackOff = track.publication.track;
      if (trackOff) {
        trackOff.mediaStreamTrack.enabled = false;
      }
    });

    //특정 유저 캠 및 오디오 on
    if (RemoteParticipant) {
      const testCam = ParticipantTrack[0].publication.track!;
      const testVideo = ParticipantTrack[1].publication.track!;

      testCam.mediaStreamTrack.enabled = true;
      testVideo.mediaStreamTrack.enabled = true;
    }
  };

  //NOTE -  전체 캠 및 오디오 on
  const allCamOn = () => {
    tracks.forEach((track) => {
      const trackOn = track.publication.track;
      if (trackOn) {
        trackOn.mediaStreamTrack.enabled = true;
      }
    });
  };

  //NOTE -  전체 캠 및 오디오 off
  const allCamOff = () => {
    tracks.forEach((track) => {
      const trackOff = track.publication.track;
      if (trackOff) {
        trackOff.mediaStreamTrack.enabled = false;
      }
    });
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
        <button onClick={AllMikeOff}> 투표 시간 </button>
      </div>
      <div>
        <button onClick={lastSpeak}>최후의 반론 시간 </button>
      </div>
      <div>
        <button onClick={allCamOn}>전체 캠 및 오디오 on </button>
      </div>
      <div>
        <button onClick={allCamOff}>전체 캠 및 오디오 off </button>
      </div>

      <MyVideoConference />
      {isModal ? (
        <div className="w-full h-screen bg-black bg-opacity-60 fixed z-1 top-0 left-0 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center bg-white p-5 border border-solid border-gray-300 rounded-lg">
            <div className="w-96 h-96 p-5 block">
              <p className="text-6xl text-black"> 밤이 시작되었습니다.</p>
            </div>
            <Timer />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RoomPage;
