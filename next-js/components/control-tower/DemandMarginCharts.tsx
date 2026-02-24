"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const inventorySeries = [
  { day: "Mon", actual: 96, projected: 98 },
  { day: "Tue", actual: 93, projected: 97 },
  { day: "Wed", actual: 89, projected: 95 },
  { day: "Thu", actual: 85, projected: 93 },
  { day: "Fri", actual: 81, projected: 91 },
  { day: "Sat", actual: 79, projected: 90 },
  { day: "Sun", actual: 76, projected: 88 },
];

export function DemandMarginCharts() {
  return (
    <div className="h-full rounded-xl border border-zinc-800 bg-zinc-950/55 p-2">
      <p className="mb-2 text-xs uppercase tracking-[0.1em] text-zinc-400">Actual Inventory vs AI Projected Supply</p>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={inventorySeries} margin={{ top: 8, right: 4, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#00f3ff" stopOpacity={0.04} />
            </linearGradient>
            <linearGradient id="projectedFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff00ff" stopOpacity={0.28} />
              <stop offset="95%" stopColor="#ff00ff" stopOpacity={0.04} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#27272a" vertical={false} />
          <XAxis dataKey="day" stroke="#a1a1aa" fontSize={11} />
          <YAxis stroke="#71717a" fontSize={11} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111217",
              border: "1px solid #27272a",
              color: "#e4e4e7",
              fontSize: "12px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "11px", color: "#d4d4d8" }} />
          <Area
            type="monotone"
            dataKey="actual"
            name="Actual Inventory"
            stroke="#00f3ff"
            strokeWidth={2.2}
            fill="url(#actualFill)"
          />
          <Area
            type="monotone"
            dataKey="projected"
            name="AI Projected Supply"
            stroke="#ff00ff"
            strokeWidth={2.2}
            fill="url(#projectedFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
