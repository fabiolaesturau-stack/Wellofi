"use client";
import DashLayout from "@/components/DashLayout";
import { taxOps as init } from "@/lib/data";
import { useState } from "react";

export default function Tax() {
  const [ops, setOps] = useState(init);
  const executed = ops.filter(o=>o.status==="executed");
  const actionable = ops.filter(o=>o.status==="recommended"||o.status==="pending");
  const saved = executed.reduce((s,o)=>s+o.savings,0);
  const potential = actionable.reduce((s,o)=>s+o.savings,0);
  const approve = (id:string) => setOps(p=>p.map(o=>o.id===id?{...o,status:"executed"}:o));

  return (
    <DashLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-1">Tax Center 🛡️</h1>
        <p className="text-[var(--muted)] mb-8">TaxShield works 24/7 finding ways to keep more money in your pocket.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">Saved (YTD)</span><p className="text-2xl font-extrabold mt-2 text-[var(--lime)]">${saved.toLocaleString()}</p><span className="text-xs text-[var(--muted)]">🎉 Nice work!</span></div>
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">Potential</span><p className="text-2xl font-extrabold mt-2 text-[var(--purple)]">${potential.toLocaleString()}</p><span className="text-xs text-[var(--muted)]">Waiting for you</span></div>
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">Executed</span><p className="text-2xl font-extrabold mt-2">{executed.length}</p><span className="text-xs text-[var(--muted)]">Moves made</span></div>
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">Action Needed</span><p className="text-2xl font-extrabold mt-2">{actionable.length}</p><span className="text-xs text-[var(--muted)]">Review now ↓</span></div>
        </div>

        {actionable.length>0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Needs Your OK 👆</h2>
            <div className="space-y-3">{actionable.map(op=>(
              <div key={op.id} className="card !p-5 flex flex-col md:flex-row md:items-center gap-4 border-l-4 border-l-[var(--lime)]">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">{op.type}</span>
                    <span className="badge badge-lime text-xs">{op.date}</span>
                  </div>
                  <p className="text-sm text-[var(--muted)]">{op.desc}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right"><span className="text-xs text-[var(--muted)]">Saves you</span><p className="text-xl font-extrabold text-[var(--lime)]">${op.savings.toLocaleString()}</p></div>
                  <button onClick={()=>approve(op.id)} className="btn btn-primary text-sm !py-3 !px-6">Approve ✓</button>
                </div>
              </div>
            ))}</div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-bold mb-4">Already Done ✅</h2>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 text-[var(--muted)] font-semibold text-xs uppercase">Date</th><th className="text-left py-3 text-[var(--muted)] font-semibold text-xs uppercase">Type</th>
                <th className="text-left py-3 text-[var(--muted)] font-semibold text-xs uppercase">What happened</th><th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase">Saved</th>
              </tr></thead>
              <tbody>{executed.map(op=>(
                <tr key={op.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="py-3 text-[var(--muted)]">{op.date}</td><td className="py-3"><span className="badge badge-lime text-xs">{op.type}</span></td>
                  <td className="py-3 text-[var(--muted)]">{op.desc}</td>
                  <td className="py-3 text-right font-extrabold text-[var(--lime)]">${op.savings.toLocaleString()}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
