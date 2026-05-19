"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const steps = [
  { title: "First, the basics 📝", sub: "Quick snapshot of your financial life.", fields: [
    { id:"age", label:"Age Range", opts:["18-25","26-35","36-45","46-55","56-65","65+"] },
    { id:"income", label:"Household Income", opts:["Under $75K","$75K - $150K","$150K - $300K","$300K - $500K","$500K+"] },
    { id:"assets", label:"Investable Assets", opts:["$10K - $50K","$50K - $250K","$250K - $1M","$1M - $5M","$5M+"] },
  ]},
  { title: "What matters most? 🎯", sub: "Pick all your goals. We will prioritize them.", multi: true, opts: ["Retirement 🏖️","Tax Optimization 🛡️","College Savings 🎓","Dream Home 🏡","Estate Planning 🏛️","Emergency Fund 🆘","Debt Freedom 💳","Wealth Growth 📈"] },
  { title: "How brave are you? ⚡", sub: "This helps RiskGuard protect you the right way.", fields: [
    { id:"risk", label:"Risk Tolerance", opts:["Conservative","Moderately Conservative","Moderate","Moderately Aggressive","Aggressive"] },
    { id:"timeline", label:"Investment Timeline", opts:["1-3 years","3-5 years","5-10 years","10-20 years","20+ years"] },
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
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="blob w-[500px] h-[500px] bg-[var(--lime)] top-[-200px] right-[-200px] opacity-[0.06]" />
      <div className="blob w-[400px] h-[400px] bg-[var(--purple)] bottom-[-200px] left-[-200px] opacity-[0.06]" />
      <div className="w-full max-w-lg relative animate-in" key={step}>
        <Link href="/" className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-2xl gradient-lime flex items-center justify-center font-extrabold text-dark text-lg">W</div>
          <span className="text-xl font-extrabold">WelloFI</span>
        </Link>

        <div className="flex gap-2 mb-6">{steps.map((_,i) => <div key={i} className={"h-1.5 flex-1 rounded-full transition-all " + (i<=step?"gradient-lime":"bg-[var(--border)]")} />)}</div>

        <h1 className="text-2xl md:text-3xl font-extrabold mb-2">{s.title}</h1>
        <p className="text-[var(--muted)] mb-8">{s.sub}</p>

        {s.multi ? (
          <div className="grid grid-cols-2 gap-3">{s.opts!.map(o=>(
            <button key={o} onClick={()=>setSelGoals(p=>p.includes(o)?p.filter(x=>x!==o):[...p,o])}
              className={"p-4 rounded-2xl text-sm text-left font-semibold transition-all " + (selGoals.includes(o)?"gradient-lime text-[var(--dark)] shadow-lg scale-[1.02]":"bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--lime)]")}>{o}</button>
          ))}</div>
        ) : s.fields!.map(f=>(
          <div key={f.id} className="mb-6">
            <label className="text-sm text-[var(--muted)] font-semibold mb-2 block">{f.label}</label>
            <div className="space-y-2">{f.opts.map(o=>(
              <button key={o} onClick={()=>setAnswers(p=>({...p,[f.id]:o}))}
                className={"w-full p-4 rounded-2xl text-sm text-left font-semibold transition-all " + (answers[f.id]===o?"gradient-lime text-[var(--dark)] shadow-lg":"bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--lime)]")}>{o}</button>
            ))}</div>
          </div>
        ))}

        <div className="flex items-center justify-between mt-10">
          {step>0?<button onClick={()=>setStep(step-1)} className="text-[var(--muted)] hover:text-[var(--text)] font-medium">← Back</button>:<div/>}
          <button onClick={()=>last?router.push("/dashboard"):setStep(step+1)} className="btn btn-primary !py-3.5 !px-8">{last?"Launch My Agents 🚀":"Continue →"}</button>
        </div>
      </div>
    </div>
  );
}
