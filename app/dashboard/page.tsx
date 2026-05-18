"use client";
import DashLayout from "@/components/DashLayout";
import { agents, holdings, chartData } from "@/lib/data";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const statusColor: any = { active: "#10B981", monitoring: "#F59E0B", idle: "#6B7A8D" };

export default function Dashboard() {
  return (
    <DashLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome back, Jordan</h1>
        <p className="text-[var(--muted)] mb-8">Here is what your agents have been working on.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Portfolio", value: "$405K", sub: "+10.1%", green: true },
            { label: "Total Gain", value: "$37K", sub: "Since Jan 2026", green: true },
            { label: "Tax Saved (YTD)", value: "$12,480", sub: "By TaxShield", green: true },
            { label: "Active Agents", value: "4/6", sub: "All systems normal", green: true },
          ].map((s,i) => (
            <div key={i} className="card">
              <span className="text-xs text-[var(--muted)] uppercase tracking-wider">{s.label}</span>
              <p className="text-2xl font-bold mt-2">{s.value}</p>
              <span className="text-xs font-medium text-emerald-500">{s.sub}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 card">
            <h2 className="text-lg font-bold mb-6" style={{fontFamily:'DM Sans'}}>Portfolio Performance</h2>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00C9A7" stopOpacity={0.2}/><stop offset="100%" stopColor="#00C9A7" stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fill:"#6B7A8D",fontSize:12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill:"#6B7A8D",fontSize:12}} tickFormatter={(v:any)=>"$"+(v/1000).toFixed(0)+"K"} />
                <Tooltip contentStyle={{background:"var(--navy)",border:"none",borderRadius:12,color:"white",fontSize:13}} formatter={(v:any)=>["$"+Number(v).toLocaleString(),"Value"]} />
                <Area type="monotone" dataKey="v" stroke="#00C9A7" strokeWidth={2.5} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold mb-4" style={{fontFamily:'DM Sans'}}>Agent Status</h2>
            <div className="space-y-3">
              {agents.map(a => (
                <div key={a.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--bg)] transition-colors">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg" style={{background:a.color+"15"}}>{a.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2"><span className="text-sm font-semibold">{a.name}</span><span className="w-2 h-2 rounded-full" style={{background:statusColor[a.status]}}/></div>
                    <p className="text-xs text-[var(--muted)] truncate">{a.last}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-bold mb-4" style={{fontFamily:'DM Sans'}}>Top Holdings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 text-[var(--muted)] font-medium">Asset</th>
                <th className="text-right py-3 text-[var(--muted)] font-medium">Value</th>
                <th className="text-right py-3 text-[var(--muted)] font-medium">Alloc</th>
                <th className="text-right py-3 text-[var(--muted)] font-medium">Change</th>
              </tr></thead>
              <tbody>{holdings.slice(0,5).map((h,i) => (
                <tr key={i} className="border-b border-[var(--border)] last:border-0">
                  <td className="py-3"><span className="font-semibold">{h.ticker}</span> <span className="text-[var(--muted)] text-xs">{h.name}</span></td>
                  <td className="py-3 text-right font-semibold">${h.value.toLocaleString()}</td>
                  <td className="py-3 text-right">{h.alloc}%</td>
                  <td className={`py-3 text-right font-medium ${h.change>=0?"text-emerald-500":"text-red-500"}`}>{h.change>=0?"+":""}{h.change}%</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
