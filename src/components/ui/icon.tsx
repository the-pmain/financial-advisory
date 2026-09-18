import type { LucideIcon, LucideProps } from "lucide-react";

export type { LucideIcon } from "lucide-react";

export const ICON_SIZE = 18;
export const ICON_STROKE = 1.5;

export function Icon({
  icon: Glyph,
  size = ICON_SIZE,
  strokeWidth = ICON_STROKE,
  "aria-hidden": ariaHidden = true,
  ...props
}: LucideProps & { icon: LucideIcon }) {
  return <Glyph size={size} strokeWidth={strokeWidth} aria-hidden={ariaHidden} {...props} />;
}
