"use client";

import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TooltipPayload = {
  name: string;
  value: number | string;
};

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-zinc-200 backdrop-blur-sm">
      <p className="mb-1 text-zinc-400">{label}</p>
      {payload.map((entry) => (
        <p key={`${entry.name}-${entry.value}`}>
          <span className="text-zinc-400">{entry.name}:</span> {entry.value}
        </p>
      ))}
    </div>
  );
}

const subtleGrid = <CartesianGrid stroke="#27272a" vertical={false} />;

const inventoryHealth = [
  { month: "Jan", dsi: 46, stockout: 3.2 },
  { month: "Feb", dsi: 44, stockout: 3.7 },
  { month: "Mar", dsi: 41, stockout: 2.9 },
  { month: "Apr", dsi: 39, stockout: 2.4 },
  { month: "May", dsi: 37, stockout: 2.2 },
  { month: "Jun", dsi: 35, stockout: 1.8 },
];

const orderMgmt = [
  { month: "Jan", otd: 91, cycle: 8.2 },
  { month: "Feb", otd: 92, cycle: 7.9 },
  { month: "Mar", otd: 93, cycle: 7.4 },
  { month: "Apr", otd: 94, cycle: 7.1 },
  { month: "May", otd: 95, cycle: 6.8 },
  { month: "Jun", otd: 96, cycle: 6.4 },
];

const logisticsCost = [
  { carrier: "FedEx", base: 5.8, fuel: 1.6 },
  { carrier: "Internal Fleet", base: 4.9, fuel: 1.1 },
  { carrier: "Maersk", base: 6.4, fuel: 1.9 },
  { carrier: "DHL", base: 5.5, fuel: 1.5 },
];

const suppliers = [
  { name: "S-01", leadTime: 6, defect: 1.2 },
  { name: "S-02", leadTime: 12, defect: 2.9 },
  { name: "S-03", leadTime: 9, defect: 1.8 },
  { name: "S-04", leadTime: 15, defect: 3.4 },
  { name: "S-05", leadTime: 7, defect: 1.4 },
  { name: "S-06", leadTime: 10, defect: 2.1 },
];

const financialImpact = [
  { month: "Jan", c2c: 68, carrying: 4.4 },
  { month: "Feb", c2c: 66, carrying: 4.3 },
  { month: "Mar", c2c: 64, carrying: 4.1 },
  { month: "Apr", c2c: 61, carrying: 3.9 },
  { month: "May", c2c: 59, carrying: 3.7 },
  { month: "Jun", c2c: 56, carrying: 3.6 },
];

const demandForecast = [
  { week: "W1", actual: 112, forecast: null },
  { week: "W2", actual: 118, forecast: null },
  { week: "W3", actual: 121, forecast: null },
  { week: "W4", actual: 116, forecast: null },
  { week: "W5", actual: 123, forecast: 123 },
  { week: "W6", actual: null, forecast: 127 },
  { week: "W7", actual: null, forecast: 132 },
  { week: "W8", actual: null, forecast: 129 },
  { week: "W9", actual: null, forecast: 135 },
  { week: "W10", actual: null, forecast: 138 },
];

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-3">
      <p className="mb-2 text-xs uppercase tracking-[0.1em] text-zinc-400">{title}</p>
      <div className="h-[250px]">
        {children}
      </div>
    </div>
  );
}

export function AnalyticsSuite() {
  return (
    <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ChartCard title="Inventory Health">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={inventoryHealth}>
            {subtleGrid}
            <XAxis dataKey="month" stroke="#a1a1aa" fontSize={11} />
            <YAxis yAxisId="left" stroke="#71717a" fontSize={11} />
            <YAxis yAxisId="right" orientation="right" stroke="#71717a" fontSize={11} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Bar yAxisId="right" dataKey="stockout" fill="#ff00ff" name="Stockout Rate %" radius={[4, 4, 0, 0]} />
            <Line yAxisId="left" dataKey="dsi" stroke="#00f3ff" strokeWidth={2.2} name="DSI" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Order Management">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={orderMgmt}>
            {subtleGrid}
            <XAxis dataKey="month" stroke="#a1a1aa" fontSize={11} />
            <YAxis yAxisId="left" stroke="#71717a" fontSize={11} domain={[88, 100]} />
            <YAxis yAxisId="right" orientation="right" stroke="#71717a" fontSize={11} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <ReferenceLine yAxisId="left" y={95} stroke="#00f3ff" strokeDasharray="4 4" label={{ value: "Target 95%", fill: "#67e8f9", fontSize: 10 }} />
            <Area yAxisId="left" type="monotone" dataKey="otd" name="On-Time Delivery %" stroke="#39ff14" fill="#39ff14" fillOpacity={0.16} />
            <Line yAxisId="right" type="monotone" dataKey="cycle" name="Order Cycle Time (Days)" stroke="#ff00ff" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Logistics Cost">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={logisticsCost}>
            {subtleGrid}
            <XAxis dataKey="carrier" stroke="#a1a1aa" fontSize={11} />
            <YAxis stroke="#71717a" fontSize={11} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Bar dataKey="base" stackId="cost" fill="#00f3ff" name="Base Rate" radius={[4, 4, 0, 0]} />
            <Bar dataKey="fuel" stackId="cost" fill="#ff00ff" name="Fuel Surcharge" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Supplier Performance">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            {subtleGrid}
            <XAxis type="number" dataKey="leadTime" name="Lead Time" unit="d" stroke="#a1a1aa" fontSize={11} />
            <YAxis type="number" dataKey="defect" name="Defect Rate" unit="%" stroke="#71717a" fontSize={11} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<ChartTooltip />} />
            <ReferenceArea x1={4} x2={8} y1={0.8} y2={1.8} fill="#39ff14" fillOpacity={0.1} />
            <Scatter name="Suppliers" data={suppliers} fill="#00f3ff" />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Financial Impact">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={financialImpact}>
            {subtleGrid}
            <XAxis dataKey="month" stroke="#a1a1aa" fontSize={11} />
            <YAxis yAxisId="left" stroke="#71717a" fontSize={11} />
            <YAxis yAxisId="right" orientation="right" stroke="#71717a" fontSize={11} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Line yAxisId="left" dataKey="c2c" name="Cash-to-Cash Cycle Time" stroke="#00f3ff" strokeWidth={2.3} dot={false} />
            <Line yAxisId="right" dataKey="carrying" name="Carrying Cost of Inventory" stroke="#ff00ff" strokeWidth={2.3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Demand Forecast">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={demandForecast}>
            {subtleGrid}
            <XAxis dataKey="week" stroke="#a1a1aa" fontSize={11} />
            <YAxis stroke="#71717a" fontSize={11} />
            <Tooltip content={<ChartTooltip />} />
            <Legend wrapperStyle={{ fontSize: "11px" }} />
            <Area type="monotone" dataKey="actual" name="Actual Sales" stroke="#00f3ff" fill="#00f3ff" fillOpacity={0.18} strokeWidth={2.2} />
            <Area type="monotone" dataKey="forecast" name="AI Forecasted Demand" stroke="#ff00ff" strokeDasharray="6 4" fill="#ff00ff" fillOpacity={0.1} strokeWidth={2.2} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
