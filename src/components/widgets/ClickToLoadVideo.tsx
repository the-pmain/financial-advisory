import { useEffect, useRef, useState } from 'react';
import { hostedVideoEmbedAllowed, YOUTUBE_ID } from '../../data/alternativeEducation';

type ClickToLoadVideoProps = {
  videoId: string;
  title: string;
  label: string;
  hostedMeta: string;
  hostedNote: string;
  linkMeta: string;
  linkNote: string;
  youtube: string;
  compact?: boolean;
};

function PlayMark({ compact }: { compact?: boolean }) {
  return (
    <span
      aria-hidden
      className={`text-vz-orange-btn border-vz-orange-btn grid shrink-0 place-items-center rounded-full border ${
        compact ? 'size-10' : 'size-[52px]'
      }`}
    >
      <svg viewBox="0 0 24 24" width={compact ? 14 : 18} height={compact ? 14 : 18} fill="currentColor">
        <path d="M8 5v14l11-7L8 5Z" />
      </svg>
    </span>
  );
}

/**
 * First paint is a normal YouTube link. On a hosted site, a click replaces
 * that control with a youtube-nocookie player. Local previews stay on the link
 * because embedded playback is often rejected from localhost.
 */
export function ClickToLoadVideo({
  videoId,
  title,
  label,
  hostedMeta,
  hostedNote,
  linkMeta,
  linkNote,
  youtube,
  compact = false,
}: ClickToLoadVideoProps) {
  const [embedReady, setEmbedReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (hostedVideoEmbedAllowed(window.location) && YOUTUBE_ID.test(videoId)) {
      setEmbedReady(true);
    }
  }, [videoId]);

  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  const shell =
    'absolute inset-0 flex flex-col items-center justify-center gap-3 bg-vz-blue-panel-faint p-5 text-center no-underline hover:bg-vz-blue-tint';

  return (
    <div className="border-vz-rule relative aspect-video w-full min-w-0 overflow-hidden border">
      {playing ? (
        <iframe
          ref={frameRef}
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 size-full border-0"
        />
      ) : embedReady ? (
        <button type="button" className={`${shell} cursor-pointer border-0`} onClick={() => setPlaying(true)}>
          <PlayMark compact={compact} />
          <span className="text-vz-ink text-[20px] leading-[1.4] font-semibold">{label}</span>
          <span className="text-vz-gray text-[13px] leading-[1.55]">
            {hostedMeta}
            <br />
            {hostedNote}
          </span>
        </button>
      ) : (
        <a href={youtube} target="_blank" rel="noopener noreferrer" className={shell}>
          <PlayMark compact={compact} />
          <span className="text-vz-ink text-[20px] leading-[1.4] font-semibold">{label}</span>
          <span className="text-vz-gray text-[13px] leading-[1.55]">
            {linkMeta}
            <br />
            {linkNote}
            <span aria-hidden> ↗</span>
            <span className="visually-hidden"> (external link, opens in a new window)</span>
          </span>
        </a>
      )}
    </div>
  );
}
