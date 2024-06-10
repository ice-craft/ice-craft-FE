import { isTrackReference, isTrackReferencePinned, TrackReferenceOrPlaceholder } from "@livekit/components-core";
import {
  AudioTrack,
  ConnectionQualityIndicator,
  FocusToggle,
  LockLockedIcon,
  ParticipantContextIfNeeded,
  ParticipantName,
  ParticipantPlaceholder,
  ParticipantTileProps,
  TrackMutedIndicator,
  TrackRefContext,
  VideoTrack,
  useEnsureTrackRef,
  useFeatureContext,
  useIsEncrypted,
  useMaybeLayoutContext,
  useMaybeTrackRefContext,
  useParticipantTile
} from "@livekit/components-react";
import { Track } from "livekit-client";
import React, { useEffect } from "react";
import S from "@/style/livekit/livekit.module.css";
import { useActivePlayer } from "@/store/overlay-store";
import { useDiedPlayer } from "@/store/game-store";

export function MyParticipantTile({
  trackRef,
  children,
  onParticipantClick,
  disableSpeakingIndicator,
  ...htmlProps
}: ParticipantTileProps) {
  const trackReference = useEnsureTrackRef(trackRef);

  const { elementProps } = useParticipantTile<HTMLDivElement>({
    htmlProps,
    disableSpeakingIndicator,
    onParticipantClick,
    trackRef: trackReference
  });
  const isEncrypted = useIsEncrypted(trackReference.participant);
  const layoutContext = useMaybeLayoutContext();
  const diedPlayers = useDiedPlayer();
  const PlayerId = useActivePlayer();

  const autoManageSubscription = useFeatureContext()?.autoSubscription;

  const diedPlayer = diedPlayers.find((diedPlayer) => diedPlayer === trackReference.participant.identity);

  return (
    <>
      {!diedPlayer ? (
        <div
          className={`${S.remoteParticipantOverlay} ${
            PlayerId === trackReference!.participant.identity ? S.active : ""
          }`}
          // onClick={isRemoteOverlay ? (e) => checkClickHandle(e, track!.participant.identity) : undefined}
        >
          <div style={{ position: "relative" }} {...elementProps}>
            <TrackRefContextIfNeeded trackRef={trackReference}>
              <ParticipantContextIfNeeded participant={trackReference.participant}>
                {children ?? (
                  <>
                    {isTrackReference(trackReference) &&
                    (trackReference.publication?.kind === "video" || trackReference.source === Track.Source.Camera) ? (
                      <VideoTrack trackRef={trackReference} manageSubscription={autoManageSubscription} />
                    ) : (
                      isTrackReference(trackReference) && <AudioTrack trackRef={trackReference} />
                    )}
                    <div className="lk-participant-placeholder">
                      <ParticipantPlaceholder />
                    </div>
                    <div className="lk-participant-metadata">
                      <div className="lk-participant-metadata-item">
                        {trackReference.source === Track.Source.Camera ? (
                          <>
                            {isEncrypted && <LockLockedIcon style={{ marginRight: "0.25rem" }} />}
                            <TrackMutedIndicator
                              trackRef={{
                                participant: trackReference.participant,
                                source: Track.Source.Microphone
                              }}
                              show={"muted"}
                            ></TrackMutedIndicator>
                            <ParticipantName />
                          </>
                        ) : (
                          <>{/* <ParticipantName>&apos;s screen</ParticipantName> */}</>
                        )}
                      </div>
                      <ConnectionQualityIndicator className="lk-participant-metadata-item" />
                    </div>
                  </>
                )}
                <FocusToggle trackRef={trackReference} />
              </ParticipantContextIfNeeded>
            </TrackRefContextIfNeeded>
          </div>
        </div>
      ) : (
        <div className={"bg-background: bg-red-100"}>
          <h1>asdfasdfasdfasdf</h1>adsfasdfsdfsdf
        </div>
      )}
    </>
  );
}

const TrackRefContextIfNeeded = (
  props: React.PropsWithChildren<{
    trackRef?: TrackReferenceOrPlaceholder;
  }>
) => {
  const hasContext = !!useMaybeTrackRefContext();
  return props.trackRef && !hasContext ? (
    <TrackRefContext.Provider value={props.trackRef}>{props.children}</TrackRefContext.Provider>
  ) : (
    <>{props.children}</>
  );
};
