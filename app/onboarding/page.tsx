"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const steps = [
  { title: "The basics", sub: "Tell us about your financial situation.", fields: [
    { id:"age", label:"Age Range", opts:["18-25","26-35","36-45","46-55","56-65","65+"] },
    { id:"income", label:"Household Income", opts:["Under $75K","$75K-$150K","$150K-$300K","$300K-$500K","$500K+"] },
    { id:"assets", label:"Investable Assets", opts:["$10K-$50K","$50K-$250K","$250K-$1M","$1M-$5M","$5M+"] },
  ]},
  { title: "Your goals", sub: "Select all that apply.", multi: true, opts: ["Retirement Planning","Tax Optimization","College Savings","Home Down Payment","Estate Planning","Emergency Fund","Debt Payoff","Wealth Growth"] },
  { title: "Risk tolerance", sub: "Helps RiskGuard set your guardrails.", fields: [
    { id:"risk", label:"Risk Tolerance", opts:["Conservative","Moderately Conservative","Moderate","Moderately Aggressive","Aggressive"] },
    { id:"timeline", label:"Timeline", opts:["1-3 years","3-5 years","5-10 years","10-20 years","20+ years"] },
  ]},
];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [selGoals, setSelGoals] = useState<string[]>([]);
  const s = steps[step];
  const last = step===steps.length-1;

  return (
    <div className="min-h-screen bg-[var(--navy)] flex items-center justify-center p-6">
      <div className="w-full max-w-lg animate-in" key={step}>
        <Link href="/" className="flex items-center gap-3 mb-10"><div className="w-8 h-8 rounded-lg bg-[var(--teal)] flex items-center justify-center font-bold text-white text-xs">W</div><span className="text-white text-lg font-bold">WelloFI</span></Link>
        <div className="mb-2 text-[var(--teal)] text-sm font-medium">Step {step+1} of {steps.length}</div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{s.title}</h1>
        <p className="text-white/40 mb-8">{s.sub}</p>

        {s.multi ? (
          <div className="grid grid-cols-2 gap-3">{s.opts!.map(o=>(
            <button key={o} onClick={()=>setSelGoals(prev=>prev.includes(o)?prev.filter(x=>x!==o):[...prev,o])}
              className={`p-3.5 rounded-xl text-sm text-left font-medium transition-all ${selGoals.includes(o)?"bg-[var(--teal)] text-white":"bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"}`}>{o}</button>
          ))}</div>
        ) : s.fields!.map(f=>(
          <div key={f.id} className="mb-5">
            <label className="text-sm text-white/50 mb-2 block">{f.label}</label>
            <div className="space-y-2">{f.opts.map(o=>(
              <button key={o} onClick={()=>setAnswers(p=>({...p,[f.id]:o}))}
                className={`w-full p-3.5 rounded-xl text-sm text-left font-medium transition-all ${answers[f.id]===o?"bg-[var(--teal)] text-white":"bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"}`}>{o}</button>
            ))}</div>
          </div>
        ))}

        <div className="flex items-center justify-between mt-10">
          {step>0?<button onClick={()=>setStep(step-1)} className="text-white/40 hover:text-white text-sm">← Back</button>:<div/>}
          <button onClick={()=>last?router.push("/dashboard"):setStep(step+1)} className="btn btn-primary">{last?"Launch My Agents →":"Continue →"}</button>
        </div>
      </div>
    </div>
  );
}
