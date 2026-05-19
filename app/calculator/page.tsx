"use client";
import DashLayout from "@/components/DashLayout";
import { useState, useMemo } from "react";

const brackets2026 = [
  { min: 0, max: 11925, rate: 10 },
  { min: 11925, max: 48475, rate: 12 },
  { min: 48475, max: 103350, rate: 22 },
  { min: 103350, max: 197300, rate: 24 },
  { min: 197300, max: 250525, rate: 32 },
  { min: 250525, max: 626350, rate: 35 },
  { min: 626350, max: Infinity, rate: 37 },
];

export default function Calculator() {
  const [income, setIncome] = useState(200000);
  const [gains, setGains] = useState(25000);
  const [losses, setLosses] = useState(0);
  const [rothConversion, setRothConversion] = useState(0);
  const [charitableGiving, setCharitableGiving] = useState(0);
  const [filing, setFiling] = useState("single");

  const results = useMemo(() => {
    const deduction = filing === "married" ? 30000 : 15000;
    const taxableIncome = Math.max(0, income - deduction);
    const netGains = Math.max(0, gains - losses);
    const capGainsTax = netGains * 0.15;

    let incomeTax = 0;
    let remaining = taxableIncome;
    for (const b of brackets2026) {
      const taxable = Math.min(remaining, b.max - b.min);
      if (taxable <= 0) break;
      incomeTax += taxable * (b.rate / 100);
      remaining -= taxable;
    }

    const totalTaxBefore = incomeTax + capGainsTax;

    // With WelloFI optimizations
    const harvestSavings = Math.min(losses, gains) * 0.15;
    const rothTaxNow = rothConversion * 0.24; // assume 24% bracket
    const rothFutureSavings = rothConversion * 0.32; // save at higher future rate
    const rothNetSavings = rothFutureSavings - rothTaxNow;
    const charitableSavings = Math.min(charitableGiving, income * 0.6) * 0.24;
    const assetLocationSavings = taxableIncome * 0.003; // ~0.3% from asset location

    const totalSavings = harvestSavings + Math.max(0, rothNetSavings) + charitableSavings + assetLocationSavings;
    const effectiveRate = ((totalTaxBefore / (income + gains)) * 100).toFixed(1);
    const optimizedRate = (((totalTaxBefore - totalSavings) / (income + gains)) * 100).toFixed(1);

    return { totalTaxBefore, totalSavings, harvestSavings, rothNetSavings: Math.max(0, rothNetSavings), charitableSavings, assetLocationSavings, effectiveRate, optimizedRate };
  }, [income, gains, losses, rothConversion, charitableGiving, filing]);

  return (
    <DashLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-1">Tax Savings Calculator 🧮</h1>
        <p className="text-[var(--muted)] mb-8">See how much WelloFI's agents could save you in taxes this year.</p>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="card">
              <h2 className="text-lg font-bold mb-5">Your Tax Situation 📋</h2>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-2"><span className="font-medium">Annual Income</span><span className="font-bold">${income.toLocaleString()}</span></div>
                  <input type="range" min={30000} max={1000000} step={5000} value={income} onChange={e=>setIncome(+e.target.value)} className="w-full accent-[var(--lime)]" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2"><span className="font-medium">Capital Gains</span><span className="font-bold">${gains.toLocaleString()}</span></div>
                  <input type="range" min={0} max={200000} step={1000} value={gains} onChange={e=>setGains(+e.target.value)} className="w-full accent-[var(--lime)]" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Filing Status</label>
                  <div className="flex gap-2">
                    {["single","married"].map(f=>(
                      <button key={f} onClick={()=>setFiling(f)} className={"flex-1 py-3 rounded-2xl text-sm font-semibold transition-all capitalize " + (filing===f?"gradient-lime text-[#0D0F13]":"bg-[var(--bg)] border border-[var(--border)]")}>{f}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-bold mb-5">WelloFI Strategies 🛡️</h2>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-2"><span className="font-medium">Tax-Loss Harvesting</span><span className="font-bold text-[var(--lime)]">${losses.toLocaleString()}</span></div>
                  <input type="range" min={0} max={gains} step={500} value={losses} onChange={e=>setLosses(+e.target.value)} className="w-full accent-[var(--lime)]" />
                  <p className="text-xs text-[var(--muted)] mt-1">TaxShield finds losses to offset your gains</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2"><span className="font-medium">Roth Conversion</span><span className="font-bold text-[var(--purple)]">${rothConversion.toLocaleString()}</span></div>
                  <input type="range" min={0} max={50000} step={1000} value={rothConversion} onChange={e=>setRothConversion(+e.target.value)} className="w-full accent-[var(--purple)]" />
                  <p className="text-xs text-[var(--muted)] mt-1">Pay tax now at lower rate, save more later</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2"><span className="font-medium">Charitable Giving</span><span className="font-bold text-[var(--sky)]">${charitableGiving.toLocaleString()}</span></div>
                  <input type="range" min={0} max={100000} step={1000} value={charitableGiving} onChange={e=>setCharitableGiving(+e.target.value)} className="w-full accent-[var(--sky)]" />
                  <p className="text-xs text-[var(--muted)] mt-1">EstatePlan donates appreciated shares directly</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card gradient-lime !border-0 text-center">
              <p className="text-sm font-bold text-[#0D0F13]/60 uppercase">Estimated Annual Tax Savings</p>
              <p className="text-5xl font-extrabold text-[#0D0F13] mt-2">${Math.round(results.totalSavings).toLocaleString()}</p>
              <p className="text-sm text-[#0D0F13]/60 mt-2">Effective rate: {results.effectiveRate}% → {results.optimizedRate}%</p>
            </div>

            <div className="card">
              <h2 className="text-lg font-bold mb-5">Savings Breakdown 📊</h2>
              <div className="space-y-4">
                {[
                  { label: "Tax-Loss Harvesting", value: results.harvestSavings, agent: "TaxShield 🛡️", color: "var(--lime)" },
                  { label: "Roth Conversion Benefit", value: results.rothNetSavings, agent: "TaxShield 🛡️", color: "var(--purple)" },
                  { label: "Charitable Deduction", value: results.charitableSavings, agent: "EstatePlan 🏛️", color: "var(--sky)" },
                  { label: "Asset Location", value: results.assetLocationSavings, agent: "PortfolioSync 📊", color: "var(--amber)" },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{item.label}</span>
                      <span className="font-bold" style={{color:item.color}}>${Math.round(item.value).toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--bg)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{width: Math.min(100, (item.value / Math.max(1, results.totalSavings)) * 100) + "%", background: item.color}} />
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-1">by {item.agent}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card !p-5 flex items-center gap-4">
              <span className="text-3xl">🎯</span>
              <div>
                <p className="text-sm font-bold">Over 10 years, this saves ~${(Math.round(results.totalSavings) * 10).toLocaleString()}</p>
                <p className="text-sm text-[var(--muted)]">Invested at 8% return, that grows to ~${(Math.round(results.totalSavings * 10 * 1.8)).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
