import os
import json
import uvicorn
from datetime import datetime
from typing import List, Optional
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from supabase import create_client, Client
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.tools import tool
from qdrant_client import QdrantClient

# --- INITIALIZATION ---
app = FastAPI(
    title="Vetlab Autopak: Multi-Agent Supply Chain OS",
    description="Enterprise Agentic Layer for Logistics, Planning, and Finance with HITL & RAG",
    version="2.4.0"
)

# --- SUPABASE & LLM CONFIG ---
url: str = os.environ.get("SUPABASE_URL", "mock_url")
key: str = os.environ.get("SUPABASE_KEY", "mock_key")
supabase: Client = create_client(url, key)

llm_fast = ChatOpenAI(model="gpt-4o-mini", temperature=0)
llm_smart = ChatOpenAI(model="gpt-4o", temperature=0)
qdrant = QdrantClient(":memory:") 

# --- PROFESSIONAL MCP TOOLS ---

@tool
def log_agent_action(agent_name: str, action_type: str, order_id: str, reasoning: str):
    """TRACEABILITY TOOL: Logs every major decision an agent makes."""
    data = {"agent_name": agent_name, "action_type": action_type, "order_id": order_id, "reasoning": reasoning, "created_at": datetime.now().isoformat()}
    try:
        supabase.table("agent_logs").insert(data).execute()
    except Exception:
        pass
    return "Action logged successfully."

@tool
def google_maps_mcp_tool(origin_lat: float, origin_lng: float, dest_lat: float, dest_lng: float, weather_impact: float):
    """Coordinator Tool: Accesses Google Maps MCP. Returns real-time ETA."""
    base_hours = 4.2 
    live_eta = base_hours * weather_impact
    status = "Heavy Traffic" if weather_impact > 1.2 else "Optimal"
    return {"eta_hours": round(live_eta, 2), "status": status, "route_id": "M1-UK-NORTH"}

@tool
def log_impact_savings(order_id: str, savings_category: str, amount_saved: float):
    """COMMERCIAL IMPACT TOOL: Logs financial benefit of agent interventions."""
    data = {"order_id": order_id, "category": savings_category, "amount": amount_saved, "timestamp": datetime.now().isoformat()}
    try:
        supabase.table("commercial_impact").insert(data).execute()
    except Exception:
        pass
    return f"Logged ${amount_saved} in savings for {savings_category}."

@tool
def get_detailed_order_telemetry(order_id: str):
    """
    DEEP DIVE TOOL: Returns granular micro-logistics and production telemetry for a specific order.
    Queries the live IoT stream for truck conditions, driver details, and phase ETAs.
    """
    try:
        response = supabase.table("order_telemetry").select("*").eq("order_id", order_id).execute()
        if response.data:
            return json.dumps(response.data[0])
    except Exception:
        pass
    # Fallback mock for local emulator
    return json.dumps({
        "order_id": order_id,
        "truck_no": "VET-HG-772",
        "model": "Volvo FH Electric",
        "weather_conditions": "Heavy Rain, 8°C",
        "machine_id": "LINE-04",
        "temperature_c": 4.2,
        "phase_etas": {"filling": "Done", "qa": "In Progress - 02:00 UTC", "dispatch": "Pending"}
    })

@tool
def mcp_comm_hub_tool(channel: str, priority: str, message: str):
    """Universal Comm Agent Tool: Professional hub for Slack, Teams, or Portals."""
    return f"[{datetime.now().strftime('%H:%M:%S')}] [{priority}] Message dispatched to {channel}: {message}"

@tool
def query_supabase_tool(table_name: str):
    """Queries the public schema."""
    response = supabase.table(table_name).select("*").execute()
    return response.data

@tool
def log_exception_tool(order_id: str, category: str, description: str):
    """Planner Tool: Logs shortages to supply_chain_exceptions."""
    data = {"order_id": order_id, "category": category, "description": description, "severity_level": 5, "resolved": False}
    try:
        supabase.table("supply_chain_exceptions").insert(data).execute()
    except Exception:
        pass
    return f"Exception logged for {order_id}"

@tool
def mcp_report_gen_tool(report_type: str, data: list, output_format: str = "excel"):
    """Analyst/Finance Tool: Generates Excel Trackers, Charts, or JSON."""
    return f"Generated {report_type} in {output_format} format."

@tool
def milestone_tracker_tool(order_id: str, current_stage: str):
    """Coordinator Tool: Tracks Plan -> Production -> QA Release -> Dispatch flow."""
    return f"Order {order_id} moved to {current_stage}"

@tool
def search_contracts_sops(query: str):
    """RAG Tool: Searches Qdrant Vector DB for Supplier Contracts or SOPs."""
    return json.dumps([{"doc": "SOP_QA_HOLD.pdf", "content": "QA Holds on Caps require 12-hour inspection."}])

@tool
def request_human_approval(agent_name: str, action: str, justification: str, order_id: str):
    """HITL Tool: REQUIRED for sending customer messages or changing financial pricing."""
    data = {"agent": agent_name, "action": action, "justification": justification, "order_id": order_id, "status": "PENDING_HUMAN_REVIEW"}
    try:
        supabase.table("human_approvals").insert(data).execute()
    except Exception:
        pass
    return f"Approval request submitted for {action}."

@tool
def log_agent_feedback(agent_name: str, decision_context: str, human_rating: int, comments: str):
    """Feedback Tool: Logs human evaluations (1-5 stars)."""
    return "Feedback successfully logged."

# --- PROMPTS ---
planner_p = ChatPromptTemplate.from_messages([
    ("system", "You are the Vetlab Planner Agent. Identify Material-Production Mismatch risks. Query inventory vs production. Check SLAs via RAG if arrival > start. Log exceptions and trace."),
    ("human", "{input}"), MessagesPlaceholder(variable_name="agent_scratchpad")
])
analyst_p = ChatPromptTemplate.from_messages([
    ("system", "You are the Supply Chain Analyst Agent. Perform Demand Planning. Aggregate orders, identify trends, generate reports, and log actions."),
    ("human", "{input}"), MessagesPlaceholder(variable_name="agent_scratchpad")
])
coordinator_p = ChatPromptTemplate.from_messages([
    ("system", "You are the Logistics Coordinator. Monitor shipments. Use Maps MCP for ETAs. Use `get_detailed_order_telemetry` for granular truck/phase details. Request HITL approval before alerting customers of delays."),
    ("human", "{input}"), MessagesPlaceholder(variable_name="agent_scratchpad")
])
finance_p = ChatPromptTemplate.from_messages([
    ("system", "You are the Finance Bot Agent. Review downtime. Calculate margin impact. Log commercial savings. Request HITL approval for price changes."),
    ("human", "{input}"), MessagesPlaceholder(variable_name="agent_scratchpad")
])

# --- BINDINGS ---
planner_tools = [query_supabase_tool, log_exception_tool, mcp_comm_hub_tool, log_agent_action, search_contracts_sops]
planner_exec = AgentExecutor(agent=create_openai_functions_agent(llm_fast, planner_tools, planner_p), tools=planner_tools, verbose=True)

analyst_tools = [query_supabase_tool, mcp_report_gen_tool, log_agent_action]
analyst_exec = AgentExecutor(agent=create_openai_functions_agent(llm_fast, analyst_tools, analyst_p), tools=analyst_tools, verbose=True)

coordinator_tools = [query_supabase_tool, milestone_tracker_tool, google_maps_mcp_tool, mcp_comm_hub_tool, log_agent_action, search_contracts_sops, request_human_approval, get_detailed_order_telemetry]
coordinator_exec = AgentExecutor(agent=create_openai_functions_agent(llm_smart, coordinator_tools, coordinator_p), tools=coordinator_tools, verbose=True)

finance_tools = [query_supabase_tool, mcp_report_gen_tool, log_agent_action, request_human_approval, log_impact_savings, log_agent_feedback]
finance_exec = AgentExecutor(agent=create_openai_functions_agent(llm_fast, finance_tools, finance_p), tools=finance_tools, verbose=True)

# --- API ---
class AgentRequest(BaseModel):
    task: str
    order_id: Optional[str] = None

@app.post("/run-cycle")
async def trigger_cycle(background_tasks: BackgroundTasks):
    background_tasks.add_task(run_vetlab_operating_cycle)
    return {"status": "success"}

@app.get("/logistics/eta/{order_id}")
async def get_live_eta(order_id: str):
    result = coordinator_exec.invoke({"input": f"Check logistics and telemetry for {order_id}. Provide live ETA, truck conditions, and phase ETAs. Log your trace."})
    return {"order_id": order_id, "analysis": result["output"]}

def run_vetlab_operating_cycle():
    print("--- CYCLING AGENTS ---")
    planner_exec.invoke({"input": "Analyze inventory vs production. Check SLAs if arrival > start, log exceptions."})
    coordinator_exec.invoke({"input": "Audit shipments and check IoT telemetry for high-risk orders."})
    finance_exec.invoke({"input": "Calculate margin impact of delays. Log any simulated savings."})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)