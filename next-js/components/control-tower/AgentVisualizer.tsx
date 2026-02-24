"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type AgentNodeData = {
  label: string;
};

function AgentNode({ data, id }: NodeProps<Node<AgentNodeData>>) {
  return (
    <div className={`agent-node ${id}`}>
      <Handle type="target" position={Position.Top} className="!h-2 !w-2 !border-cyan-300 !bg-zinc-900" />
      <span>{data.label}</span>
      <Handle type="source" position={Position.Bottom} className="!h-2 !w-2 !border-cyan-300 !bg-zinc-900" />
    </div>
  );
}

const baseNodes: Node<AgentNodeData>[] = [
  { id: "planner", position: { x: 60, y: 70 }, data: { label: "Planner" }, type: "agent" },
  { id: "analyst", position: { x: 270, y: 20 }, data: { label: "Analyst" }, type: "agent" },
  { id: "coordinator", position: { x: 270, y: 140 }, data: { label: "Coordinator" }, type: "agent" },
  { id: "finance", position: { x: 490, y: 70 }, data: { label: "Finance" }, type: "agent" },
  { id: "qdrant", position: { x: 690, y: 70 }, data: { label: "Qdrant DB" }, type: "agent" },
];

const edges: Edge[] = [
  { id: "e1", source: "planner", target: "analyst", animated: true, style: { stroke: "#00f3ff", strokeDasharray: "4 4" } },
  { id: "e2", source: "planner", target: "coordinator", animated: true, style: { stroke: "#00f3ff", strokeDasharray: "4 4" } },
  { id: "e3", source: "analyst", target: "finance", animated: true, style: { stroke: "#ff00ff", strokeDasharray: "4 4" } },
  { id: "e4", source: "coordinator", target: "finance", animated: true, style: { stroke: "#00f3ff", strokeDasharray: "4 4" } },
  { id: "e5", source: "finance", target: "qdrant", animated: true, style: { stroke: "#39ff14", strokeDasharray: "4 4" } },
];

const agentIds = ["planner", "analyst", "coordinator", "finance", "qdrant"];

export function AgentVisualizer() {
  const [processingIds, setProcessingIds] = useState<string[]>(["planner"]);

  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...agentIds].sort(() => Math.random() - 0.5);
      const count = Math.random() > 0.45 ? 2 : 1;
      setProcessingIds(shuffled.slice(0, count));
    }, 2100);

    return () => clearInterval(interval);
  }, []);

  const nodes = useMemo(() => {
    return baseNodes.map((node) => ({
      ...node,
      className: processingIds.includes(node.id) ? "processing" : "",
    }));
  }, [processingIds]);

  return (
    <div className="h-full rounded-xl border border-zinc-800 bg-zinc-950/70">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{ agent: AgentNode }}
        fitView
        fitViewOptions={{ padding: 0.22 }}
        minZoom={0.65}
        maxZoom={1.2}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#27272a" gap={24} size={1} />
        <Controls showInteractive={false} className="!bg-zinc-900/90 !text-zinc-300" />
      </ReactFlow>
    </div>
  );
}
