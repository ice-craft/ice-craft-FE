"use client";

import Timer from "@/app/_components/mafia/Timer";
import { useGetToken } from "@/app/_hooks/useToken";
import { useModalStore } from "@/app/_store/modal-store";
import {
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  TrackReference,
  useLocalParticipant,
  useParticipantTracks,
  useRemoteParticipant,
  useTracks
} from "@livekit/components-react";
import "@livekit/components-styles";
import { Track } from "livekit-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function RoomPage() {
  const params = useSearchParams();
  const routers = useRouter();

  const { isModal, setIsModal } = useModalStore();

  const room = params.get("room");
  const name = params.get("name");

  if (!room || !name) {
    return;
  }

  const { data: token, isLoading, isError } = useGetToken({ room, name });

  if (isLoading) {
    console.log("로딩중");
  }

  if (isError) {
    console.log(isError);
  }

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

      <LiveKitRoom
        token={token} // 필수 요소
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL} // 필수 요소
        video={true}
        audio={true}
        onDisconnected={deleteToken} //연결 중단 시 발생하는 이벤트 핸들러
        data-lk-theme="default"
        // simulateParticipants={5} // 테스트용 카메라 생성
        style={{ height: "100vh", width: "100vw" }}
      >
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
        <RoomAudioRenderer />
      </LiveKitRoom>
    </>
  );
}

function MyVideoConference() {
  // 모든 트랙(데이터) 가져오기
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    { onlySubscribed: false }
  );

  //클릭시 이미지 보임
  const [showOverlay, setShowOverlay] = useState<{ [key: string]: boolean }>({});

  // 오버레이 토글 함수
  const toggleOverlay = (event: any, participantSid: string) => {
    event.stopPropagation();
    setShowOverlay((prev) => {
      const newState = { ...prev, [participantSid]: !prev[participantSid] };
      return newState;
    });
  };
  // local 정보를 가져온다.
  const { localParticipant } = useLocalParticipant();

  // 필터링하여 로컬 및 원격 트랙을 구분
  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)!;
  const remoteTracks = tracks.filter((track) => track.participant.sid !== localParticipant.sid);

  return (
    <main
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        padding: "0 20px",
        gap: "30px",
        justifyContent: "space-between"
      }}
    >
      {/* 로컬 참가자 비디오 */}
      <section style={{ width: "35%", height: "100%" }}>
        {localTracks.map((track) => (
          <div
            key={track.participant.sid}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "50px",
              justifyContent: "center",
              marginTop: "150px"
            }}
          >
            <div
              onClick={(e) => toggleOverlay(e, track.participant.sid)}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "8px"
              }}
            >
              <ParticipantTile trackRef={track} />
              {showOverlay[track.participant.sid] && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "red",
                    opacity: "0.7"
                  }}
                >
                  테스트당
                </div>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* 원격 참가자 비디오 */}
      <section
        style={{
          width: "65%",
          display: "flex",
          alignItems: "baseline",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          height: "100%"
        }}
      >
        {remoteTracks.map((track, index) => (
          <div
            onClick={(e) => toggleOverlay(e, track.participant.sid)}
            style={{ position: "relative", overflow: "hidden", borderRadius: "8px" }}
          >
            <ParticipantTile key={index} trackRef={track} style={{ width: "300px", height: "200px" }} />
            {showOverlay[track.participant.sid] && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "300px",
                  height: "200px",
                  backgroundColor: "red",
                  opacity: "0.6"
                }}
              >
                테스트다
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}

//NOTE -  전체 캠 및 오디오 off
export const allCamOff = (tracks: TrackReference[]) => {
  tracks.forEach((track) => {
    const trackOff = track.publication.track;
    if (trackOff) {
      trackOff.mediaStreamTrack.enabled = false;
    }
  });
};

//NOTE -  전체 캠 및 오디오 on
const allCamOn = (tracks: TrackReference[]) => {
  //죽은 유저를 제외한 tracks 가져오기
  const lifeTrack = tracks.filter((item) => item.participant.sid === "dieUser.sid");

  tracks.forEach((track) => {
    const trackOn = track.publication.track;
    if (trackOn) {
      trackOn.mediaStreamTrack.enabled = true;
    }
  });
};

//NOTE - 특정 1명의 유저를 제외한 모든 캠 및 오디오 off
export const lastSpeak = (tracks: TrackReference[]) => {
  const RemoteParticipant = useRemoteParticipant("identity"); //현재 방의 특정 원격 참가자
  const sources = tracks.map((item) => {
    return item.source;
  });
  const ParticipantTrack = useParticipantTracks(sources, "identity");

  // 전체 마이크 및 캠 off
  tracks.forEach((track) => {
    const trackOff = track.publication.track;
    if (trackOff) {
      trackOff.mediaStreamTrack.enabled = false;
    }
  });

  // 특정 유저 캠 및 오디오 on
  if (RemoteParticipant) {
    const testCam = ParticipantTrack[0].publication.track!;
    const testVideo = ParticipantTrack[1].publication.track!;

    testCam.mediaStreamTrack.enabled = true;
    testVideo.mediaStreamTrack.enabled = true;
  }
};

//NOTE -  모든 유저 마이크만 off
export const AllMikeOff = (tracks: TrackReference[]) => {
  tracks.forEach((track) => {
    const trackAudioOn = track.publication.audioTrack;
    if (trackAudioOn) {
      trackAudioOn.mediaStreamTrack.enabled = false;
    }
  });
};
