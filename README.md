🚚 Multi-Agent Supply Chain OS (Palantir-Style)
🐾 Animal Medicine Manufacturer Digital Twin

Enterprise Agentic Layer for Logistics, Planning & Finance

🌟 Executive Summary

Vetlab Autopak is a full-scale Digital Twin + Agentic Operating System designed to mirror and optimize complex supply chain lifecycles in real time.

Inspired by enterprise intelligence platforms like Palantir, the system uses:

🧠 Multi-Agent Orchestration (LangChain + GPT-4o)

🔄 Real-time Streaming Infrastructure

📊 Financial Reconciliation Automation

📦 Logistics Intelligence

🛡 Human-In-The-Loop Safety Controls

Built using a "build-first" engineering philosophy, the platform bridges raw operational telemetry with high-level reasoning through a neuro-symbolic architecture.

🎥 Control Tower Overview

The platform operates as a live operational command center:

3D Shipment Visualization

Real-time Risk Monitoring

Automated Financial Impact Logging

Conversational Orchestrator Interface

🏗 System Architecture

The platform follows a Neuro-Symbolic Pipeline, combining:

Deterministic data pipelines

Vector search + RAG

Tool-augmented LLM agents

Human approval workflows

🧠 High-Level Architecture Diagram
Diagram is not supported.
🛠 Technical Deep Dive
1️⃣ The Multi-Agent Brain (brain.py)

The orchestration engine coordinates four specialized agents:

🔹 Planner Agent

Cross-references inventory vs production schedules

Identifies material mismatch risks

Flags 24-hour production halt warnings

🔹 Coordinator Agent

Monitors live shipments

Uses Google Maps MCP for ETA recalibration

Adjusts routes based on weather impact

🔹 Analyst Agent

Aggregates order data

Performs demand trend analysis

Outputs structured planning forecasts

🔹 Finance Agent

Calculates margin impact of delays

Logs commercial savings

Writes audit trail entries to Supabase

2️⃣ Model Context Protocol (MCP) Tools

Agents are equipped with production-grade “hands” to act autonomously.

📊 Excel Manager

Autonomous generation of:

CSM Trackers

Pricing Packs

Automated XLOOKUP reconciliation

Embedded financial charts

🧾 RAG Hub

Powered by Qdrant Vector Database

Agents can query:

Supplier Contracts

SOPs

Compliance Documentation

Ensures:

Regulatory adherence

Contractual risk detection

Intelligent context retrieval

🛡 Human-In-The-Loop (HITL)

High-impact actions require dashboard approval:

Price hikes

Customer notifications

Commercial escalations

This ensures AI governance and operational safety.

3️⃣ Data Engineering & Pipelines

The Digital Twin stays live through real-time and batch orchestration.

🔄 Real-Time Stream Layer

Simulates:

Temperature fluctuations

Engine load

Weather impact

Shipment telemetry

⏳ Batch Processing

Managed via:

GCP Cloud Composer

Scheduled manufacturing refresh cycles

🗺 Digital Twin Visualization

Built with:

Next.js

Deck.gl 3D shipment arcs

Live fragility index overlays

Orchestrator conversational interface

🚀 Deployment & Usage
📦 Prerequisites

Docker & Docker Compose

OpenAI API Key

Supabase Project URL & Key

🛠 Installation
1️⃣ Clone Repository
git clone https://github.com/anubhavjetley2424/multi-agent-supply-chain-digital-twin.git
cd multi-agent-supply-chain-digital-twin
2️⃣ Environment Setup

Create .env in project root:

SUPABASE_URL=your_url
SUPABASE_KEY=your_key
OPENAI_API_KEY=your_key
3️⃣ Boot Infrastructure
docker-compose up --build
4️⃣ Run Agentic API
cd agent
pip install -r requirements.txt
python brain.py
📊 Project Impact
⚙ Automated Reconciliation

Reduced manual CSM data entry via autonomous Excel toolkit generation.

🛑 Risk Mitigation

Planner Agent provides 24-hour lead time warnings on production halts.

💰 Commercial Transparency

Finance Agent logs every intervention, creating:

Clear ROI tracking

Full audit history

Margin impact analytics

🧠 Why This Architecture Matters

This is not a chatbot.

This is:

A reasoning engine

A logistics optimizer

A financial copilot

A digital twin orchestrator

It demonstrates how multi-agent systems + structured data engineering can power enterprise-grade AI operating systems.

🔮 Future Extensions

Autonomous supplier negotiation simulations

Predictive inventory rebalancing

Reinforcement learning route optimization

ERP-native integration

🏁 Closing

Vetlab Autopak represents a next-generation Agentic Supply Chain OS — bridging real-time telemetry, symbolic data pipelines, and LLM reasoning into one cohesive enterprise intelligence layer.
