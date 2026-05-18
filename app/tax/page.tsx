"use client";
import DashLayout from "@/components/DashLayout";
import { taxOps as initialOps } from "@/lib/data";
import { useState } from "react";

export default function TaxCenter() {
  const [ops, setOps] = useState(initialOps);
  const executed = ops.filter(o=>o.status==="executed");
  const recommended = ops.filter(o=>o.status==="recommended");
  const pending = ops.filter(o=>o.status==="pending");
  const saved = executed.reduce((s,o)=>s+o.savings,0);
  const potential = [...recommended,...pending].reduce((s,o)=>s+o.savings,0);

  const approve = (id:string) => setOps(prev=>prev.map(o=>o.id===id?{...o,status:"executed"}:o));

  return (
    <DashLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Tax Center</h1>
        <p className="text-[var(--muted)] mb-8">TaxShield monitors your portfolio for tax optimization opportunities.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider">Tax Saved (YTD)</span><p className="text-2xl font-bold mt-2 text-emerald-500">${saved.toLocaleString()}</p></div>
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider">Potential Savings</span><p className="text-2xl font-bold mt-2 text-amber-500">${potential.toLocaleString()}</p></div>
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider">Executed</span><p className="text-2xl font-bold mt-2">{executed.length}</p></div>
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider">Pending</span><p className="text-2xl font-bold mt-2">{recommended.length+pending.length}</p></div>
        </div>

        {[...recommended,...pending].length>0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4" style={{fontFamily:'DM Sans'}}>Action Required</h2>
            <div className="space-y-3">{[...recommended,...pending].map(op=>(
              <div key={op.id} className="card border-l-4 border-l-[var(--teal)] flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <span className="text-sm font-bold">{op.type}</span>
                  <p className="text-sm text-[var(--muted)] mt-1">{op.desc}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right"><span className="text-xs text-[var(--muted)]">Est. Savings</span><p className="text-lg font-bold text-emerald-500">${op.savings.toLocaleString()}</p></div>
                  <button onClick={()=>approve(op.id)} className="btn btn-primary text-sm !py-2.5 !px-5">Approve →</button>
                </div>
              </div>
            ))}</div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-bold mb-4" style={{fontFamily:'DM Sans'}}>Executed This Year</h2>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 text-[var(--muted)] font-medium">Date</th><th className="text-left py-3 text-[var(--muted)] font-medium">Type</th>
                <th className="text-left py-3 text-[var(--muted)] font-medium">Description</th><th className="text-right py-3 text-[var(--muted)] font-medium">Savings</th>
              </tr></thead>
              <tbody>{executed.map(op=>(
                <tr key={op.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="py-3 text-[var(--muted)]">{op.date}</td><td className="py-3 font-semibold">{op.type}</td>
                  <td className="py-3 text-[var(--muted)]">{op.desc}</td>
                  <td className="py-3 text-right font-bold text-emerald-500">${op.savings.toLocaleString()}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
