import { TrackReference, TrackReferenceOrPlaceholder } from "@livekit/components-react";

// //NOTE -  전체 비디오 및 오디오 on
export const allMediaOn = (tracks: TrackReferenceOrPlaceholder[]) => {
  tracks.forEach((track: TrackReferenceOrPlaceholder) => {
    const allTracks = track.publication;

    if (allTracks && allTracks.track) {
      allTracks.track.mediaStreamTrack.enabled = true;
    }
  });
};

// //NOTE -  전체 비디오 및 오디오 off
export const allMediaOff = (tracks: TrackReferenceOrPlaceholder[]) => {
  tracks.forEach((track: TrackReferenceOrPlaceholder) => {
    const allTracks = track.publication;

    if (allTracks && allTracks.track) {
      allTracks.track.mediaStreamTrack.enabled = false;
    }
  });
};

//NOTE -  모든 유저의 오디오만 off
export const allMikeOff = (tracks: TrackReferenceOrPlaceholder[]) => {
  tracks.forEach((track: TrackReferenceOrPlaceholder) => {
    const allTracks = track.publication;

    if (allTracks && allTracks.audioTrack) {
      allTracks.audioTrack.mediaStreamTrack.enabled = false;
    }
  });
};

//NOTE - 특정 유저의 비디오 및 오디오 on
export const specificUserMediaOn = (ParticipantTrack: TrackReference[]) => {
  const remoteAudio = ParticipantTrack[0].publication.track;
  const remoteVideo = ParticipantTrack[1].publication.track;

  if (remoteAudio && remoteVideo) {
    remoteAudio.mediaStreamTrack.enabled = true;
    remoteVideo.mediaStreamTrack.enabled = true;
  }
};

//NOTE - 특정 유저의 비디오만 on/off
export const specificUserVideoOn = (ParticipantTrack: TrackReference[], isVideo: boolean) => {
  const remoteTrack = ParticipantTrack[0].publication.track;

  if (remoteTrack) {
    const remoteCam = remoteTrack.mediaStreamTrack;

    isVideo ? (remoteCam.enabled = true) : (remoteCam.enabled = false);
  }
};
