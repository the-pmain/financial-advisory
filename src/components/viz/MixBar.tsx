type Slice = { name: string; share: number; tone: number };

export function MixBar({
  slices,
  label,
}: {
  slices: readonly Slice[];
  label: string;
}) {
  return (
    <div className="viz-mix" role="img" aria-label={label}>
      {slices.map((slice) => (
        <span
          key={slice.name}
          className={`viz-mix__seg viz-tone-${slice.tone}`}
          style={{ width: `${slice.share}%` }}
        />
      ))}
    </div>
  );
}
