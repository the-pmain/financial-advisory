/**
 * The reference's labelled burger button. Four 2px bars morph into a cross:
 * the first and last collapse to zero width while the middle pair rotate.
 */
export function NavToggle({
  open,
  onToggle,
  controls,
}: {
  open: boolean;
  onToggle: () => void;
  controls: string;
}) {
  const bar =
    'absolute left-0 right-0 mx-auto block h-[2px] bg-current transition-all duration-250 ease-in-out';

  return (
    <button
      type="button"
      id="nav-toggle"
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
      className="border-vz-blue text-vz-blue tracking-vz-02 hover:border-vz-orange hover:text-vz-orange relative block cursor-pointer overflow-hidden rounded-[5px] border-[0.5px] bg-white py-2 pr-[7px] pl-[34px] text-[15px] leading-[17px] transition-colors duration-250 active:opacity-75 max-mob:h-[39px] max-mob:w-10 max-mob:border-0 max-mob:p-0 max-mob:indent-[-99em]"
    >
      <span className="pointer-events-none absolute top-[9px] left-[9px] block h-4 w-4 indent-0 max-mob:top-[11px] max-mob:left-[11px]">
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
      Menu
    </button>
  );
}
