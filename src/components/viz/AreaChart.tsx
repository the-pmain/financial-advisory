import { useId } from "react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ReferenceDot,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatChf } from "../../lib/format.ts";

type Point = { month: string; value: number };

function NavTooltip({
  month,
  value,
  currency,
}: {
  month: string;
  value: number;
  currency: string;
}) {
  return (
    <div className="viz-tooltip">
      <p className="viz-tooltip__label">{month}</p>
      <p className="viz-tooltip__value">
        {currency} {formatChf(value)}
      </p>
    </div>
  );
}

function readTooltipValue(raw: unknown): number | null {
  const value = typeof raw === "number" ? raw : Number(Array.isArray(raw) ? raw[0] : raw);
  return Number.isFinite(value) ? value : null;
}

export function AreaChart({
  series,
  label,
  currency,
}: {
  series: readonly Point[];
  label: string;
  currency: string;
}) {
  const fillId = useId().replace(/:/g, "");
  const data = series.map((point) => ({ month: point.month, value: point.value }));
  const last = data[data.length - 1];
  if (data.length < 2 || !last) return null;

  return (
    <div className="viz-area" role="img" aria-label={label}>
      <RechartsAreaChart
        data={data}
        responsive
        width="100%"
        height="100%"
        margin={{ top: 10, right: 18, left: 2, bottom: 2 }}
        cursor="crosshair"
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-gold-500)" stopOpacity={0.22} />
            <stop offset="100%" stopColor="var(--color-cream-100)" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid
          vertical={false}
          stroke="var(--color-border-soft)"
          strokeWidth={1}
        />
        <XAxis
          dataKey="month"
          interval="preserveStartEnd"
          minTickGap={36}
          tickLine={false}
          tickMargin={8}
          padding={{ left: 6, right: 14 }}
          axisLine={{ stroke: "var(--color-border)", strokeWidth: 1 }}
          tick={{
            fill: "var(--color-muted)",
            fontSize: 12,
            fontFamily: "var(--font-sans)",
            letterSpacing: "0.011em",
          }}
        />
        <YAxis hide domain={["dataMin - 8000", "dataMax + 8000"]} />
        <Tooltip
          cursor={{ stroke: "var(--color-border)", strokeWidth: 1 }}
          offset={12}
          allowEscapeViewBox={{ x: true, y: true }}
          wrapperStyle={{ outline: "none" }}
          content={({ active, payload, label }) => {
            const value = readTooltipValue(payload[0]?.value);
            if (!active || value == null) return null;
            return <NavTooltip month={String(label ?? "")} value={value} currency={currency} />;
          }}
        />
        <Area
          type="linear"
          dataKey="value"
          name={currency}
          stroke="var(--color-gold-500)"
          strokeWidth={1.75}
          fill={`url(#${fillId})`}
          dot={false}
          activeDot={{
            r: 4,
            fill: "var(--color-gold-500)",
            stroke: "var(--color-elevated)",
            strokeWidth: 2,
          }}
          isAnimationActive
          animationDuration={420}
          animationEasing="ease-out"
        />
        <ReferenceDot
          x={last.month}
          y={last.value}
          r={3.5}
          fill="var(--color-gold-500)"
          stroke="none"
        />
      </RechartsAreaChart>
    </div>
  );
}
