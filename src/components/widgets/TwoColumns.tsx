import type { ReactNode } from 'react';
import { SectionTitle } from '../ui/primitives';

/**
 * The reference's `two-columns` widget: two equal halves separated by a 72px
 * gutter that is drawn as 34px padding plus a 2px #f5f5f7 border on each side.
 *
 * It comes in two flavours, and they stack at different points. With one
 * heading spanning both columns (News) the pair survives to 741px and the
 * gutter becomes a 3px rule. With a heading per column (mandates / property)
 * the pair breaks at 861px instead, and the second heading's own clear space
 * separates the two.
 */
export function TwoColumns({
  title,
  leftTitle,
  rightTitle,
  left,
  right,
}: {
  title?: string;
  leftTitle?: string;
  rightTitle?: string;
  left: ReactNode;
  right: ReactNode;
}) {
  const perColumnTitles = Boolean(leftTitle || rightTitle);

  const column = perColumnTitles
    ? 'flex w-1/2 flex-col max-tab:w-full'
    : 'flex w-1/2 flex-col max-mob:w-full';
  const inner = perColumnTitles ? 'pt-[30px] max-mob:pt-[20px]' : '';
  const leftInner = perColumnTitles
    ? 'border-r-2 pr-[34px] max-tab:border-r-0 max-tab:pr-0'
    : 'border-r-2 pr-[34px] max-mob:border-r-0 max-mob:pr-0';
  const rightInner = perColumnTitles
    ? 'border-l-2 pl-[34px] max-tab:border-l-0 max-tab:pl-0'
    : 'border-l-2 pl-[34px] max-mob:border-l-0 max-mob:pl-0';
  const rightOffset = perColumnTitles
    ? 'max-tab:mt-[54px] max-mob:mt-[60px]'
    : 'max-mob:mt-[20px] max-mob:border-t-[3px] max-mob:border-t-black/10 max-mob:pt-[20px]';

  return (
    <section className={`flex flex-wrap ${perColumnTitles ? 'max-tab:block' : 'max-mob:block'}`}>
      {title && (
        <SectionTitle variant="columns" className="w-full">
          {title}
        </SectionTitle>
      )}

      <div className={column}>
        {leftTitle && (
          <SectionTitle variant="columns" spaced={false} className="mr-[20px] max-tab:mr-0">
            {leftTitle}
          </SectionTitle>
        )}
        <div className={`border-vz-surface flex-1 ${leftInner} ${inner}`}>{left}</div>
      </div>

      <div className={`${column} ${rightOffset}`}>
        {rightTitle && (
          <SectionTitle variant="columns" spaced={false} className="ml-[20px] max-tab:ml-0">
            {rightTitle}
          </SectionTitle>
        )}
        <div className={`border-vz-surface flex-1 ${rightInner} ${inner}`}>{right}</div>
      </div>
    </section>
  );
}
