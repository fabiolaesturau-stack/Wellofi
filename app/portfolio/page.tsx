"use client";
import DashLayout from "@/components/DashLayout";
import { holdings, allocData, chartData } from "@/lib/data";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis } from "recharts";

export default function Portfolio() {
  const total = holdings.reduce((s,h)=>s+h.value,0);
  return (
    <DashLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-1">Portfolio 💎</h1>
        <p className="text-[var(--muted)] mb-8">Managed by PortfolioSync. Rebalanced. Optimized. Always.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">Total Value</span><p className="text-2xl font-extrabold mt-2">${total.toLocaleString()}</p></div>
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">Day Change</span><p className="text-2xl font-extrabold mt-2 text-[var(--lime)]">+$1,842</p></div>
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">YTD Return</span><p className="text-2xl font-extrabold mt-2 text-[var(--lime)]">+10.1%</p></div>
          <div className="card"><span className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">Risk Score</span><p className="text-2xl font-extrabold mt-2">72<span className="text-sm text-[var(--muted)] font-normal">/100</span></p></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 card">
            <h2 className="text-lg font-bold mb-6">Growth (12 Months) 📈</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <defs><linearGradient id="pg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00DC6F" stopOpacity={0.15}/><stop offset="100%" stopColor="#00DC6F" stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fill:"#8B919A",fontSize:12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill:"#8B919A",fontSize:12}} tickFormatter={(v:any)=>"$"+(v/1000).toFixed(0)+"K"} />
                <Tooltip contentStyle={{background:"var(--dark)",border:"none",borderRadius:16,color:"white",fontSize:13,fontWeight:600}} formatter={(v:any)=>["$"+Number(v).toLocaleString(),"Value"]} />
                <Area type="monotone" dataKey="v" stroke="#00DC6F" strokeWidth={3} fill="url(#pg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h2 className="text-lg font-bold mb-6">Allocation 🥧</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart><Pie data={allocData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" stroke="none">
                {allocData.map((e,i)=><Cell key={i} fill={e.color}/>)}
              </Pie><Tooltip formatter={(v:any)=>[v+"%"]} contentStyle={{background:"var(--dark)",border:"none",borderRadius:12,color:"white",fontSize:13}}/></PieChart>
            </ResponsiveContainer>
            <div className="space-y-2.5 mt-4">{allocData.map((a,i)=>(
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5"><div className="w-3 h-3 rounded-full" style={{background:a.color}}/><span className="text-[var(--muted)]">{a.name}</span></div>
                <span className="font-bold">{a.value}%</span>
              </div>
            ))}</div>
          </div>
        </div>

        <div className="card overflow-x-auto">
          <h2 className="text-lg font-bold mb-5">All Holdings</h2>
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[var(--border)]">
              <th className="text-left py-3 text-[var(--muted)] font-semibold text-xs uppercase">Asset</th><th className="text-left py-3 text-[var(--muted)] font-semibold text-xs uppercase">Ticker</th>
              <th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase">Value</th><th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase">Alloc</th>
              <th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase">Change</th><th className="text-left py-3 text-[var(--muted)] font-semibold text-xs uppercase pl-6">Sector</th>
            </tr></thead>
            <tbody>{holdings.map((h,i)=>(
              <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)]">
                <td className="py-4 font-semibold">{h.name}</td><td className="py-4"><span className="badge badge-lime text-xs">{h.ticker}</span></td>
                <td className="py-4 text-right font-bold">${h.value.toLocaleString()}</td><td className="py-4 text-right">{h.alloc}%</td>
                <td className={"py-4 text-right font-bold " + (h.change>=0?"text-[var(--lime)]":"text-[var(--coral)]")}>{h.change>=0?"+":""}{Math.abs(h.change)}%</td>
                <td className="py-4 pl-6"><span className="px-3 py-1 rounded-full text-xs bg-[var(--bg)] text-[var(--muted)] font-medium">{h.sector}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </DashLayout>
  );
}
