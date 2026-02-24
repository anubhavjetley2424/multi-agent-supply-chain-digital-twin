type ValueEvent = {
  id: string;
  detail: string;
  amount: string;
  agent: string;
};

const events: ValueEvent[] = [
  { id: "VAL-301", detail: "Logistics rerouted around M6 disruption", amount: "+$12k", agent: "Coordinator" },
  { id: "VAL-302", detail: "Procurement split order reduced rush premium", amount: "+$8.4k", agent: "Finance" },
  { id: "VAL-303", detail: "Predictive QA intervention prevented scrap batch", amount: "+$6.1k", agent: "Analyst" },
  { id: "VAL-304", detail: "Dynamic allocation improved truck fill-rate", amount: "+$10.7k", agent: "Planner" },
];

export function CommercialImpactHub() {
  return (
    <div className="h-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/55 p-3">
      <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-zinc-400">
        <span>Value Realized</span>
        <span className="text-[#39ff14]">+$37.2k this cycle</span>
      </div>
      <ul className="space-y-2 overflow-y-auto">
        {events.map((event) => (
          <li key={event.id} className="rounded-lg border border-zinc-800 bg-zinc-900/45 p-3">
            <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.1em] text-zinc-500">
              <span>{event.id}</span>
              <span>{event.agent}</span>
            </div>
            <p className="text-sm text-zinc-200">{event.detail}</p>
            <p className="mt-1 text-sm font-semibold text-[#39ff14]">{event.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
