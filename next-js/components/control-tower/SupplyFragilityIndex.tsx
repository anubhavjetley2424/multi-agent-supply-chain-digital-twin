"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

const fragilityData = [{ name: "Fragility", value: 71, fill: "#ff00ff" }];

const drivers = [
  { name: "Cold-chain volatility", score: 79 },
  { name: "Supplier concentration", score: 68 },
  { name: "Port congestion", score: 64 },
  { name: "Carrier reliability", score: 74 },
];

export function SupplyFragilityIndex() {
  return (
    <div className="grid h-full grid-rows-[1fr_auto] gap-3">
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/55 p-3">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="55%"
            innerRadius="45%"
            outerRadius="90%"
            barSize={24}
            data={fragilityData}
            startAngle={220}
            endAngle={-40}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar background dataKey="value" cornerRadius={10} />
            <text x="50%" y="52%" textAnchor="middle" dominantBaseline="middle" className="fill-fuchsia-300 text-4xl font-semibold">
              71
            </text>
            <text x="50%" y="64%" textAnchor="middle" dominantBaseline="middle" className="fill-zinc-400 text-xs uppercase tracking-[0.12em]">
              Fragility Index
            </text>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <ul className="grid gap-2">
        {drivers.map((driver) => (
          <li key={driver.name} className="rounded-lg border border-zinc-800 bg-zinc-900/45 px-3 py-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-300">{driver.name}</span>
              <span className="text-cyan-300">{driver.score}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
