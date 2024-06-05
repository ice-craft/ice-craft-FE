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
import React from "react";

function TrackRefContextIfNeeded(
  props: React.PropsWithChildren<{
    trackRef?: TrackReferenceOrPlaceholder;
  }>
) {
  const hasContext = !!useMaybeTrackRefContext();
  return props.trackRef && !hasContext ? (
    <TrackRefContext.Provider value={props.trackRef}>{props.children}</TrackRefContext.Provider>
  ) : (
    <>{props.children}</>
  );
}

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

  const autoManageSubscription = useFeatureContext()?.autoSubscription;

  const handleSubscribe = React.useCallback(
    (subscribed: boolean) => {
      if (
        trackReference.source &&
        !subscribed &&
        layoutContext &&
        layoutContext.pin.dispatch &&
        isTrackReferencePinned(trackReference, layoutContext.pin.state)
      ) {
        layoutContext.pin.dispatch({ msg: "clear_pin" });
      }
    },
    [trackReference, layoutContext]
  );

  return (
    <div style={{ position: "relative" }} {...elementProps}>
      <TrackRefContextIfNeeded trackRef={trackReference}>
        <ParticipantContextIfNeeded participant={trackReference.participant}>
          {children ?? (
            <>
              {isTrackReference(trackReference) &&
              (trackReference.publication?.kind === "video" ||
                trackReference.source === Track.Source.Camera ||
                trackReference.source === Track.Source.ScreenShare) ? (
                <VideoTrack
                  trackRef={trackReference}
                  onSubscriptionStatusChanged={handleSubscribe}
                  manageSubscription={autoManageSubscription}
                />
              ) : (
                isTrackReference(trackReference) && (
                  <AudioTrack trackRef={trackReference} onSubscriptionStatusChanged={handleSubscribe} />
                )
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
                    <>
                      <ParticipantName>&apos;s screen</ParticipantName>
                    </>
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
  );
}
