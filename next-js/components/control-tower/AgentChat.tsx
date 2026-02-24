"use client";

import { useMemo, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const initialMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hello, I am the Vetlab Orchestrator. The Planner agent is currently scanning 14-day production windows. How can I assist?",
};

export function AgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");

  const promptHints = useMemo(
    () => ["Show delayed lanes", "Why margin dropped on SKU-007?", "Escalate cold chain exceptions"],
    [],
  );

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Coordinator acknowledged. Analyst is correlating lane risk with margin impact and will return a ranked mitigation set in 40 seconds.",
        },
      ]);
    }, 600);
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-zinc-800 bg-zinc-950/65">
      <div className="flex flex-wrap gap-2 border-b border-zinc-800 p-2">
        {promptHints.map((hint) => (
          <button
            key={hint}
            onClick={() => setInput(hint)}
            className="rounded border border-zinc-700 px-2 py-1 text-[11px] text-zinc-400 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            {hint}
          </button>
        ))}
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
        {messages.map((msg, index) => (
          <div key={`${msg.role}-${index}`} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[86%] rounded-lg px-3 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-zinc-800/70 text-zinc-100"
                  : "border border-cyan-400/70 bg-zinc-900/70 text-cyan-100"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-800 p-2">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Query the orchestration graph..."
            className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-cyan-400"
          />
          <button
            onClick={handleSend}
            className="rounded-md border border-cyan-400 px-3 py-2 text-xs uppercase tracking-[0.12em] text-cyan-300 transition hover:bg-cyan-400/10"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
