import Link from "next/link";

type LedgerRow = {
  orderId: string;
  customer: string;
  sku: string;
  phase: string;
  risk: "Low" | "Medium" | "High";
};

const rows: LedgerRow[] = [
  { orderId: "ORD-84219", customer: "Vetlab North", sku: "VET-SKU-001", phase: "Dispatch", risk: "Low" },
  { orderId: "ORD-84227", customer: "Clinix Midlands", sku: "VET-SKU-007", phase: "QA", risk: "Medium" },
  { orderId: "ORD-84233", customer: "PetCare Hub", sku: "VET-SKU-013", phase: "Production", risk: "High" },
  { orderId: "ORD-84241", customer: "Greenfield Animal", sku: "VET-SKU-004", phase: "Intake", risk: "Medium" },
  { orderId: "ORD-84258", customer: "RapidVet Channel", sku: "VET-SKU-011", phase: "Dispatch", risk: "Low" },
  { orderId: "ORD-84263", customer: "MediPaws", sku: "VET-SKU-016", phase: "Production", risk: "High" },
];

const riskStyles: Record<LedgerRow["risk"], string> = {
  Low: "border-[#39ff14]/50 text-[#39ff14]",
  Medium: "border-[#00f3ff]/50 text-[#00f3ff]",
  High: "border-[#ff00ff]/50 text-[#ff00ff]",
};

export function GlobalOrderLedger() {
  return (
    <div className="h-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/55">
      <div className="grid grid-cols-5 border-b border-zinc-800 px-3 py-2 text-[11px] uppercase tracking-[0.1em] text-zinc-400">
        <span>Order ID</span>
        <span>Customer</span>
        <span>SKU</span>
        <span>Current Phase</span>
        <span>Risk Level</span>
      </div>
      <div className="h-[calc(100%-2.2rem)] overflow-y-auto">
        {rows.map((row) => (
          <div key={row.orderId} className="grid grid-cols-5 items-center border-b border-zinc-900 px-3 py-2 text-sm text-zinc-200">
            <Link href={`/orders/${row.orderId}`} className="font-mono text-cyan-300 underline-offset-2 transition hover:text-cyan-200 hover:underline">
              {row.orderId}
            </Link>
            <span>{row.customer}</span>
            <span>{row.sku}</span>
            <span className="text-zinc-300">{row.phase}</span>
            <span>
              <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs uppercase tracking-[0.12em] ${riskStyles[row.risk]}`}>
                {row.risk}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
