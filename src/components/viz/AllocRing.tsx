type Slice = { name: string; share: number; tone: number };

const CX = 60;
const CY = 60;
const R = 42;
const CIRC = 2 * Math.PI * R;

export function AllocRing({
  slices,
  label,
}: {
  slices: readonly Slice[];
  label: string;
}) {
  let offset = 0;

  return (
    <svg className="viz-ring" viewBox="0 0 120 120" role="img" aria-label={label}>
      <circle className="viz-ring__track" cx={CX} cy={CY} r={R} />
      <g transform={`rotate(-90 ${CX} ${CY})`}>
        {slices.map((slice) => {
          const len = (slice.share / 100) * CIRC;
          const dash = `${len} ${CIRC - len}`;
          const dashOffset = -offset;
          offset += len;
          return (
            <circle
              key={slice.name}
              className={`viz-ring__seg viz-tone-${slice.tone}`}
              cx={CX}
              cy={CY}
              r={R}
              strokeDasharray={dash}
              strokeDashoffset={dashOffset}
            />
          );
        })}
      </g>
    </svg>
  );
}
