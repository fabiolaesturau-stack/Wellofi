"use client";
import DashLayout from "@/components/DashLayout";
import { goals as init } from "@/lib/data";
import { useState } from "react";

export default function Goals() {
  const [goalList, setGoalList] = useState(init);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({name:"",target:"",deadline:""});
  const addGoal = () => {
    if(!form.name||!form.target) return;
    setGoalList(p=>[...p,{id:"g"+Date.now(),name:form.name,emoji:"🎯",target:Number(form.target),current:0,deadline:form.deadline||"2030",color:"#7B61FF"}]);
    setForm({name:"",target:"",deadline:""});
    setShowForm(false);
  };
  const total = goalList.reduce((s,g)=>s+g.target,0);
  const current = goalList.reduce((s,g)=>s+g.current,0);
  const pct = total>0?Math.round((current/total)*100):0;

  return (
    <DashLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-2xl md:text-3xl font-extrabold">Goals 🎯</h1><p className="text-[var(--muted)] mt-1">GoalTracker makes sure you hit every milestone.</p></div>
          <button onClick={()=>setShowForm(!showForm)} className="btn btn-primary text-sm">+ New Goal</button>
        </div>

        {showForm && (
          <div className="card mb-8 animate-in">
            <h3 className="text-lg font-bold mb-4">What are you saving for? 🌟</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Goal name" className="px-4 py-3 rounded-2xl border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime-glow)]"/>
              <input value={form.target} onChange={e=>setForm({...form,target:e.target.value})} placeholder="Target ($)" type="number" className="px-4 py-3 rounded-2xl border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime-glow)]"/>
              <input value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})} placeholder="Target year" className="px-4 py-3 rounded-2xl border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime-glow)]"/>
            </div>
            <div className="flex gap-3 mt-4"><button onClick={addGoal} className="btn btn-primary text-sm">Create →</button><button onClick={()=>setShowForm(false)} className="btn btn-ghost text-sm">Cancel</button></div>
          </div>
        )}

        <div className="card mb-8">
          <div className="flex items-center justify-between mb-3">
            <div><h3 className="text-lg font-bold">Overall Progress</h3><p className="text-sm text-[var(--muted)]">${current.toLocaleString()} of ${total.toLocaleString()}</p></div>
            <span className="text-3xl font-extrabold gradient-text">{pct}%</span>
          </div>
          <div className="w-full h-4 bg-[var(--bg)] rounded-full overflow-hidden"><div className="h-full rounded-full gradient-lime transition-all duration-700" style={{width:pct+"%"}}/></div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {goalList.map(g => {
            const p = Math.round((g.current/g.target)*100);
            const yrs = Math.max(1, Number(g.deadline)-2026);
            const monthly = Math.round((g.target-g.current)/(yrs*12));
            return (
              <div key={g.id} className="card hover:scale-[1.01]">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3"><span className="text-3xl">{g.emoji}</span><div><h3 className="font-bold text-lg">{g.name}</h3><p className="text-xs text-[var(--muted)]">Target: {g.deadline}</p></div></div>
                  <span className="text-2xl font-extrabold" style={{color:g.color}}>{p}%</span>
                </div>
                <div className="w-full h-3 bg-[var(--bg)] rounded-full overflow-hidden mb-4"><div className="h-full rounded-full transition-all duration-700" style={{width:p+"%",background:g.color}}/></div>
                <div className="flex justify-between text-sm"><span className="text-[var(--muted)]">Now: <b>${g.current.toLocaleString()}</b></span><span className="text-[var(--muted)]">Goal: <b>${g.target.toLocaleString()}</b></span></div>
                <div className="mt-3 pt-3 border-t border-[var(--border)] text-xs text-[var(--muted)] font-medium">💡 Save ~${monthly.toLocaleString()}/mo to hit this by {g.deadline}</div>
              </div>
            );
          })}
        </div>
      </div>
    </DashLayout>
  );
}
