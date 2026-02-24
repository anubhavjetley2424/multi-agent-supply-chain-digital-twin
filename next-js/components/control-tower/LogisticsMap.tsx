"use client";

import { useMemo, useState } from "react";
import DeckGL from "@deck.gl/react";
import { ArcLayer } from "@deck.gl/layers";
import { Map } from "react-map-gl/mapbox";

type ShipmentArc = {
  id: string;
  from: [number, number];
  to: [number, number];
  status: "optimal" | "delayed";
};

// Focused on Sydney Hubs (Port Botany, Sydney Airport, Western Sydney)
const liveArcs: ShipmentArc[] = [
  { id: "syd-1", from: [151.2093, -33.8688], to: [151.0011, -33.815], status: "optimal" }, // CBD to Parramatta
  { id: "syd-2", from: [151.215, -33.961], to: [150.91, -33.74], status: "delayed" },    // Port Botany to Blacktown
  { id: "syd-3", from: [151.215, -33.961], to: [151.18, -33.8], status: "optimal" },    // Port Botany to North Sydney
  { id: "syd-4", from: [151.2093, -33.8688], to: [150.84, -34.02], status: "optimal" },  // CBD to Campbelltown
  { id: "syd-5", from: [151.18, -33.95], to: [150.69, -33.75], status: "delayed" },     // Mascot to Penrith
  { id: "syd-6", from: [151.215, -33.961], to: [151.25, -33.42], status: "optimal" },   // Port to Gosford
];

const futureArcs: ShipmentArc[] = [
  { id: "fut-1", from: [150.76, -33.89], to: [151.21, -33.87], status: "optimal" },     // WSI Airport to CBD
  { id: "fut-2", from: [150.76, -33.89], to: [150.91, -33.74], status: "optimal" },     // WSI Airport to Blacktown
  { id: "fut-3", from: [150.76, -33.89], to: [150.84, -34.02], status: "optimal" },     // WSI Airport to Campbelltown
  { id: "fut-4", from: [151.215, -33.961], to: [150.76, -33.89], status: "optimal" },   // Port Botany to WSI Airport
  { id: "fut-5", from: [150.76, -33.89], to: [151.6, -32.92], status: "optimal" },      // WSI Airport to Newcastle
  { id: "fut-6", from: [151.0011, -33.815], to: [150.76, -33.89], status: "optimal" },  // Parramatta to WSI Airport
  { id: "fut-7", from: [150.76, -33.89], to: [151.1, -34.42], status: "optimal" },      // WSI Airport to Wollongong
];

const initialViewState = {
  longitude: 151.0,
  latitude: -33.85,
  zoom: 9.5,
  pitch: 45,
  bearing: 0,
};

const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

export function LogisticsMap() {
  const [mode, setMode] = useState<"live" | "future">("live");

  const layers = useMemo(() => {
    const data = mode === "live" ? liveArcs : futureArcs;

    return [
      new ArcLayer<ShipmentArc>({
        id: "shipments-arcs",
        data,
        getSourcePosition: (d) => d.from,
        getTargetPosition: (d) => d.to,
        getSourceColor: (d) => (d.status === "optimal" ? [0, 243, 255] : [255, 0, 255]),
        getTargetColor: (d) => (d.status === "optimal" ? [57, 255, 20] : [255, 0, 60]),
        getWidth: 3,
        // Adding dynamic height based on distance to make the 3D effect pop
        getHeight: (d) => {
          const dist = Math.sqrt(Math.pow(d.to[0] - d.from[0], 2) + Math.pow(d.to[1] - d.from[1], 2));
          return dist * 2; 
        },
        pickable: true,
      }),
    ];
  }, [mode]);

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl border border-zinc-800">
      <div className="absolute right-3 top-3 z-10 flex items-center rounded-md border border-zinc-700 bg-zinc-950/85 p-1 text-[11px] uppercase tracking-[0.1em] shadow-xl">
        <button
          onClick={() => setMode("live")}
          className={`rounded px-3 py-1.5 transition ${mode === "live" ? "bg-cyan-500/20 text-cyan-300" : "text-zinc-400 hover:text-zinc-200"}`}
        >
          Live Network
        </button>
        <button
          onClick={() => setMode("future")}
          className={`rounded px-3 py-1.5 transition ${mode === "future" ? "bg-fuchsia-500/20 text-fuchsia-300" : "text-zinc-400 hover:text-zinc-200"}`}
        >
          Western Syd 2026
        </button>
      </div>

      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={layers}
        getTooltip={({ object }: any) => object && `${object.id}: ${object.status}`}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <Map 
          reuseMaps 
          mapStyle={MAP_STYLE} 
          attributionControl={false} 
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN} 
        />
      </DeckGL>
    </div>
  );
}