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

function calcTax(taxable: number) {
  let tax = 0, remaining = taxable;
  for (const b of brackets2026) {
    const amt = Math.min(remaining, b.max - b.min);
    if (amt <= 0) break;
    tax += amt * (b.rate / 100);
    remaining -= amt;
  }
  return tax;
}

export default function TaxForm() {
  const [step, setStep] = useState(0);
  const [filing, setFiling] = useState("single");

  // Income
  const [wages, setWages] = useState(125000);
  const [interest, setInterest] = useState(1200);
  const [dividends, setDividends] = useState(3400);
  const [capitalGains, setCapitalGains] = useState(8500);
  const [otherIncome, setOtherIncome] = useState(0);
  const [businessIncome, setBusinessIncome] = useState(0);
  const [iraDistributions, setIraDistributions] = useState(0);

  // Adjustments
  const [iraDeduction, setIraDeduction] = useState(0);
  const [studentLoan, setStudentLoan] = useState(0);
  const [hsaDeduction, setHsaDeduction] = useState(3850);
  const [selfEmploymentTax, setSelfEmploymentTax] = useState(0);

  // Deductions
  const [useStandard, setUseStandard] = useState(true);
  const [mortgage, setMortgage] = useState(0);
  const [stateTax, setStateTax] = useState(0);
  const [charitable, setCharitable] = useState(0);
  const [medicalExpenses, setMedicalExpenses] = useState(0);

  // Credits & Payments
  const [childCredit, setChildCredit] = useState(0);
  const [educationCredit, setEducationCredit] = useState(0);
  const [energyCredit, setEnergyCredit] = useState(0);
  const [withheld, setWithheld] = useState(28000);
  const [estimatedPayments, setEstimatedPayments] = useState(0);

  // WelloFI optimizations
  const [harvestLosses, setHarvestLosses] = useState(0);
  const [rothConversion, setRothConversion] = useState(0);
  const [charitableStock, setCharitableStock] = useState(0);

  const results = useMemo(() => {
    const totalIncome = wages + interest + dividends + capitalGains + otherIncome + businessIncome + iraDistributions + rothConversion;
    const adjustments = iraDeduction + studentLoan + hsaDeduction + (selfEmploymentTax * 0.5);
    const agi = totalIncome - adjustments;

    const standardDeduction = filing === "married" ? 30000 : filing === "hoh" ? 22500 : 15000;
    const itemized = mortgage + Math.min(stateTax, 10000) + charitable + charitableStock + Math.max(0, medicalExpenses - agi * 0.075);
    const deduction = useStandard ? standardDeduction : Math.max(itemized, standardDeduction);

    const qualifiedDividends = dividends * 0.7;
    const ordinaryIncome = Math.max(0, agi - deduction - qualifiedDividends);

    const netCapGains = Math.max(0, capitalGains - harvestLosses);
    const incomeTax = calcTax(ordinaryIncome);
    const capGainsTax = netCapGains * 0.15;
    const dividendTax = qualifiedDividends * 0.15;

    const totalTax = Math.max(0, incomeTax + capGainsTax + dividendTax);
    const credits = childCredit + educationCredit + energyCredit;
    const taxAfterCredits = Math.max(0, totalTax - credits);
    const totalPayments = withheld + estimatedPayments;
    const owedOrRefund = taxAfterCredits - totalPayments;

    // WelloFI savings
    const harvestSaving = Math.min(harvestLosses, capitalGains) * 0.15;
    const charitableStockSaving = charitableStock * 0.15;
    const totalWellofiSavings = harvestSaving + charitableStockSaving;

    const effectiveRate = totalIncome > 0 ? ((taxAfterCredits / totalIncome) * 100).toFixed(1) : "0";

    return {
      totalIncome, adjustments, agi, deduction, useStandard,
      incomeTax, capGainsTax, dividendTax, totalTax, credits,
      taxAfterCredits, totalPayments, owedOrRefund, effectiveRate,
      harvestSaving, charitableStockSaving, totalWellofiSavings,
      netCapGains, standardDeduction, itemized,
    };
  }, [wages, interest, dividends, capitalGains, otherIncome, businessIncome, iraDistributions,
    iraDeduction, studentLoan, hsaDeduction, selfEmploymentTax,
    useStandard, mortgage, stateTax, charitable, medicalExpenses,
    childCredit, educationCredit, energyCredit, withheld, estimatedPayments,
    harvestLosses, rothConversion, charitableStock, filing]);

  const fmt = (n: number) => "$" + Math.round(n).toLocaleString();

  const Field = ({ label, value, onChange, tip, agent }: { label: string; value: number; onChange: (v: number) => void; tip?: string; agent?: string }) => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-sm font-medium">{label}</label>
        {agent && <span className="text-xs badge badge-lime">{agent}</span>}
      </div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] text-sm">$</span>
        <input
          type="number"
          value={value || ""}
          onChange={e => onChange(Number(e.target.value) || 0)}
          className="w-full pl-8 pr-4 py-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-sm font-semibold"
        />
      </div>
      {tip && <p className="text-xs text-[var(--muted)] mt-1">{tip}</p>}
    </div>
  );

  const steps = [
    {
      title: "Filing Status & Income",
      emoji: "💰",
      line: "Lines 1-9",
      content: (
        <>
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Filing Status</label>
            <div className="grid grid-cols-3 gap-2">
              {[{v:"single",l:"Single"},{v:"married",l:"Married Joint"},{v:"hoh",l:"Head of Household"}].map(f => (
                <button key={f.v} onClick={() => setFiling(f.v)} className={"py-3 rounded-2xl text-sm font-semibold transition-all " + (filing===f.v ? "gradient-lime text-[#0D0F13]" : "bg-[var(--bg)] border border-[var(--border)]")}>{f.l}</button>
              ))}
            </div>
          </div>
          <Field label="Line 1: Wages, salaries, tips (W-2)" value={wages} onChange={setWages} />
          <Field label="Line 2b: Taxable interest" value={interest} onChange={setInterest} />
          <Field label="Line 3b: Ordinary dividends" value={dividends} onChange={setDividends} />
          <Field label="Line 7: Capital gains (Schedule D)" value={capitalGains} onChange={setCapitalGains} tip="TaxShield monitors this for harvesting opportunities" agent="TaxShield" />
          <Field label="Line 4b: IRA distributions" value={iraDistributions} onChange={setIraDistributions} />
          <Field label="Line 8: Business income (Schedule C)" value={businessIncome} onChange={setBusinessIncome} />
          <Field label="Line 8: Other income" value={otherIncome} onChange={setOtherIncome} />
          <div className="p-4 rounded-2xl bg-[var(--lime-glow)] border border-[var(--lime)]/20 mt-4">
            <div className="flex justify-between"><span className="font-bold">Line 9: Total Income</span><span className="font-extrabold text-[var(--lime)]">{fmt(results.totalIncome)}</span></div>
          </div>
        </>
      ),
    },
    {
      title: "Adjustments to Income",
      emoji: "📝",
      line: "Lines 10-11",
      content: (
        <>
          <p className="text-sm text-[var(--muted)] mb-4">These reduce your gross income before deductions. Also called "above-the-line" deductions.</p>
          <Field label="IRA deduction" value={iraDeduction} onChange={setIraDeduction} tip="Traditional IRA contributions up to $7,000 (2026)" />
          <Field label="Student loan interest" value={studentLoan} onChange={setStudentLoan} tip="Up to $2,500" />
          <Field label="HSA deduction" value={hsaDeduction} onChange={setHsaDeduction} tip="Up to $4,300 individual / $8,550 family (2026)" />
          <Field label="Self-employment tax deduction" value={selfEmploymentTax} onChange={setSelfEmploymentTax} tip="50% of SE tax is deductible" />
          <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--border)] mt-4 space-y-2">
            <div className="flex justify-between text-sm"><span>Total adjustments</span><span className="font-bold">{fmt(results.adjustments)}</span></div>
            <div className="flex justify-between"><span className="font-bold">Line 11: Adjusted Gross Income (AGI)</span><span className="font-extrabold text-[var(--purple)]">{fmt(results.agi)}</span></div>
          </div>
        </>
      ),
    },
    {
      title: "Deductions",
      emoji: "✂️",
      line: "Lines 12-15",
      content: (
        <>
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Deduction Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setUseStandard(true)} className={"py-3 rounded-2xl text-sm font-semibold transition-all " + (useStandard ? "gradient-lime text-[#0D0F13]" : "bg-[var(--bg)] border border-[var(--border)]")}>Standard ({fmt(results.standardDeduction)})</button>
              <button onClick={() => setUseStandard(false)} className={"py-3 rounded-2xl text-sm font-semibold transition-all " + (!useStandard ? "gradient-lime text-[#0D0F13]" : "bg-[var(--bg)] border border-[var(--border)]")}>Itemized</button>
            </div>
          </div>
          {!useStandard && (
            <>
              <Field label="Mortgage interest" value={mortgage} onChange={setMortgage} />
              <Field label="State and local taxes (SALT)" value={stateTax} onChange={setStateTax} tip="Capped at $10,000" />
              <Field label="Cash charitable donations" value={charitable} onChange={setCharitable} />
              <Field label="Medical expenses (above 7.5% AGI)" value={medicalExpenses} onChange={setMedicalExpenses} />
              <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--border)] mb-4">
                <div className="flex justify-between text-sm"><span>Itemized total</span><span className="font-bold">{fmt(results.itemized)}</span></div>
              </div>
            </>
          )}
          <div className="p-4 rounded-2xl bg-[var(--lime-glow)] border border-[var(--lime)]/20">
            <div className="flex justify-between"><span className="font-bold">Line 15: Taxable Income</span><span className="font-extrabold text-[var(--lime)]">{fmt(Math.max(0, results.agi - results.deduction))}</span></div>
          </div>
        </>
      ),
    },
    {
      title: "Tax, Credits & Payments",
      emoji: "🧾",
      line: "Lines 16-37",
      content: (
        <>
          <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--border)] mb-6 space-y-2">
            <div className="flex justify-between text-sm"><span>Line 16: Income tax</span><span className="font-bold">{fmt(results.incomeTax)}</span></div>
            <div className="flex justify-between text-sm"><span>Capital gains tax (15%)</span><span className="font-bold">{fmt(results.capGainsTax)}</span></div>
            <div className="flex justify-between text-sm"><span>Qualified dividends tax (15%)</span><span className="font-bold">{fmt(results.dividendTax)}</span></div>
            <div className="border-t border-[var(--border)] pt-2 flex justify-between"><span className="font-bold">Total tax</span><span className="font-extrabold">{fmt(results.totalTax)}</span></div>
          </div>

          <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-[var(--muted)]">Credits (reduce tax directly)</h3>
          <Field label="Child tax credit ($2,000 per child)" value={childCredit} onChange={setChildCredit} />
          <Field label="Education credits (American Opportunity / Lifetime)" value={educationCredit} onChange={setEducationCredit} />
          <Field label="Clean energy credit" value={energyCredit} onChange={setEnergyCredit} />

          <h3 className="text-sm font-bold mb-3 mt-6 uppercase tracking-wider text-[var(--muted)]">Payments</h3>
          <Field label="Line 25: Federal tax withheld (W-2)" value={withheld} onChange={setWithheld} />
          <Field label="Line 26: Estimated tax payments" value={estimatedPayments} onChange={setEstimatedPayments} />

          <div className={"p-5 rounded-2xl border mt-4 " + (results.owedOrRefund <= 0 ? "bg-[var(--lime-glow)] border-[var(--lime)]/20" : "bg-[rgba(255,107,107,0.08)] border-[var(--coral)]/20")}>
            <div className="flex justify-between text-sm mb-1"><span>Tax after credits</span><span className="font-bold">{fmt(results.taxAfterCredits)}</span></div>
            <div className="flex justify-between text-sm mb-2"><span>Total payments</span><span className="font-bold">{fmt(results.totalPayments)}</span></div>
            <div className="border-t border-[var(--border)] pt-2 flex justify-between">
              <span className="font-bold text-lg">{results.owedOrRefund <= 0 ? "Line 34: Refund! 🎉" : "Line 37: Amount Owed"}</span>
              <span className={"font-extrabold text-2xl " + (results.owedOrRefund <= 0 ? "text-[var(--lime)]" : "text-[var(--coral)]")}>{fmt(Math.abs(results.owedOrRefund))}</span>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "WelloFI Optimization",
      emoji: "🚀",
      line: "Agent Strategies",
      content: (
        <>
          <p className="text-sm text-[var(--muted)] mb-6">See how WelloFI's agents can reduce your tax bill. Adjust the sliders and watch your refund grow.</p>
          <Field label="Tax-loss harvesting (offset capital gains)" value={harvestLosses} onChange={setHarvestLosses} tip={"Your capital gains: " + fmt(capitalGains) + ". TaxShield finds losses to offset them."} agent="TaxShield 🛡️" />
          <Field label="Donate appreciated stock (skip cap gains tax)" value={charitableStock} onChange={setCharitableStock} tip="EstatePlan donates stock instead of cash to avoid capital gains entirely." agent="EstatePlan 🏛️" />
          <Field label="Roth conversion (pay tax now, save later)" value={rothConversion} onChange={setRothConversion} tip="Adds to income now, but all future growth is tax-free forever." agent="TaxShield 🛡️" />

          <div className="p-5 rounded-2xl gradient-lime mt-6">
            <p className="text-sm font-bold text-[#0D0F13]/60 uppercase mb-1">Estimated WelloFI Tax Savings</p>
            <p className="text-4xl font-extrabold text-[#0D0F13]">{fmt(results.totalWellofiSavings)}</p>
            <div className="mt-3 space-y-1">
              {results.harvestSaving > 0 && <p className="text-sm text-[#0D0F13]/70">🛡️ Tax-loss harvesting: {fmt(results.harvestSaving)}</p>}
              {results.charitableStockSaving > 0 && <p className="text-sm text-[#0D0F13]/70">🏛️ Charitable stock donation: {fmt(results.charitableStockSaving)}</p>}
            </div>
          </div>

          <div className="card !p-5 mt-4 flex items-center gap-4">
            <span className="text-3xl">💡</span>
            <div>
              <p className="text-sm font-bold">Your effective tax rate: {results.effectiveRate}%</p>
              <p className="text-sm text-[var(--muted)]">{Number(results.effectiveRate) < 18 ? "You are doing great! WelloFI is keeping your rate well below the national average." : "There is room to optimize. Let WelloFI's agents find more savings for you."}</p>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <DashLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-1">Form 1040 Builder 🧾</h1>
        <p className="text-[var(--muted)] mb-8">Walk through your federal tax return step by step. See exactly where your money goes and how WelloFI optimizes it.</p>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {steps.map((s, i) => (
            <button key={i} onClick={() => setStep(i)} className={"flex-1 py-2.5 rounded-2xl text-xs font-semibold transition-all " + (i === step ? "gradient-lime text-[#0D0F13]" : i < step ? "bg-[var(--lime-glow)] text-[#00915A]" : "bg-[var(--bg)] text-[var(--muted)] border border-[var(--border)]")}>
              {s.emoji} {s.title.split(" ").slice(0,2).join(" ")}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="card animate-in" key={step}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{steps[step].emoji}</span>
                <div>
                  <h2 className="text-xl font-extrabold">{steps[step].title}</h2>
                  <span className="text-xs text-[var(--muted)] font-medium">{steps[step].line}</span>
                </div>
              </div>
              {steps[step].content}
              <div className="flex justify-between mt-8">
                {step > 0 ? <button onClick={() => setStep(step - 1)} className="btn btn-ghost text-sm">← Back</button> : <div />}
                {step < steps.length - 1 ? <button onClick={() => setStep(step + 1)} className="btn btn-primary text-sm">Continue →</button> : <div />}
              </div>
            </div>
          </div>

          {/* Live Summary */}
          <div className="space-y-4">
            <div className={"card !p-5 " + (results.owedOrRefund <= 0 ? "" : "")}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--muted)] mb-3">Live Summary</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between"><span className="text-[var(--muted)]">Total Income</span><span className="font-bold">{fmt(results.totalIncome)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted)]">- Adjustments</span><span className="font-bold">({fmt(results.adjustments)})</span></div>
                <div className="flex justify-between border-t border-[var(--border)] pt-2"><span className="text-[var(--muted)]">AGI</span><span className="font-bold">{fmt(results.agi)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted)]">- Deduction</span><span className="font-bold">({fmt(results.deduction)})</span></div>
                <div className="flex justify-between border-t border-[var(--border)] pt-2"><span className="text-[var(--muted)]">Tax</span><span className="font-bold">{fmt(results.totalTax)}</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted)]">- Credits</span><span className="font-bold">({fmt(results.credits)})</span></div>
                <div className="flex justify-between"><span className="text-[var(--muted)]">- Payments</span><span className="font-bold">({fmt(results.totalPayments)})</span></div>
                <div className={"flex justify-between border-t-2 pt-3 " + (results.owedOrRefund <= 0 ? "border-[var(--lime)]" : "border-[var(--coral)]")}>
                  <span className="font-bold">{results.owedOrRefund <= 0 ? "Refund" : "Owed"}</span>
                  <span className={"text-xl font-extrabold " + (results.owedOrRefund <= 0 ? "text-[var(--lime)]" : "text-[var(--coral)]")}>{fmt(Math.abs(results.owedOrRefund))}</span>
                </div>
              </div>
            </div>

            <div className="card !p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--muted)] mb-3">Tax Bracket</h3>
              <div className="space-y-1.5">
                {brackets2026.map((b, i) => {
                  const taxable = Math.max(0, results.agi - results.deduction);
                  const active = taxable > b.min;
                  const filled = Math.min(100, Math.max(0, ((taxable - b.min) / (b.max === Infinity ? 1000000 : b.max - b.min)) * 100));
                  return (
                    <div key={i} className={"text-xs flex items-center gap-2 " + (active ? "" : "opacity-30")}>
                      <span className="w-8 font-bold">{b.rate}%</span>
                      <div className="flex-1 h-2 rounded-full bg-[var(--bg)] overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: filled + "%", background: active ? "var(--lime)" : "var(--border)" }} />
                      </div>
                      <span className="w-16 text-right text-[var(--muted)]">{b.max === Infinity ? "$626K+" : "$" + (b.max/1000).toFixed(0) + "K"}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {results.totalWellofiSavings > 0 && (
              <div className="card !p-5 border-[var(--lime)]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--lime)] mb-2">🛡️ WelloFI Savings</h3>
                <p className="text-2xl font-extrabold text-[var(--lime)]">{fmt(results.totalWellofiSavings)}</p>
                <p className="text-xs text-[var(--muted)] mt-1">Your agents are saving you money</p>
              </div>
            )}

            <div className="card !p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--muted)] mb-2">Effective Rate</h3>
              <p className="text-3xl font-extrabold gradient-text">{results.effectiveRate}%</p>
              <div className="w-full h-3 bg-[var(--bg)] rounded-full mt-3 overflow-hidden">
                <div className="h-full rounded-full gradient-lime transition-all duration-500" style={{ width: Math.min(100, Number(results.effectiveRate) * 2.5) + "%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashLayout>
  );
}
