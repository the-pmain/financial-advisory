import type { TeamMember } from '../../data/team';

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((part) => !/^(de|del|la|las|los|y)$/i.test(part))
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

type Size = 'sm' | 'md' | 'lg';

const sizeClass: Record<Size, string> = {
  sm: 'size-[88px] text-[22px]',
  md: 'size-[120px] text-[32px]',
  lg: 'size-[200px] text-[48px] max-mob:size-[120px] max-mob:text-[32px]',
};

export function TeamAvatar({
  member,
  size = 'sm',
  className = '',
}: {
  member: Pick<TeamMember, 'name' | 'photo'>;
  size?: Size;
  className?: string;
}) {
  const box = `shrink-0 overflow-hidden bg-vz-blue-panel text-vz-blue flex items-center justify-center font-bold tracking-wide ${sizeClass[size]} ${className}`;

  if (member.photo) {
    return (
      <div className={box}>
        <img
          src={member.photo}
          alt=""
          width={392}
          height={256}
          className="size-full object-contain"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return <div className={box}>{initials(member.name)}</div>;
}
