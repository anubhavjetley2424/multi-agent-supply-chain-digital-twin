# 🚚 Multi-Agent Supply Chain OS (Palantir-Style)

### 🐾 Animal Medicine Manufacturer Digital Twin
**Enterprise Agentic Layer for Logistics, Planning & Finance**

https://github.com/user-attachments/assets/1538c108-0730-4dad-b532-a3c4853332a7

<table>
  <tr>
    <td width="50%"><img alt="Control Tower Dashboard" src="https://github.com/user-attachments/assets/d1e635d0-533a-4944-9dcf-10de4ddb8a81" width="100%" /></td>
    <td width="50%"><img alt="3D Map View" src="https://github.com/user-attachments/assets/c7507214-24bf-4ba6-897a-e27a3d99c388" width="100%" /></td>
  </tr>
  <tr>
    <td width="50%"><img alt="Agent Workflow" src="https://github.com/user-attachments/assets/144cb561-c380-49c9-b5c0-69461fc69e44" width="100%" /></td>
    <td width="50%"><img alt="Data Analytics" src="https://github.com/user-attachments/assets/820af265-5907-4bbb-ac80-bbc03140435b" width="100%" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img alt="Financial Impact Logging" src="https://github.com/user-attachments/assets/9be457f1-7a02-4783-b378-71aadaac0110" width="60%" /></td>
  </tr>
</table>

---

## 🌟 Executive Summary
**This project** is a full-scale Digital Twin + Agentic Operating System designed to mirror and optimize complex supply chain lifecycles in real time. 

Inspired by enterprise intelligence platforms like Palantir, the system uses:
* **Multi-Agent Orchestration:** Powered by LangChain and GPT-4o.
* **Real-time Streaming Infrastructure:** For live telemetry updates.
* **Financial Reconciliation Automation:** Autonomous tracking and calculation.
* **Logistics Intelligence:** Dynamic routing and ETA management.
* **Human-In-The-Loop Safety Controls:** Ensuring governance over high-stakes actions.

Built using a "build-first" engineering philosophy, the platform bridges raw operational telemetry with high-level reasoning through a neuro-symbolic architecture.

---

## 🤖 The Multi-Agent Orchestration Team

| Agent | Core Domain | Key Functions & Capabilities |
| :--- | :--- | :--- |
| **🔹 Planner Agent** | Production & Inventory | <ul><li>Cross-references inventory vs. production schedules</li><li>Identifies material mismatch risks</li><li>Flags 24-hour production halt warnings</li></ul> |
| **🔹 Coordinator Agent** | Logistics & Routing | <ul><li>Monitors live shipments across the supply chain</li><li>Uses Google Maps MCP for live ETA recalibration</li><li>Adjusts routes dynamically based on weather impact</li></ul> |
| **🔹 Analyst Agent** | Demand & Forecasting | <ul><li>Aggregates complex order data</li><li>Performs historical demand trend analysis</li><li>Outputs structured planning forecasts</li></ul> |
| **🔹 Finance Agent** | Commercial & Audit | <ul><li>Calculates the margin impact of logistical delays</li><li>Logs simulated and actual commercial savings</li><li>Writes immutable audit trail entries to Supabase</li></ul> |

---

## ⚙️ MCP Tool Workflow (n8n-Style Diagram)

Agents are equipped with production-grade “hands” (Model Context Protocol tools) to act autonomously in generating reports, charts, and enforcing compliance.

```mermaid
graph LR;
    subgraph Agents [Agentic Layer]
        P[Planner Agent]
        F[Finance Agent]
        A[Analyst Agent]
    end

    subgraph MCP_Tools [Model Context Protocol Tools]
        E{{Excel Manager Tool}}
        R{{Report & Chart Generator}}
        Q[(Qdrant RAG Hub)]
    end

    subgraph Actions_Outputs [Outputs & Actions]
        CSM(CSM Trackers)
        PP(Pricing Packs)
        X(XLOOKUP Reconciliation)
        SOP(SOPs & Contracts)
        HITL{Dashboard Approval<br/>HITL}
    end

    %% Routing
    P -->|Queries Specs| Q
    P -->|Triggers| E
    F -->|Simulates Margin| R
    F -->|Triggers| E
    A -->|Requests Trends| R

    %% Tool Outputs
    E --> CSM
    E --> PP
    E --> X
    Q --> SOP

    %% Human in the loop enforcement
    PP --> HITL
    CSM --> HITL
