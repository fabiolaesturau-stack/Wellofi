"use client";
import DashLayout from "@/components/DashLayout";
import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Simulator() {
  const [initial, setInitial] = useState(100000);
  const [monthly, setMonthly] = useState(2000);
  const [years, setYears] = useState(20);
  const [returnRate, setReturnRate] = useState(8);
  const [allocation, setAllocation] = useState({ stocks: 60, bonds: 25, alternatives: 15 });

  const setAlloc = (key: string, val: number) => {
    const others = Object.entries(allocation).filter(([k]) => k !== key);
    const remaining = 100 - val;
    const otherTotal = others.reduce((s, [, v]) => s + Number(v), 0);
    const newAlloc: any = { ...allocation, [key]: val };
    others.forEach(([k, v]) => { newAlloc[k] = otherTotal > 0 ? Math.round((Number(v) / otherTotal) * remaining) : Math.round(remaining / others.length); });
    const diff = 100 - (Object.values(newAlloc) as number[]).reduce((s, v) => s + v, 0);
    newAlloc[others[0][0]] += diff;
    setAllocation(newAlloc);
  };

  const projections = useMemo(() => {
    const data = [];
    // Allocation affects effective return: stocks=high return, bonds=low, alts=medium
    const effectiveReturn = (allocation.stocks * returnRate * 1.2 + allocation.bonds * returnRate * 0.5 + allocation.alternatives * returnRate * 0.9) / 100;
    const r = effectiveReturn / 100;
    // Volatility based on stock allocation (more stocks = wider spread)
    const vol = 0.3 + (allocation.stocks / 100) * 0.5;
    let conservative = initial, moderate = initial, aggressive = initial;
    for (let y = 0; y <= years; y++) {
      data.push({ year: "Yr " + y, conservative: Math.round(conservative), moderate: Math.round(moderate), aggressive: Math.round(aggressive) });
      conservative = conservative * (1 + r * (1 - vol)) + monthly * 12;
      moderate = moderate * (1 + r) + monthly * 12;
      aggressive = aggressive * (1 + r * (1 + vol)) + monthly * 12;
    }
    return data;
  }, [initial, monthly, years, returnRate, allocation]);

  const final = projections[projections.length - 1];
  const totalContributed = initial + monthly * 12 * years;

  return (
    <DashLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-1">Portfolio Simulator 🔮</h1>
        <p className="text-[var(--muted)] mb-8">Play with the numbers. See how different strategies grow your wealth over time.</p>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="card space-y-6">
            <h2 className="text-lg font-bold">Your Inputs 🎛️</h2>

            <div>
              <div className="flex justify-between text-sm mb-2"><span className="font-medium">Starting Amount</span><span className="font-bold text-[var(--lime)]">${initial.toLocaleString()}</span></div>
              <input type="range" min={10000} max={1000000} step={5000} value={initial} onChange={e=>setInitial(+e.target.value)} className="w-full accent-[var(--lime)]" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2"><span className="font-medium">Monthly Contribution</span><span className="font-bold text-[var(--lime)]">${monthly.toLocaleString()}</span></div>
              <input type="range" min={0} max={10000} step={100} value={monthly} onChange={e=>setMonthly(+e.target.value)} className="w-full accent-[var(--lime)]" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2"><span className="font-medium">Time Horizon</span><span className="font-bold text-[var(--lime)]">{years} years</span></div>
              <input type="range" min={1} max={40} value={years} onChange={e=>setYears(+e.target.value)} className="w-full accent-[var(--lime)]" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2"><span className="font-medium">Expected Return</span><span className="font-bold text-[var(--lime)]">{returnRate}%</span></div>
              <input type="range" min={1} max={15} step={0.5} value={returnRate} onChange={e=>setReturnRate(+e.target.value)} className="w-full accent-[var(--lime)]" />
            </div>

            <div>
              <h3 className="text-sm font-bold mb-3">Allocation Mix</h3>
              {Object.entries(allocation).map(([k, v]) => (
                <div key={k} className="mb-3">
                  <div className="flex justify-between text-xs mb-1"><span className="capitalize font-medium">{k}</span><span className="font-bold">{v}%</span></div>
                  <input type="range" min={0} max={100} value={v} onChange={e=>setAlloc(k,+e.target.value)} className="w-full accent-[var(--lime)]" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="card text-center !p-5"><p className="text-xs text-[var(--muted)] uppercase font-semibold">Conservative</p><p className="text-xl font-extrabold text-[var(--sky)] mt-1">${(final.conservative/1000000).toFixed(2)}M</p></div>
              <div className="card text-center !p-5 !border-[var(--lime)]"><p className="text-xs text-[var(--muted)] uppercase font-semibold">Moderate ⭐</p><p className="text-xl font-extrabold text-[var(--lime)] mt-1">${(final.moderate/1000000).toFixed(2)}M</p></div>
              <div className="card text-center !p-5"><p className="text-xs text-[var(--muted)] uppercase font-semibold">Aggressive</p><p className="text-xl font-extrabold text-[var(--purple)] mt-1">${(final.aggressive/1000000).toFixed(2)}M</p></div>
            </div>

            <div className="card">
              <h2 className="text-lg font-bold mb-4">Growth Projection 📈</h2>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={projections}>
                  <defs>
                    <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4DABF7" stopOpacity={0.1}/><stop offset="100%" stopColor="#4DABF7" stopOpacity={0}/></linearGradient>
                    <linearGradient id="gm" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00DC6F" stopOpacity={0.15}/><stop offset="100%" stopColor="#00DC6F" stopOpacity={0}/></linearGradient>
                    <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7B61FF" stopOpacity={0.1}/><stop offset="100%" stopColor="#7B61FF" stopOpacity={0}/></linearGradient>
                  </defs>
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill:"var(--muted)",fontSize:11}} interval={Math.max(1,Math.floor(years/8))} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill:"var(--muted)",fontSize:11}} tickFormatter={(v:any)=>v>=1000000?"$"+(v/1000000).toFixed(1)+"M":"$"+(v/1000).toFixed(0)+"K"} />
                  <Tooltip contentStyle={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:16,fontSize:13,fontWeight:600}} formatter={(v:any)=>["$"+Number(v).toLocaleString()]} />
                  <Area type="monotone" dataKey="conservative" stroke="#4DABF7" strokeWidth={2} fill="url(#gc)" name="Conservative" />
                  <Area type="monotone" dataKey="moderate" stroke="#00DC6F" strokeWidth={3} fill="url(#gm)" name="Moderate" />
                  <Area type="monotone" dataKey="aggressive" stroke="#7B61FF" strokeWidth={2} fill="url(#ga)" name="Aggressive" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="card !p-5 flex items-center gap-4">
              <span className="text-3xl">💡</span>
              <div>
                <p className="text-sm font-bold">You would contribute ${totalContributed.toLocaleString()} total</p>
                <p className="text-sm text-[var(--muted)]">The moderate scenario earns ${(final.moderate - totalContributed).toLocaleString()} in returns. That is the power of compounding!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
