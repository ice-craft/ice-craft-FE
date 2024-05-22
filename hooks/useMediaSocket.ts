import { useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { useState } from "react";
import useMediaStatus from "./useMediaStatus";
import useSocketOff from "./useSocketOff";
import useSocketOn from "./useSocketOn";
import { MediaStatusMap } from "@/types";

const useMediaSocket = () => {
  const [playerStatus, setPlayerStatus] = useState<MediaStatusMap | undefined>();

  //NOTE -  전체 데이터
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.Microphone, withPlaceholder: true }
    ],
    { onlySubscribed: false }
  );

  //NOTE - socket "handler" 실행되는 곳: useEffect 내부에서 실행(첫 렌더링 시)
  const socketArr = [
    {
      eventName: "playerMediaStatus",
      handler: (playerMedia: MediaStatusMap) => {
        console.log("playerMediaStatus Event Message", playerMedia);

        //NOTE - 모달 테스트할 경우 카메라 부분 실행 막기
        // setPlayerStatus(playerMedia);
      }
    }
  ];

  useSocketOn(socketArr);
  useSocketOff(socketArr);
  useMediaStatus(tracks, playerStatus);
};

export default useMediaSocket;
