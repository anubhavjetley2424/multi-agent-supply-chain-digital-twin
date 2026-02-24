"use client";

import { DashboardGrid } from "@/components/control-tower/DashboardGrid";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-zinc-950 px-4 py-4 text-zinc-100">
      <DashboardGrid />
    </main>
  );
}
