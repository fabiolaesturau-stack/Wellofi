"use client";
import DashLayout from "@/components/DashLayout";
import { agents } from "@/lib/data";
import { useState } from "react";

export default function Settings() {
  const [name, setName] = useState("Jordan Mitchell");
  const [email, setEmail] = useState("jordan@example.com");
  const [saved, setSaved] = useState(false);
  const [notifs, setNotifs] = useState({agent:true,tax:true,weekly:true,market:false,goals:true});

  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); };

  return (
    <DashLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Settings</h1>
        <p className="text-[var(--muted)] mb-8">Manage your profile and agent configurations.</p>

        <div className="card mb-6">
          <h2 className="text-lg font-bold mb-4" style={{fontFamily:'DM Sans'}}>👤 Profile</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="text-xs text-[var(--muted)] mb-1.5 block">Full Name</label><input value={name} onChange={e=>setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--teal)]"/></div>
            <div><label className="text-xs text-[var(--muted)] mb-1.5 block">Email</label><input value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--teal)]"/></div>
            <div><label className="text-xs text-[var(--muted)] mb-1.5 block">Plan</label><div className="px-4 py-2.5 rounded-xl bg-[var(--teal)]/10 text-[var(--teal)] text-sm font-semibold">Professional</div></div>
            <div><label className="text-xs text-[var(--muted)] mb-1.5 block">Member Since</label><div className="px-4 py-2.5 rounded-xl bg-[var(--bg)] text-sm">January 2026</div></div>
          </div>
        </div>

        <div className="card mb-6">
          <h2 className="text-lg font-bold mb-4" style={{fontFamily:'DM Sans'}}>🔔 Notifications</h2>
          {Object.entries(notifs).map(([k,v])=>{
            const labels:any = {agent:"Agent actions",tax:"Tax opportunities",weekly:"Weekly report",market:"Market alerts",goals:"Goal milestones"};
            return (
              <div key={k} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                <span className="text-sm">{labels[k]}</span>
                <button onClick={()=>setNotifs(p=>({...p,[k]:!v}))} className={`w-11 h-6 rounded-full relative transition-colors ${v?"bg-[var(--teal)]":"bg-gray-200"}`}>
                  <div className="w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform" style={{left:2,transform:v?"translateX(20px)":"translateX(0)"}}/>
                </button>
              </div>
            );
          })}
        </div>

        <div className="card mb-6">
          <h2 className="text-lg font-bold mb-4" style={{fontFamily:'DM Sans'}}>🛡️ Agent Permissions</h2>
          {agents.slice(0,4).map(a=>(
            <div key={a.id} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
              <div><span className="text-sm font-semibold">{a.name}</span><p className="text-xs text-[var(--muted)]">{a.fn}</p></div>
              <select className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs bg-white focus:outline-none focus:border-[var(--teal)]">
                <option>Auto-execute</option><option>Require approval</option><option>Recommend only</option>
              </select>
            </div>
          ))}
        </div>

        <button onClick={save} className="btn btn-primary w-full justify-center">{saved?"✓ Saved!":"Save Changes"}</button>
      </div>
    </DashLayout>
  );
}
