import { TrackReference, TrackReferenceOrPlaceholder } from "@livekit/components-react";

// //NOTE -  전체의 비디오 및 오디오 on/off
export const allMediaSetting = (tracks: TrackReferenceOrPlaceholder[], isAllMedia: boolean) => {
  tracks.forEach((track: TrackReferenceOrPlaceholder) => {
    const allTracks = track.publication;

    if (allTracks && allTracks.track) {
      const allMedia = allTracks.track.mediaStreamTrack;
      isAllMedia ? (allMedia.enabled = true) : (allMedia.enabled = false);
    }
  });
};

//NOTE -  전체의 오디오 on/off
export const allAudioSetting = (tracks: TrackReferenceOrPlaceholder[], isAllAudio: boolean) => {
  tracks.forEach((track: TrackReferenceOrPlaceholder) => {
    const allTracks = track.publication;

    if (allTracks && allTracks.audioTrack) {
      const allAudio = allTracks.audioTrack.mediaStreamTrack;
      isAllAudio ? (allAudio.enabled = true) : (allAudio.enabled = false);
    }
  });
};

//NOTE - 특정 유저의 오디오 on/off
export const specificUserAudioSetting = (ParticipantTrack: TrackReference[], isAudio: boolean) => {
  const remoteAudioTrack = ParticipantTrack[0].publication.track;

  if (remoteAudioTrack) {
    const remoteAudio = remoteAudioTrack.mediaStreamTrack;

    isAudio ? (remoteAudio.enabled = true) : (remoteAudio.enabled = false);
  }
};

//NOTE - 특정 유저의 비디오 on/off
// 특정 유저가 여러 명일 경우 객체로 받기
export const specificUserVideoSetting = (ParticipantTrack: TrackReference[], isVideo: boolean) => {
  const remoteVideoTrack = ParticipantTrack[1].publication.track;

  if (remoteVideoTrack) {
    const remoteCam = remoteVideoTrack.mediaStreamTrack;

    isVideo ? (remoteCam.enabled = true) : (remoteCam.enabled = false);
  }
};
