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
        <h1 className="text-2xl md:text-3xl font-extrabold mb-1">Settings ⚙️</h1>
        <p className="text-[var(--muted)] mb-8">Customize your WelloFI experience.</p>

        <div className="card mb-6">
          <h2 className="text-lg font-bold mb-5">Profile 👤</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="text-xs text-[var(--muted)] font-semibold mb-1.5 block uppercase tracking-wider">Full Name</label><input value={name} onChange={e=>setName(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] text-sm font-medium focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime-glow)]"/></div>
            <div><label className="text-xs text-[var(--muted)] font-semibold mb-1.5 block uppercase tracking-wider">Email</label><input value={email} onChange={e=>setEmail(e.target.value)} className="w-full px-4 py-3 rounded-2xl border border-[var(--border)] text-sm font-medium focus:outline-none focus:border-[var(--lime)] focus:ring-2 focus:ring-[var(--lime-glow)]"/></div>
            <div><label className="text-xs text-[var(--muted)] font-semibold mb-1.5 block uppercase tracking-wider">Plan</label><div className="px-4 py-3 rounded-2xl gradient-lime text-sm font-bold text-[var(--dark)]">Professional ✨</div></div>
            <div><label className="text-xs text-[var(--muted)] font-semibold mb-1.5 block uppercase tracking-wider">Member Since</label><div className="px-4 py-3 rounded-2xl bg-[var(--bg)] text-sm font-medium">January 2026</div></div>
          </div>
        </div>

        <div className="card mb-6">
          <h2 className="text-lg font-bold mb-5">Notifications 🔔</h2>
          {Object.entries(notifs).map(([k,v])=>{
            const labels:any = {agent:"Agent Actions",tax:"Tax Opportunities",weekly:"Weekly Report",market:"Market Alerts",goals:"Goal Milestones"};
            const emojis:any = {agent:"🤖",tax:"🛡️",weekly:"📊",market:"📉",goals:"🎯"};
            return (
              <div key={k} className="flex items-center justify-between py-4 border-b border-[var(--border)] last:border-0">
                <span className="text-sm font-medium">{emojis[k]} {labels[k]}</span>
                <button onClick={()=>setNotifs(p=>({...p,[k]:!v}))} className={"w-12 h-7 rounded-full relative transition-all " + (v?"gradient-lime shadow-md":"bg-gray-200")}>
                  <div className="w-5 h-5 rounded-full bg-white shadow-sm absolute top-1 transition-transform" style={{left:3,transform:v?"translateX(20px)":"translateX(0)"}}/>
                </button>
              </div>
            );
          })}
        </div>

        <div className="card mb-6">
          <h2 className="text-lg font-bold mb-5">Agent Control 🎮</h2>
          <p className="text-sm text-[var(--muted)] mb-4">Choose how autonomous each agent should be.</p>
          {agents.slice(0,4).map(a=>(
            <div key={a.id} className="flex items-center justify-between py-4 border-b border-[var(--border)] last:border-0">
              <div className="flex items-center gap-3"><span className="text-xl">{a.emoji}</span><div><span className="text-sm font-bold">{a.name}</span><p className="text-xs text-[var(--muted)]">{a.fn}</p></div></div>
              <select className="px-4 py-2 rounded-xl border border-[var(--border)] text-xs font-medium bg-white focus:outline-none focus:border-[var(--lime)]">
                <option>Auto-execute</option><option>Ask me first</option><option>Suggest only</option>
              </select>
            </div>
          ))}
        </div>

        <button onClick={save} className={"btn w-full justify-center text-base !py-4 !rounded-2xl " + (saved?"bg-[var(--lime)] text-[var(--dark)]":"btn-dark")}>{saved?"Saved! ✓":"Save Changes"}</button>
      </div>
    </DashLayout>
  );
}
