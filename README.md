# 🚚 Multi-Agent Supply Chain OS (Palantir-Style)

### 🐾 Animal Medicine Manufacturer Digital Twin
**Enterprise Agentic Layer for Logistics, Planning & Finance**

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

## 🎥 Control Tower Overview
The platform operates as a live operational command center featuring:
* 3D Shipment Visualization
* Real-time Risk Monitoring
* Automated Financial Impact Logging
* Conversational Orchestrator Interface

---

## 🏗 System Architecture
The platform follows a Neuro-Symbolic Pipeline, combining:
* Deterministic data pipelines
* Vector search + RAG
* Tool-augmented LLM agents
* Human approval workflows

```mermaid
graph TD;
    subgraph Agentic_Layer [Agentic Layer: FastAPI + LangChain]
        A[brain.py] --> B{Agent Executor};
        B --> P[Planner Agent];
        B --> C[Coordinator Agent];
        B --> F[Finance Agent];
        B --> AN[Analyst Agent];
    end

    subgraph Tools_Intelligence [Tools & Intelligence]
        P --> T1[Excel MCP Tool];
        C --> T2[Maps MCP Tool];
        F --> T1;
        AN --> T3[Analytics Tool];

        P --> RAG[(Qdrant Vector DB)];
        C --> RAG;
        T1 --> HITL[Human in the Loop];
        T2 --> HITL;
    end

    subgraph Data_Platform [Data Platform: Docker + GCP]
        K[Kafka Stream] --> S[(Supabase PostgreSQL)];
        AF[Airflow DAGs] --> S;
        S --> A;
    end

    subgraph Digital_Twin [Digital Twin Frontend: Next.js]
        S --> D[Live Dashboard];
        D --> MAP[Deck.gl 3D Map];
        D --> CHAT[Orchestrator Chat];
    end
---

## 🛠 Technical Deep Dive

### 1️⃣ The Multi-Agent Brain (`brain.py`)
    
The orchestration engine coordinates four specialized agents:

* **🔹 Planner Agent:** Cross-references inventory vs production schedules, identifies material mismatch risks, and flags 24-hour production halt warnings.
* **🔹 Coordinator Agent:** Monitors live shipments, uses Google Maps MCP for ETA recalibration, and adjusts routes based on weather impact.
* **🔹 Analyst Agent:** Aggregates order data, performs demand trend analysis, and outputs structured planning forecasts.
* **🔹 Finance Agent:** Calculates margin impact of delays, logs commercial savings, and writes audit trail entries to Supabase.

### 2️⃣ Model Context Protocol (MCP) Tools
Agents are equipped with production-grade “hands” to act autonomously.

* **📊 Excel Manager:** Autonomous generation of CSM Trackers and Pricing Packs, automated XLOOKUP reconciliation, and embedded financial charts.
* **🧾 RAG Hub:** Powered by Qdrant Vector Database. Agents can query Supplier Contracts, SOPs, and Compliance Documentation to ensure regulatory adherence, contractual risk detection, and intelligent context retrieval.
* **🛡 Human-In-The-Loop (HITL):** High-impact actions (price hikes, customer notifications, commercial escalations) require dashboard approval, ensuring AI governance and operational safety.

### 3️⃣ Data Engineering & Pipelines
The Digital Twin stays live through real-time and batch orchestration.

* **🔄 Real-Time Stream Layer:** Simulates temperature fluctuations, engine load, weather impact, and shipment telemetry.
* **⏳ Batch Processing:** Managed via GCP Cloud Composer for scheduled manufacturing refresh cycles.
* **🗺 Digital Twin Visualization:** Built with Next.js, Deck.gl 3D shipment arcs, live fragility index overlays, and an orchestrator conversational interface.

---

## 🚀 Deployment & Usage

### 📦 Prerequisites
* Docker & Docker Compose
* OpenAI API Key
* Supabase Project URL & Key

### 🛠 Installation

**1️⃣ Clone Repository**
```bash
git clone [https://github.com/anubhavjetley2424/multi-agent-supply-chain-digital-twin.git](https://github.com/anubhavjetley2424/multi-agent-supply-chain-digital-twin.git)
cd multi-agent-supply-chain-digital-twin
