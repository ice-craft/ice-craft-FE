// //NOTE -  전체 비디오 및 오디오 on
export const allCamOn = (tracks: any) => {
  tracks.forEach((track: any) => {
    const trackOn = track.publication.track;
    if (trackOn) {
      trackOn.mediaStreamTrack.enabled = true;
    }
  });
};

// //NOTE -  전체  비디오 및 오디오 off
export const allCamOff = (tracks: any) => {
  tracks.forEach((track: any) => {
    const trackOff = track.publication.track;
    if (trackOff) {
      trackOff.mediaStreamTrack.enabled = false;
    }
  });
};

//NOTE -  모든 유저의 마이크만 off
export const AllMikeOff = (tracks: any) => {
  tracks.forEach((track: any) => {
    const trackAudioOn = track.publication.audioTrack;
    if (trackAudioOn) {
      trackAudioOn.mediaStreamTrack.enabled = false;
    }
  });
};

//NOTE - 특정 유저 1명을 제외한 모든 캠 및 오디오 off
export const lastSpeak = (tracks: any, RemoteParticipant: any, ParticipantTrack: any) => {
  // 전체 마이크 및 캠 off
  tracks.forEach((track: any) => {
    const trackOff = track.publication.track;
    if (trackOff) {
      trackOff.mediaStreamTrack.enabled = false;
    }
  });

  //특정 유저의 캠 및 오디오 on
  if (RemoteParticipant) {
    const testCam = ParticipantTrack[0].publication.track!;
    const testVideo = ParticipantTrack[1].publication.track!;

    testCam.mediaStreamTrack.enabled = true;
    testVideo.mediaStreamTrack.enabled = true;
  }
};
