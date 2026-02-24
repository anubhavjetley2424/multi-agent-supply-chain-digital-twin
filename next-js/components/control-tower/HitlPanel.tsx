"use client";

import { Check, X } from "lucide-react";

const queue = [
  {
    id: "REQ-101",
    message: "Finance Agent requests 5% price hike on VET-SKU-001",
    priority: "High",
  },
  {
    id: "REQ-102",
    message: "Coordinator suggests reroute for O-40281 due to delay risk",
    priority: "Medium",
  },
  {
    id: "REQ-103",
    message: "Planner proposes +2 safety stock for Customer North Hub",
    priority: "Low",
  },
];

export function HitlPanel() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden">
      <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-xs text-zinc-300">
        <span>Pending approvals</span>
        <span className="text-[#ff00ff]">{queue.length} active</span>
      </div>
      <ul className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
        {queue.map((item) => (
          <li key={item.id} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3">
            <p className="mb-1 text-[11px] uppercase tracking-[0.14em] text-zinc-400">
              {item.id} | {item.priority}
            </p>
            <p className="mb-3 text-sm text-zinc-100">{item.message}</p>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-1 rounded-md border border-[#39ff14] px-2 py-1 text-xs text-[#39ff14] transition hover:bg-[#39ff14]/10">
                <Check className="h-3.5 w-3.5" />
                Approve
              </button>
              <button className="inline-flex items-center gap-1 rounded-md border border-[#ff003c] px-2 py-1 text-xs text-[#ff003c] transition hover:bg-[#ff003c]/10">
                <X className="h-3.5 w-3.5" />
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
