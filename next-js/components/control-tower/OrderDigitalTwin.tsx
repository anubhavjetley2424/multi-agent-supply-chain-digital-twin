"use client";

import Link from "next/link";
import { PathLayer, ScatterplotLayer } from "@deck.gl/layers";
import DeckGL from "@deck.gl/react";
import { ArrowLeft, CloudRain, Cpu, Snowflake, Thermometer, Truck } from "lucide-react";
import { useMemo } from "react";
import { Map } from "react-map-gl/mapbox";

type OrderDigitalTwinProps = {
  orderId: string;
};

type InventoryRow = {
  material: string;
  allocated: number;
  unit: string;
  status: "Ready" | "In Transit" | "Backfill";
};

const routePath: [number, number][] = [
  [-1.929, 52.486],
  [-1.921, 52.489],
  [-1.913, 52.494],
  [-1.904, 52.497],
  [-1.897, 52.491],
  [-1.89, 52.486],
];

const inventoryRows: InventoryRow[] = [
  { material: "Reagent Pack A", allocated: 320, unit: "units", status: "Ready" },
  { material: "Sterile Vials", allocated: 860, unit: "pcs", status: "In Transit" },
  { material: "Cooling Gel", allocated: 120, unit: "kg", status: "Ready" },
  { material: "Label Set", allocated: 460, unit: "sheets", status: "Backfill" },
];

const phases = [
  { name: "Intake", eta: "08:10", done: true },
  { name: "Production", eta: "10:45", done: true },
  { name: "QA", eta: "12:20", done: false, active: true },
  { name: "Dispatch", eta: "14:05", done: false },
];

const statusStyles: Record<InventoryRow["status"], string> = {
  Ready: "text-[#39ff14] border-[#39ff14]/40",
  "In Transit": "text-cyan-300 border-cyan-300/40",
  Backfill: "text-fuchsia-300 border-fuchsia-300/40",
};

const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

export function OrderDigitalTwin({ orderId }: OrderDigitalTwinProps) {
  const layers = useMemo(
    () => [
      new PathLayer({
        id: "order-route-path",
        data: [{ path: routePath }],
        getPath: (d: { path: [number, number][] }) => d.path,
        getColor: [0, 243, 255],
        widthMinPixels: 5,
      }),
      new ScatterplotLayer({
        id: "order-waypoints",
        data: routePath,
        getPosition: (d: [number, number]) => d,
        getFillColor: [255, 0, 255],
        getRadius: 22,
        radiusMinPixels: 5,
      }),
    ],
    [],
  );

  return (
    <main className="min-h-screen overflow-y-auto bg-zinc-950 px-4 py-4 text-zinc-100">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-4 lg:grid-cols-12">
        <header className="glass-panel relative overflow-hidden rounded-2xl border border-zinc-800/80 p-4 lg:col-span-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">Order Digital Twin</p>
              <div className="mt-1 flex items-center gap-3">
                <h1 className="text-2xl font-semibold text-cyan-300">{orderId}</h1>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/60 px-2 py-0.5 text-xs uppercase tracking-[0.12em] text-[#39ff14]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#39ff14]" />
                  Live
                </span>
              </div>
            </div>

            <Link href="/" className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-300 transition hover:border-cyan-400 hover:text-cyan-300">
              <ArrowLeft className="h-4 w-4" />
              Back to Command Center
            </Link>
          </div>
        </header>

        <section className="glass-panel rounded-2xl border border-zinc-800/80 p-4 lg:col-span-4">
          <p className="mb-3 text-xs uppercase tracking-[0.14em] text-zinc-400">Truck Specs</p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2"><Truck className="h-4 w-4 text-cyan-300" />Truck No: TRK-2298</p>
            <p>Model: Volvo FM Refrigerated 6x2</p>
            <p>Company: TransMed Logistics UK</p>
          </div>
        </section>

        <section className="glass-panel rounded-2xl border border-zinc-800/80 p-4 lg:col-span-4">
          <p className="mb-3 text-xs uppercase tracking-[0.14em] text-zinc-400">Live Weather and Route</p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2"><CloudRain className="h-4 w-4 text-fuchsia-300" />Light rain, 7C, crosswind 18 km/h</p>
            <p>Road Surface: Wet but stable</p>
            <p>ETA Confidence: 92.4%</p>
          </div>
        </section>

        <section className="glass-panel rounded-2xl border border-zinc-800/80 p-4 lg:col-span-4">
          <p className="mb-3 text-xs uppercase tracking-[0.14em] text-zinc-400">Machine Health and Cold Chain</p>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2"><Cpu className="h-4 w-4 text-cyan-300" />Engine load: 63%, battery health normal</p>
            <p className="flex items-center gap-2"><Thermometer className="h-4 w-4 text-[#39ff14]" />Compartment temp: 2.8C</p>
            <p className="flex items-center gap-2"><Snowflake className="h-4 w-4 text-[#39ff14]" />Cold-chain compliance: In range</p>
          </div>
        </section>

        <section className="glass-panel rounded-2xl border border-zinc-800/80 p-4 lg:col-span-8">
          <p className="mb-3 text-xs uppercase tracking-[0.14em] text-zinc-400">Street-Level Route Twin</p>
          <div className="h-[420px] overflow-hidden rounded-xl border border-zinc-800">
            <DeckGL
              initialViewState={{ longitude: -1.911, latitude: 52.491, zoom: 12.5, pitch: 52, bearing: -18 }}
              controller
              layers={layers}
              style={{ width: "100%", height: "100%" }}
            >
              <Map mapStyle={MAP_STYLE} mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} attributionControl={false} />
            </DeckGL>
          </div>
        </section>

        <section className="glass-panel rounded-2xl border border-zinc-800/80 p-4 lg:col-span-4">
          <p className="mb-3 text-xs uppercase tracking-[0.14em] text-zinc-400">CSM Inventory Allocation</p>
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/55">
            <div className="grid grid-cols-3 border-b border-zinc-800 px-3 py-2 text-[11px] uppercase tracking-[0.1em] text-zinc-400">
              <span>Material</span>
              <span>Allocated</span>
              <span>Status</span>
            </div>
            {inventoryRows.map((item) => (
              <div key={item.material} className="grid grid-cols-3 items-center border-b border-zinc-900 px-3 py-2 text-sm">
                <span>{item.material}</span>
                <span>{item.allocated} {item.unit}</span>
                <span>
                  <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs ${statusStyles[item.status]}`}>{item.status}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-2xl border border-zinc-800/80 p-4 lg:col-span-12">
          <p className="mb-3 text-xs uppercase tracking-[0.14em] text-zinc-400">Phase Progression Stepper</p>
          <div className="space-y-3">
            {phases.map((phase, index) => (
              <div key={phase.name} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`mt-1 inline-block h-3.5 w-3.5 rounded-full border ${
                      phase.done
                        ? "border-[#39ff14] bg-[#39ff14]"
                        : phase.active
                          ? "border-cyan-300 bg-cyan-300"
                          : "border-zinc-600 bg-zinc-800"
                    }`}
                  />
                  {index < phases.length - 1 ? <span className="mt-1 h-8 w-px bg-zinc-700" /> : null}
                </div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/45 px-3 py-2">
                  <p className="text-sm text-zinc-100">{phase.name}</p>
                  <p className="text-xs uppercase tracking-[0.1em] text-zinc-400">ETA {phase.eta}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
