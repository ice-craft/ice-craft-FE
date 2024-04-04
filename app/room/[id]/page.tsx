"use client";

import Timer from "@/app/_components/mafia/Timer";
import { getToken } from "@/app/_hooks/useQuery";
import { useModalStore } from "@/app/_utils/store/modal-store";
import {
  ControlBar,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useLocalParticipant,
  useParticipantTracks,
  useParticipants,
  useRemoteParticipant,
  useRemoteParticipants,
  useSpeakingParticipants,
  useTracks
} from "@livekit/components-react";
import "@livekit/components-styles";
import { useQuery } from "@tanstack/react-query";
import { Track } from "livekit-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function RoomPage() {
  const params = useSearchParams();
  const routers = useRouter();

  const room = params.get("room");
  const name = params.get("name");

  //임시 모달창 조건문
  const { isModal, setIsModal } = useModalStore();

  if (!room || !name) {
    return;
  }

  const {
    data: token,
    isLoading,
    isError
  } = useQuery({
    queryKey: [`room${name}`],
    queryFn: () => getToken({ room, name })
  });

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
        <CamOrVideo />
        <MyVideoConference />
        {isModal ? (
          <div className="w-full h-screen bg-black bg-opacity-60 fixed z-1 top-0 left-0 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center bg-white p-5 border border-solid border-gray-300 rounded-lg">
              <div className="w-96 h-96 p-5 block">
                <p className="text-6xl text-black"> 밤이 시작되었습니다.</p>
                <Timer />
              </div>
            </div>
          </div>
        ) : null}

        <RoomAudioRenderer />

        <ControlBar />
      </LiveKitRoom>
    </>
  );
}

function MyVideoConference() {
  // 전체 데이터
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    { onlySubscribed: false }
  );

  // local 정보를 가져온다.
  const { localParticipant } = useLocalParticipant();
  const remoteParticipant = useRemoteParticipants();

  console.log("로컬 정보 가져오기", localParticipant);
  console.log("원격 사용자들의 정보 가져오기", remoteParticipant);

  // 필터링하여 로컬 및 원격 트랙을 구분
  // 자신
  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)!;

  //나머지 player
  const remoteTracks = tracks.filter((track) => track.participant.sid !== localParticipant.sid);

  return (
    <div
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
      <div style={{ width: "50%" }}>
        {/* trackRef: 한 사람의 유저 track */}

        {localTracks.map((track) => (
          <div
            key={track.source}
            style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "50px" }}
          >
            <ParticipantTile trackRef={track} style={{ width: "100%", height: "100%" }} />

            <ControlBar />
          </div>
        ))}
      </div>
      {/* 원격 참가자 비디오 */}
      <div
        style={{
          width: "50%",
          display: "flex",
          alignItems: "baseline",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "flex-start"
        }}
      >
        {remoteTracks.map((track, index) => (
          <ParticipantTile key={index} trackRef={track} style={{ width: "225px", height: "200px" }} />
        ))}
      </div>
    </div>
  );
}

const CamOrVideo = () => {
  const localParticipant = useLocalParticipant(); //local 사용자의 정보를 반환
  const RemoteParticipants = useRemoteParticipants(); //현재 방의 모든 원격 참가자
  const RemoteParticipant = useRemoteParticipant("identity"); //현재 방의 특정 원격 참가자
  const Participants = useParticipants(); // 모든 참가자(로컬 및 원격)를 반환
  const UserSpeaking = useSpeakingParticipants(); //모든 참가자의 활성 발언자만 반환
  // const trackToggle = useTrackToggle(trackRef); //지정된 트랙의 상태와 기능을 반환

  console.log("localParticipant", localParticipant);
  console.log("UserSpeaking", UserSpeaking);
  console.log("Participants", Participants);

  //모든 트랙(데이터) 가져오기
  const tracks = useTracks();
  const sources = tracks.map((item) => {
    return item.source;
  });

  // 특정 참가자의 track을 얻을 수 있다.
  // (track.source[] , identity)
  const ParticipantTrack = useParticipantTracks(sources, "identity");
  console.log("ParticipantTrack", ParticipantTrack);
  console.log("RemoteParticipant", RemoteParticipant);

  // 투표 시간
  // 모든 유저 마이크만 off
  const AllMikeOff = () => {
    tracks.forEach((track) => {
      const trackAudioOn = track.publication.audioTrack;
      if (trackAudioOn) {
        trackAudioOn.mediaStreamTrack.enabled = false;
      }
    });
  };

  //최후의 반론 시간
  //특정 1명의 유저를 제외한 모든 캠 및 오디오 off
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

  // 전체 캠 및 오디오 on
  const allCamOn = () => {
    //죽은 유저를 제외한 tracks 가져오기
    const lifeTrack = tracks.filter((item) => item.participant.sid === "dieUser.sid");

    tracks.forEach((track) => {
      const trackOn = track.publication.track;
      if (trackOn) {
        trackOn.mediaStreamTrack.enabled = true;
      }
    });
  };

  // 전체 캠 및 오디오 off
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
    </>
  );
};
