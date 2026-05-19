"use client";
import DashLayout from "@/components/DashLayout";
import { agents, holdings, chartData } from "@/lib/data";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  return (
    <DashLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2"><span className="text-3xl">👋</span><h1 className="text-2xl md:text-3xl font-extrabold">Welcome back, Jordan!</h1></div>
        <p className="text-[var(--muted)] mb-8 ml-12">Your agents have been busy while you were away.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Portfolio", value: "$405,000", sub: "+10.1% all time", emoji: "💎", color: "var(--lime)" },
            { label: "Total Gain", value: "+$37,000", sub: "Since Jan 2026", emoji: "📈", color: "var(--lime)" },
            { label: "Tax Saved (YTD)", value: "$12,480", sub: "By TaxShield", emoji: "🛡️", color: "var(--purple)" },
            { label: "Active Agents", value: "4 of 6", sub: "All systems go", emoji: "🤖", color: "var(--sky)" },
          ].map((s,i) => (
            <div key={i} className="card group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-[var(--muted)] uppercase tracking-wider font-semibold">{s.label}</span>
                <span className="text-xl group-hover:scale-125 transition-transform">{s.emoji}</span>
              </div>
              <p className="text-2xl font-extrabold">{s.value}</p>
              <span className="text-xs font-semibold" style={{color:s.color}}>{s.sub}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Portfolio Performance 📊</h2>
              <span className="badge badge-lime text-xs">12 months</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00DC6F" stopOpacity={0.2}/><stop offset="100%" stopColor="#00DC6F" stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fill:"#8B919A",fontSize:12,fontWeight:500}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill:"#8B919A",fontSize:12}} tickFormatter={(v:any)=>"$"+(v/1000).toFixed(0)+"K"} />
                <Tooltip contentStyle={{background:"var(--dark)",border:"none",borderRadius:16,color:"white",fontSize:13,fontWeight:600,padding:"12px 16px"}} formatter={(v:any)=>["$"+Number(v).toLocaleString(),"Value"]} />
                <Area type="monotone" dataKey="v" stroke="#00DC6F" strokeWidth={3} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2 className="text-lg font-bold mb-5">Agent Squad 🤖</h2>
            <div className="space-y-2">
              {agents.map(a => (
                <div key={a.id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[var(--bg)] transition-all cursor-pointer group">
                  <div className="text-2xl group-hover:scale-110 transition-transform">{a.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold">{a.name}</span>
                      <span className={"badge text-[10px] !py-0.5 !px-2 " + a.badge}>{a.status}</span>
                    </div>
                    <p className="text-xs text-[var(--muted)] truncate">{a.last}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-bold mb-5">Top Holdings 💎</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[var(--border)]">
                <th className="text-left py-3 text-[var(--muted)] font-semibold text-xs uppercase tracking-wider">Asset</th>
                <th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase tracking-wider">Value</th>
                <th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase tracking-wider">Alloc</th>
                <th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase tracking-wider">Change</th>
              </tr></thead>
              <tbody>{holdings.slice(0,6).map((h,i) => (
                <tr key={i} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)] transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{background:h.color}}>{h.ticker[0]}</div>
                      <div><span className="font-bold">{h.ticker}</span><p className="text-xs text-[var(--muted)]">{h.name}</p></div>
                    </div>
                  </td>
                  <td className="py-4 text-right font-bold">${h.value.toLocaleString()}</td>
                  <td className="py-4 text-right text-[var(--muted)]">{h.alloc}%</td>
                  <td className={"py-4 text-right font-bold " + (h.change>=0?"text-[var(--lime)]":"text-[var(--coral)]")}>{h.change>=0?"+":""}{h.change}%</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
