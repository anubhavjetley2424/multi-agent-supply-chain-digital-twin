"use client";

import type { ReactNode } from "react";
import { Activity, AlertTriangle, Bot, ChartColumnBig, Layers, MapPinned, ShieldAlert, Workflow } from "lucide-react";
import { AgentChat } from "@/components/control-tower/AgentChat";
import { AgentVisualizer } from "@/components/control-tower/AgentVisualizer";
import { AnalyticsSuite } from "@/components/control-tower/AnalyticsSuite";
import { GlobalOrderLedger } from "@/components/control-tower/GlobalOrderLedger";
import { HitlPanel } from "@/components/control-tower/HitlPanel";
import { LogisticsMap } from "@/components/control-tower/LogisticsMap";
import { SupplyFragilityIndex } from "@/components/control-tower/SupplyFragilityIndex";
import { WhatIfSimulation } from "@/components/control-tower/WhatIfSimulation";

type PanelProps = {
  title: string;
  icon: ReactNode;
  className?: string;
  children: ReactNode;
};

function Panel({ title, icon, className = "", children }: PanelProps) {
  return (
    <section className={`glass-panel relative overflow-hidden rounded-2xl border border-zinc-800/80 p-4 ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,243,255,0.07),transparent_40%)]" />
      <header className="relative mb-3 flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-zinc-300">
        <span className="text-cyan-300">{icon}</span>
        <span>{title}</span>
      </header>
      <div className="relative h-[calc(100%-2rem)]">{children}</div>
    </section>
  );
}

export function DashboardGrid() {
  return (
    <div className="relative mx-auto grid max-w-[1800px] grid-cols-1 gap-4 lg:grid-cols-12">
      <Panel title="HITL Action Center" icon={<ShieldAlert className="h-4 w-4" />} className="min-h-[260px] lg:col-span-4">
        <HitlPanel />
      </Panel>

      <Panel title="Agent Network" icon={<Workflow className="h-4 w-4" />} className="min-h-[260px] lg:col-span-8">
        <AgentVisualizer />
      </Panel>

      <Panel title="Live Logistics 3D Map" icon={<MapPinned className="h-4 w-4" />} className="min-h-[420px] lg:col-span-8">
        <LogisticsMap />
      </Panel>

      <Panel
        title="Supply Chain Fragility Index"
        icon={<AlertTriangle className="h-4 w-4" />}
        className="min-h-[420px] lg:col-span-4"
      >
        <SupplyFragilityIndex />
      </Panel>

      <Panel title="Global Order Ledger" icon={<Layers className="h-4 w-4" />} className="min-h-[360px] lg:col-span-12">
        <GlobalOrderLedger />
      </Panel>

      <Panel title="Analytics Suite" icon={<ChartColumnBig className="h-4 w-4" />} className="min-h-[860px] lg:col-span-12">
        <AnalyticsSuite />
      </Panel>

      <Panel title="What-If Simulation" icon={<Activity className="h-4 w-4" />} className="min-h-[300px] lg:col-span-8">
        <WhatIfSimulation />
      </Panel>

      <Panel title="Orchestrator Chat" icon={<Bot className="h-4 w-4" />} className="min-h-[300px] lg:col-span-4">
        <AgentChat />
      </Panel>
    </div>
  );
}
