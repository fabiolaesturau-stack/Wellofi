"use client";
import DashLayout from "@/components/DashLayout";
import { holdings, allocData, chartData } from "@/lib/data";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis } from "recharts";

export default function Portfolio() {
  const total = holdings.reduce((s,h)=>s+h.value,0);
  return (
    <DashLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Portfolio</h1>
        <p className="text-[var(--muted)] mb-8">Your complete asset overview managed by PortfolioSync.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider">Total Value</span><p className="text-2xl font-bold mt-2">${total.toLocaleString()}</p></div>
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider">Day Change</span><p className="text-2xl font-bold mt-2 text-emerald-500">+$1,842</p></div>
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider">YTD Return</span><p className="text-2xl font-bold mt-2 text-emerald-500">+10.1%</p></div>
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider">Risk Score</span><p className="text-2xl font-bold mt-2">72<span className="text-sm text-[var(--muted)]">/100</span></p></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 card">
            <h2 className="text-lg font-bold mb-6" style={{fontFamily:'DM Sans'}}>Performance (12 Months)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00C9A7" stopOpacity={0.15}/><stop offset="100%" stopColor="#00C9A7" stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fill:"#6B7A8D",fontSize:12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill:"#6B7A8D",fontSize:12}} tickFormatter={(v:any)=>"$"+(v/1000).toFixed(0)+"K"} />
                <Tooltip contentStyle={{background:"var(--navy)",border:"none",borderRadius:12,color:"white",fontSize:13}} formatter={(v:any)=>["$"+Number(v).toLocaleString(),"Value"]} />
                <Area type="monotone" dataKey="v" stroke="#00C9A7" strokeWidth={2.5} fill="url(#pg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h2 className="text-lg font-bold mb-6" style={{fontFamily:'DM Sans'}}>Allocation</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={allocData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" stroke="none">
                {allocData.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Pie><Tooltip formatter={(v:any)=>[v+"%","Allocation"]} contentStyle={{background:"var(--navy)",border:"none",borderRadius:12,color:"white",fontSize:13}}/></PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">{allocData.map((a,i)=>(
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{background:a.color}}/><span className="text-[var(--muted)]">{a.name}</span></div>
                <span className="font-semibold">{a.value}%</span>
              </div>
            ))}</div>
          </div>
        </div>

        <div className="card overflow-x-auto">
          <h2 className="text-lg font-bold mb-4" style={{fontFamily:'DM Sans'}}>All Holdings</h2>
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[var(--border)]">
              <th className="text-left py-3 text-[var(--muted)] font-medium">Asset</th><th className="text-left py-3 text-[var(--muted)] font-medium">Ticker</th>
              <th className="text-right py-3 text-[var(--muted)] font-medium">Value</th><th className="text-right py-3 text-[var(--muted)] font-medium">Alloc</th>
              <th className="text-right py-3 text-[var(--muted)] font-medium">Change</th><th className="text-left py-3 text-[var(--muted)] font-medium pl-6">Sector</th>
            </tr></thead>
            <tbody>{holdings.map((h,i)=>(
              <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)]">
                <td className="py-3 font-semibold">{h.name}</td><td className="py-3 text-[var(--muted)]">{h.ticker}</td>
                <td className="py-3 text-right font-semibold">${h.value.toLocaleString()}</td><td className="py-3 text-right">{h.alloc}%</td>
                <td className={`py-3 text-right font-medium ${h.change>=0?"text-emerald-500":"text-red-500"}`}>{h.change>=0?"+":""}{Math.abs(h.change)}%</td>
                <td className="py-3 pl-6"><span className="px-2.5 py-1 rounded-full text-xs bg-[var(--bg)] text-[var(--muted)]">{h.sector}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </DashLayout>
  );
}
