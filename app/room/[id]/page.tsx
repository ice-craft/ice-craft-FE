"use client";

import Timer from "@/app/_components/mafia/Timer";
import { getToken } from "@/app/_hooks/useQuery";
import { useModalStore } from "@/app/_utils/store/modal-store";
import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useChat,
  useTracks
} from "@livekit/components-react";
import "@livekit/components-styles";
import { useQuery } from "@tanstack/react-query";
import { Track } from "livekit-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function RoomPage() {
  const params = useSearchParams();
  const routers = useRouter();

  const room = params.get("room");
  const name = params.get("name");
  const [localParticipantSid, setLocalParticipantSid] = useState("");

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
      <button
        onClick={() => {
          setIsModal(true);
        }}
      >
        타이머 버튼 클릭
      </button>
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
        <MyVideoConference localParticipantSid={localParticipantSid} />
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

interface MyVideoConferenceProps {
  localParticipantSid: string;
}

function MyVideoConference({ localParticipantSid }: MyVideoConferenceProps) {
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    { onlySubscribed: false }
  );

  console.log(tracks[0]?.participant);
  console.log(tracks[0]);

  // 필터링하여 로컬 및 원격 트랙을 구분
  const localTracks = tracks.filter((track) => track.participant.sid === localParticipantSid);
  const remoteTracks = tracks.filter((track) => track.participant.sid !== localParticipantSid);

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
        {localTracks.map((track) => (
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "50px" }}>
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
