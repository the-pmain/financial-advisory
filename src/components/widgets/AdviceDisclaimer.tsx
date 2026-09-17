export function AdviceDisclaimer({ className = '' }: { className?: string }) {
  return (
    <p
      className={`text-vz-gray m-0 border-vz-rule border-t pt-4 text-[13px] leading-[1.45] ${className}`}
    >
      General information only. Nothing on this page constitutes personalised investment, tax or
      legal advice. Helfenstein Group does not hold client assets; all custody stays with the bank
      you choose, under your control. Decisions should be based on your own circumstances and,
      where appropriate, on a written analysis from a qualified adviser.
    </p>
  );
}
