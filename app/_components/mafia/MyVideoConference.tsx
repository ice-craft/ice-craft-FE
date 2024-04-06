import { ParticipantTile, useLocalParticipant, useRemoteParticipants, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import React, { useState } from "react";

const MyVideoConference = () => {
  // 전체 데이터
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
    // console.log(`Event type: ${event.type}`);
    event.stopPropagation();
    setShowOverlay((prev) => {
      const newState = { ...prev, [participantSid]: !prev[participantSid] };
      return newState;
    });
  };
  // local 정보를 가져온다.
  const { localParticipant } = useLocalParticipant();
  const remoteParticipant = useRemoteParticipants();

  // 필터링하여 로컬 및 원격 트랙을 구분
  // 자신
  const localTracks = tracks.filter((track) => track.participant.sid === localParticipant.sid)!;

  //나머지 player
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
};

export default MyVideoConference;
