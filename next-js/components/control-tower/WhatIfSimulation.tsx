"use client";

import { useMemo, useState } from "react";

type SimulationResult = {
  productionDelta: string;
  marginImpact: string;
  riskBand: string;
};

export function WhatIfSimulation() {
  const [demandSpike, setDemandSpike] = useState(12);
  const [prioritySku, setPrioritySku] = useState("VET-SKU-007");
  const [leadTimeShift, setLeadTimeShift] = useState(3);

  const result = useMemo<SimulationResult>(() => {
    const productionDelta = `+${Math.round(demandSpike * 1.6)} pallets/day`;
    const marginImpact = `${(demandSpike * 0.28 - leadTimeShift * 0.35).toFixed(1)}%`;
    const riskBand = demandSpike > 18 || leadTimeShift > 5 ? "Elevated" : demandSpike > 10 ? "Guarded" : "Stable";

    return { productionDelta, marginImpact, riskBand };
  }, [demandSpike, leadTimeShift]);

  return (
    <div className="grid h-full gap-3 rounded-xl border border-zinc-800 bg-zinc-950/55 p-3">
      <div className="grid gap-2 sm:grid-cols-3">
        <label className="grid gap-1 text-xs uppercase tracking-[0.1em] text-zinc-400">
          Demand Spike %
          <input
            type="number"
            value={demandSpike}
            onChange={(e) => setDemandSpike(Number(e.target.value))}
            className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1.5 text-sm text-zinc-100"
          />
        </label>

        <label className="grid gap-1 text-xs uppercase tracking-[0.1em] text-zinc-400">
          Priority SKU
          <input
            value={prioritySku}
            onChange={(e) => setPrioritySku(e.target.value)}
            className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1.5 text-sm text-zinc-100"
          />
        </label>

        <label className="grid gap-1 text-xs uppercase tracking-[0.1em] text-zinc-400">
          Lead Time Shift (days)
          <input
            type="number"
            value={leadTimeShift}
            onChange={(e) => setLeadTimeShift(Number(e.target.value))}
            className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1.5 text-sm text-zinc-100"
          />
        </label>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/45 p-3">
          <p className="text-[11px] uppercase tracking-[0.1em] text-zinc-500">Production Delta</p>
          <p className="text-lg text-cyan-300">{result.productionDelta}</p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/45 p-3">
          <p className="text-[11px] uppercase tracking-[0.1em] text-zinc-500">Margin Impact</p>
          <p className="text-lg text-[#39ff14]">{result.marginImpact}</p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/45 p-3">
          <p className="text-[11px] uppercase tracking-[0.1em] text-zinc-500">Risk Band</p>
          <p className="text-lg text-fuchsia-300">{result.riskBand}</p>
        </div>
      </div>

      <p className="text-xs text-zinc-400">
        Simulation focuses on <span className="text-zinc-200">{prioritySku}</span> under projected demand shock.
      </p>
    </div>
  );
}
