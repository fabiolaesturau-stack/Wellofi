"use client";
import DashLayout from "@/components/DashLayout";
import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

export default function Advisor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your WelloFI advisor. I can help with portfolio questions, tax strategies, retirement planning, or anything about your finances. What's on your mind? 💚" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection issue. Please try again! 🔄" }]);
    }
    setLoading(false);
  };

  return (
    <DashLayout>
      <div className="max-w-3xl mx-auto h-[calc(100vh-120px)] flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold">Ask Your Advisor 💬</h1>
          <p className="text-[var(--muted)]">Chat with your personal financial advisor, powered by WelloFI intelligence.</p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {messages.map((m, i) => (
            <div key={i} className={"flex " + (m.role === "user" ? "justify-end" : "justify-start") + " animate-in"} style={{animationDelay: i*0.05+"s"}}>
              <div className={"max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed " + (m.role === "user" ? "gradient-lime text-[#0D0F13] rounded-br-md" : "bg-[var(--card)] border border-[var(--border)] rounded-bl-md")}>
                {m.role === "assistant" && <span className="text-xs font-bold text-[var(--lime)] block mb-1">WelloFI Advisor</span>}
                <p className="whitespace-pre-wrap">{m.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-in">
              <div className="bg-[var(--card)] border border-[var(--border)] p-4 rounded-2xl rounded-bl-md">
                <span className="text-xs font-bold text-[var(--lime)] block mb-1">WelloFI Advisor</span>
                <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--lime)] animate-pulse2"/><div className="w-2 h-2 rounded-full bg-[var(--lime)] animate-pulse2" style={{animationDelay:"0.2s"}}/><div className="w-2 h-2 rounded-full bg-[var(--lime)] animate-pulse2" style={{animationDelay:"0.4s"}}/></div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask about taxes, portfolio, retirement..."
            className="flex-1 px-5 py-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-sm font-medium"
          />
          <button onClick={send} disabled={loading} className="btn btn-primary !px-6 !rounded-2xl disabled:opacity-50">
            {loading ? "..." : "Send →"}
          </button>
        </div>
      </div>
    </DashLayout>
  );
}
