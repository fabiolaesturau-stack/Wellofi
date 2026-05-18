"use client";
import DashLayout from "@/components/DashLayout";
import { goals as initialGoals } from "@/lib/data";
import { useState } from "react";

export default function Goals() {
  const [goalList, setGoalList] = useState(initialGoals);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({name:"",target:"",deadline:"",color:"#00C9A7"});

  const addGoal = () => {
    if(!form.name||!form.target) return;
    setGoalList(prev=>[...prev,{id:"g"+Date.now(),name:form.name,target:Number(form.target),current:0,deadline:form.deadline||"2030",color:form.color}]);
    setForm({name:"",target:"",deadline:"",color:"#00C9A7"});
    setShowForm(false);
  };

  const total = goalList.reduce((s,g)=>s+g.target,0);
  const current = goalList.reduce((s,g)=>s+g.current,0);
  const pct = Math.round((current/total)*100);

  return (
    <DashLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-2xl md:text-3xl font-bold">Financial Goals</h1><p className="text-[var(--muted)] mt-1">GoalTracker monitors progress and adjusts strategies.</p></div>
          <button onClick={()=>setShowForm(!showForm)} className="btn btn-primary text-sm">+ Add Goal</button>
        </div>

        {showForm && (
          <div className="card mb-8 animate-in">
            <h3 className="text-lg font-bold mb-4" style={{fontFamily:'DM Sans'}}>New Goal</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Goal name" className="px-4 py-2.5 rounded-xl border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--teal)]"/>
              <input value={form.target} onChange={e=>setForm({...form,target:e.target.value})} placeholder="Target ($)" type="number" className="px-4 py-2.5 rounded-xl border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--teal)]"/>
              <input value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})} placeholder="Target year" className="px-4 py-2.5 rounded-xl border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--teal)]"/>
            </div>
            <div className="flex gap-3 mt-4"><button onClick={addGoal} className="btn btn-primary text-sm">Create</button><button onClick={()=>setShowForm(false)} className="btn btn-outline text-sm">Cancel</button></div>
          </div>
        )}

        <div className="card mb-8">
          <div className="flex items-center justify-between mb-3">
            <div><h3 className="text-lg font-bold" style={{fontFamily:'DM Sans'}}>Overall Progress</h3><p className="text-sm text-[var(--muted)]">${current.toLocaleString()} of ${total.toLocaleString()}</p></div>
            <span className="text-3xl font-bold gradient-text">{pct}%</span>
          </div>
          <div className="w-full h-3 bg-[var(--bg)] rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-[var(--teal)] to-[var(--gold)] transition-all" style={{width:pct+"%"}}/></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {goalList.map(g => {
            const p = Math.round((g.current/g.target)*100);
            const left = g.target - g.current;
            const yrs = Math.max(1, Number(g.deadline)-2026);
            const monthly = Math.round(left/(yrs*12));
            return (
              <div key={g.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div><h3 className="font-bold" style={{fontFamily:'DM Sans'}}>{g.name}</h3><p className="text-xs text-[var(--muted)]">Target: {g.deadline}</p></div>
                  <span className="text-lg font-bold" style={{color:g.color}}>{p}%</span>
                </div>
                <div className="w-full h-2.5 bg-[var(--bg)] rounded-full overflow-hidden mb-4"><div className="h-full rounded-full transition-all" style={{width:p+"%",background:g.color}}/></div>
                <div className="flex justify-between text-sm"><span className="text-[var(--muted)]">Current: <b>${g.current.toLocaleString()}</b></span><span className="text-[var(--muted)]">Target: <b>${g.target.toLocaleString()}</b></span></div>
                <div className="mt-3 pt-3 border-t border-[var(--border)] text-xs text-[var(--muted)]">📈 Contribute ~${monthly.toLocaleString()}/mo over {yrs} year{yrs>1?"s":""} to stay on track.</div>
              </div>
            );
          })}
        </div>
      </div>
    </DashLayout>
  );
}
