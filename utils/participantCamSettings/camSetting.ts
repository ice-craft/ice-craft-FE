import { TrackReference, TrackReferenceOrPlaceholder } from "@livekit/components-react";

// //NOTE -  전체 비디오 및 오디오 on
export const allMediaOn = (tracks: TrackReferenceOrPlaceholder[]) => {
  tracks.forEach((track: TrackReferenceOrPlaceholder) => {
    const allTracks = track.publication;

    if (allTracks && allTracks.track) {
      //전체 비디오 및 오디오 on
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

//NOTE - 특정 유저 1명의 비디오 및 오디오 on
export const oneUserMediaOn = (ParticipantTrack: TrackReference[]) => {
  //순서:
  //1) 전체 비디오 및 오디오 off

  //2) 특정 유저의 비디오 및 오디오 on
  const remoteCam = ParticipantTrack[0].publication.track;
  const remoteVideo = ParticipantTrack[1].publication.track;

  if (remoteCam && remoteVideo) {
    remoteCam.mediaStreamTrack.enabled = true;
    remoteVideo.mediaStreamTrack.enabled = true;
  }
};
