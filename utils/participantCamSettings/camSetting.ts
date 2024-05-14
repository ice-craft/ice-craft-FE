import { TrackReference, TrackReferenceOrPlaceholder } from "@livekit/components-react";
import {
  LocalParticipant,
  LocalTrackPublication,
  RemoteParticipant,
  RemoteTrackPublication,
  TrackPublication
} from "livekit-client";

// //NOTE -  전체의 비디오 및 오디오 on/off
export const allMediaSetting = (tracks: TrackReferenceOrPlaceholder[], isAllMedia: boolean) => {
  // tracks.forEach((track: TrackReferenceOrPlaceholder) => {
  //   const allTracks = track.publication;
  //   if (allTracks && allTracks.track) {
  //     const allMedia = allTracks.track.mediaStreamTrack;
  //     isAllMedia ? (allMedia.enabled = true) : (allMedia.enabled = false);
  //   }
  // });
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
// 특정 user의 카메라 경우에는 특정 user에게만 적용되게끔 만들었으니 오디오 또한,  변화되는 것을 다른 유저들은 몰라야한다.
export const specificUserVideoSetting = (
  MafiaUserTrack: (LocalParticipant | RemoteParticipant | undefined)[],
  isVideo: boolean
) => {
  MafiaUserTrack.map((track) => {
    const publicationTrack = track!.getTrackPublications();

    const audioTrack = publicationTrack[0].track?.mediaStreamTrack;
    const camTrack = publicationTrack[1].track?.mediaStreamTrack;

    if (audioTrack && camTrack && isVideo) {
      // audioTrack.enabled = true; focus문제로 현재 오디오설정은 비활성화
      camTrack.enabled = true;
      camTrack.onmute;
    }

    if (audioTrack && camTrack && !isVideo) {
      // audioTrack.enabled = false; focus문제로 현재 오디오설정은 비활성화
      camTrack.enabled = false;
    }
  });
};

//NOTE - 특정 유저를 제외한 비디오 및 오디오 off
export const remainUserMediaSetting = (
  CamTrack: TrackPublication | undefined,
  AudioTrack: TrackPublication | undefined
) => {
  if (CamTrack?.track && AudioTrack?.track) {
    const remainVideo = CamTrack.track.mediaStreamTrack;
    const remainAudio = AudioTrack.track.mediaStreamTrack;

    remainAudio.enabled = false;
    remainVideo.enabled = false;
  }
};
