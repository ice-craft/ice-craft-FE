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
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false }
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout tracks={tracks} style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}
