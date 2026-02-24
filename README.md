# 🚚 Multi-Agent Supply Chain OS (Palantir-Style)



https://github.com/user-attachments/assets/1538c108-0730-4dad-b532-a3c4853332a7


<img width="1494" height="648" alt="image" src="https://github.com/user-attachments/assets/d1e635d0-533a-4944-9dcf-10de4ddb8a81" />

<img width="1012" height="858" alt="image" src="https://github.com/user-attachments/assets/c7507214-24bf-4ba6-897a-e27a3d99c388" />
<img width="2802" height="1428" alt="image" src="https://github.com/user-attachments/assets/144cb561-c380-49c9-b5c0-69461fc69e44" />
<img width="1890" height="648" alt="image" src="https://github.com/user-attachments/assets/820af265-5907-4bbb-ac80-bbc03140435b" />
<img width="926" height="626" alt="image" src="https://github.com/user-attachments/assets/9be457f1-7a02-4783-b378-71aadaac0110" />




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
        K[Kafka Stream] --> S[(Supabase - PostgreSQL)];
        AF[Airflow DAGs] --> S;
        S --> A;
    end

    subgraph Digital_Twin [Digital Twin Frontend: Next.js]
        S --> D[Live Dashboard];
        D --> MAP[Deck.gl 3D Map];
        D --> CHAT[Orchestrator Chat];
    end
