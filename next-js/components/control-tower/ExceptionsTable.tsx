const rows = [
  { orderId: "ORD-91821", category: "Cold Chain", severity: "High", status: "Escalated" },
  { orderId: "ORD-91844", category: "Pricing", severity: "Medium", status: "Investigating" },
  { orderId: "ORD-91902", category: "Inventory", severity: "High", status: "Blocked" },
  { orderId: "ORD-91970", category: "Route", severity: "Low", status: "Monitoring" },
  { orderId: "ORD-92012", category: "Compliance", severity: "Medium", status: "Assigned" },
];

export function ExceptionsTable() {
  return (
    <div className="h-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/55">
      <div className="grid grid-cols-4 border-b border-zinc-800 px-3 py-2 text-[11px] uppercase tracking-[0.1em] text-zinc-400">
        <span>Order ID</span>
        <span>Category</span>
        <span>Severity</span>
        <span>Status</span>
      </div>
      <div className="h-[calc(100%-2.2rem)] overflow-y-auto">
        {rows.map((row) => (
          <div
            key={row.orderId}
            className={`grid grid-cols-4 items-center border-b border-zinc-900 px-3 py-2 text-sm text-zinc-200 transition ${
              row.severity === "High" ? "shadow-[inset_0_0_18px_rgba(255,0,60,0.12)] text-[#ff5f80]" : ""
            }`}
          >
            <span className="font-mono text-xs">{row.orderId}</span>
            <span>{row.category}</span>
            <span>{row.severity}</span>
            <span className="text-zinc-300">{row.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
