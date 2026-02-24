"use client";

type Intervention = {
  id: string;
  event: string;
  savings: string;
  agent: string;
  timestamp: string;
};

const interventions: Intervention[] = [
  {
    id: "INT-441",
    event: "Logistics rerouted away from congestion corridor",
    savings: "+$14k Annual Savings",
    agent: "Coordinator",
    timestamp: "09:14 UTC",
  },
  {
    id: "INT-442",
    event: "Contract renegotiation auto-triggered on carrier SLA breach",
    savings: "+$22k Annual Savings",
    agent: "Finance",
    timestamp: "09:18 UTC",
  },
  {
    id: "INT-443",
    event: "Inventory rebalance reduced emergency cold-chain shipments",
    savings: "+$9k Annual Savings",
    agent: "Planner",
    timestamp: "09:24 UTC",
  },
  {
    id: "INT-444",
    event: "Demand signal corrected for overstocked SKU-013",
    savings: "+$6k Annual Savings",
    agent: "Analyst",
    timestamp: "09:29 UTC",
  },
];

export function ImpactHub() {
  return (
    <div className="h-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/55">
      <div className="border-b border-zinc-800 px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-zinc-400">
        Agent Interventions
      </div>
      <ul className="h-[calc(100%-2.1rem)] space-y-2 overflow-y-auto p-3">
        {interventions.map((item) => (
          <li key={item.id} className="rounded-lg border border-zinc-800 bg-zinc-900/45 p-3">
            <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.1em] text-zinc-500">
              <span>{item.id}</span>
              <span>{item.timestamp}</span>
            </div>
            <p className="text-sm text-zinc-200">{item.event}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.1em] text-cyan-300">{item.agent}</span>
              <span className="text-sm font-semibold text-[#39ff14]">{item.savings}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
