import { useT } from '../../i18n';

/**
 * The reference's labelled burger button. Four 2px bars morph into a cross:
 * the first and last collapse to zero width while the middle pair rotate.
 */
export function NavToggle({
  open,
  onToggle,
  controls,
  tone = 'default',
}: {
  open: boolean;
  onToggle: () => void;
  controls: string;
  tone?: 'default' | 'hero';
}) {
  const t = useT();
  const bar =
    'absolute left-0 right-0 mx-auto block h-[2px] bg-current transition-all duration-250 ease-in-out';
  const hero = tone === 'hero';

  return (
    <button
      type="button"
      id="nav-toggle"
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
      className={`tracking-vz-02 relative block min-h-11 cursor-pointer overflow-hidden rounded-[5px] border-[0.5px] py-2 pr-[7px] pl-[34px] text-[15px] leading-[17px] transition-colors duration-250 active:opacity-75 max-mob:size-11 max-mob:border-0 max-mob:p-0 max-mob:indent-[-99em] ${
        hero
          ? 'border-white/70 bg-transparent text-white hover:border-vz-orange-light hover:text-vz-orange-light'
          : 'border-vz-blue-mid bg-vz-blue-mid text-white hover:border-vz-slate hover:bg-vz-slate'
      }`}
    >
      <span className="pointer-events-none absolute top-[14px] left-[9px] block h-4 w-4 indent-0 max-mob:top-[14px] max-mob:left-[14px]">
        <span
          className={bar}
          style={open ? { top: 9, width: 0, left: '50%' } : { top: 0, width: '100%' }}
        />
        <span
          className={bar}
          style={open ? { top: 7, transform: 'rotate(45deg)' } : { top: 7, width: '100%' }}
        />
        <span
          className={bar}
          style={open ? { top: 7, transform: 'rotate(-45deg)' } : { top: 7, width: '100%' }}
        />
        <span
          className={bar}
          style={open ? { top: 7, width: 0, left: '50%' } : { top: 14, width: '100%' }}
        />
      </span>
      {t.ui.menu}
    </button>
  );
}
