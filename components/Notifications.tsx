"use client";
import { useState, useEffect } from "react";

const agentMessages = [
  { agent: "TaxShield 🛡️", msg: "Found a $768 tax-loss harvesting opportunity on VXUS", color: "#00DC6F" },
  { agent: "PortfolioSync 📊", msg: "Rebalancing complete: international equity +2%", color: "#4DABF7" },
  { agent: "RiskGuard ⚡", msg: "Portfolio beta reduced from 1.12 to 0.98", color: "#FFB347" },
  { agent: "GoalTracker 🎯", msg: "Retirement fund on track! 16.2% of target reached", color: "#FF6B6B" },
  { agent: "CashFlow 💰", msg: "Moved $15K to high-yield savings at 4.85% APY", color: "#00DC6F" },
  { agent: "EstatePlan 🏛️", msg: "Trust beneficiary review completed", color: "#7B61FF" },
  { agent: "TaxShield 🛡️", msg: "Roth conversion opportunity: save $4,200 this quarter", color: "#00DC6F" },
  { agent: "PortfolioSync 📊", msg: "ESG alignment score improved to 87/100", color: "#4DABF7" },
];

export default function Notifications() {
  const [toasts, setToasts] = useState<{id:number,agent:string,msg:string,color:string}[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = agentMessages[Math.floor(Math.random() * agentMessages.length)];
      const id = Date.now();
      setToasts(prev => [...prev.slice(-2), { id, ...random }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
    }, 8000);
    // Show first one after 3 seconds
    const first = setTimeout(() => {
      const random = agentMessages[0];
      const id = Date.now();
      setToasts(prev => [...prev, { id, ...random }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
    }, 3000);
    return () => { clearInterval(interval); clearTimeout(first); };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none" style={{maxWidth:380}}>
      {toasts.map(t => (
        <div key={t.id} className="animate-slide pointer-events-auto bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 shadow-xl flex items-start gap-3" style={{borderLeftWidth:4,borderLeftColor:t.color}}>
          <div className="flex-1">
            <p className="text-xs font-bold" style={{color:t.color}}>{t.agent}</p>
            <p className="text-sm text-[var(--text)] mt-0.5">{t.msg}</p>
          </div>
          <span className="text-xs text-[var(--muted)]">now</span>
        </div>
      ))}
    </div>
  );
}
