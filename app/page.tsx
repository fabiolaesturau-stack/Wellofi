"use client";
import Link from "next/link";
import { useState } from "react";

const agentList = [
  { name: "TaxShield", desc: "Tax-loss harvesting, Roth conversions, capital gains timing, state tax strategies.", color: "#00C9A7", icon: "🛡️" },
  { name: "PortfolioSync", desc: "Asset allocation, automated rebalancing, factor-based and ESG investing.", color: "#3B82F6", icon: "📊" },
  { name: "EstatePlan", desc: "Trust optimization, inheritance structuring, beneficiary analysis, charitable giving.", color: "#8B5CF6", icon: "🏛️" },
  { name: "RiskGuard", desc: "Volatility monitoring, insurance gap analysis, scenario modeling, downside protection.", color: "#F59E0B", icon: "⚠️" },
  { name: "GoalTracker", desc: "Retirement projections, education funding, home purchase planning, milestone tracking.", color: "#EC4899", icon: "🎯" },
  { name: "CashFlow", desc: "Income optimization, emergency fund sizing, debt payoff strategies, yield maximization.", color: "#06B6D4", icon: "💰" },
];

const tiers = [
  { name: "Starter", price: "0.50%", fee: "Free", min: "$10K", features: ["3 Active Agents", "Portfolio + Tax + Goals", "Chat Support", "Tax-Loss Harvesting"] },
  { name: "Professional", price: "0.40%", fee: "$49/mo", min: "$250K", pop: true, features: ["All 6 Agents", "Quarterly Video Calls", "Estate Planning", "Priority Support"] },
  { name: "Family Office", price: "0.35%", fee: "$199/mo", min: "$2M", features: ["All 6 + Custom Agents", "Dedicated Advisor Team", "Full Family Coverage", "White-Glove Onboarding"] },
];

const faqs = [
  { q: "How do the agents work together?", a: "Each agent specializes in one domain. They communicate through a coordination layer, ensuring every decision is evaluated across tax, risk, estate, and goal dimensions before execution." },
  { q: "Is my money safe?", a: "WelloFI is a registered investment adviser (RIA) under a fiduciary standard. Your assets are held at a third-party custodian. All actions pass through compliance with human oversight. SOC 2 Type II certified." },
  { q: "How is this different from Betterment?", a: "Traditional robo-advisors use a single algorithm. WelloFI deploys six specialized agents that coordinate in real time, supervised by human advisors. Tax, estate, risk, and portfolio all work together." },
  { q: "Can I talk to a human?", a: "Yes. Every tier includes human advisor access: chat support on Starter, quarterly video calls on Professional, and a dedicated team on Family Office." },
];

export default function Home() {
  const [faq, setFaq] = useState<number|null>(null);
  return (
    <div className="min-h-screen bg-[var(--navy)]">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[var(--navy)]/95 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--teal)] flex items-center justify-center font-bold text-white text-sm">W</div>
            <span className="text-white text-xl font-bold">WelloFI</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-white/50">
            <a href="#agents" className="hover:text-white transition-colors">Agents</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:flex items-center">Log In</Link>
            <Link href="/onboarding" className="btn btn-primary text-sm !py-2.5 !px-5">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 md:pt-44 md:pb-36 px-6 relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--teal)]/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--gold)]/5 blur-[100px]" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[var(--teal)]/30 bg-[var(--teal)]/5">
            <span className="text-[var(--teal)] text-sm font-medium">6 Specialized Agents Working 24/7</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Your Wealth, <span className="gradient-text">Coordinated</span><br/>Like Never Before
          </h1>
          <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-10">
            WelloFI deploys a network of specialized agents that optimize your taxes, manage your portfolio, plan your estate, and keep every financial goal on track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/onboarding" className="btn btn-primary text-base !py-3.5 !px-8">Start Building Wealth →</Link>
            <Link href="/dashboard" className="btn btn-outline !border-white/20 !text-white/60 text-base !py-3.5 !px-8">View Demo Dashboard</Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/25 text-sm">
            <span>✓ SEC Registered RIA</span><span>✓ Fiduciary Standard</span><span>✓ SOC 2 Certified</span>
          </div>
        </div>
      </section>

      {/* Agents */}
      <section id="agents" className="py-24 px-6 bg-gradient-to-b from-[var(--navy)] to-[#0a1628]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">Six Agents, One Mission</h2>
          <p className="text-white/35 text-lg max-w-xl mx-auto text-center mb-16">Each agent is a specialist. Together, they form the most coordinated wealth team you have ever had.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentList.map((a,i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all">
                <div className="text-3xl mb-4">{a.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2" style={{fontFamily:'DM Sans'}}>{a.name}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-[#0a1628]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 text-center">How WelloFI Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { n: "01", t: "Tell Us Your Goals", d: "Complete a quick questionnaire about your finances, risk tolerance, and timeline." },
              { n: "02", t: "Agents Get to Work", d: "Six agents analyze your profile and begin coordinating tax, portfolio, and goal strategies." },
              { n: "03", t: "Grow with Confidence", d: "Monitor agents in real time. Meet with human advisors. Watch your wealth grow." },
            ].map((s,i) => (
              <div key={i}>
                <span className="text-5xl font-bold gradient-text">{s.n}</span>
                <h3 className="text-white font-bold text-xl mt-4 mb-3" style={{fontFamily:'DM Sans'}}>{s.t}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 bg-[var(--teal)]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{v:"$405M+",l:"Assets Managed"},{v:"6",l:"Specialized Agents"},{v:"$12.4K",l:"Avg. Tax Savings/yr"},{v:"24/7",l:"Monitoring"}].map((s,i)=>(
            <div key={i}><div className="text-3xl md:text-4xl font-bold text-white">{s.v}</div><div className="text-white/70 text-sm mt-1">{s.l}</div></div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-[#0a1628]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center">Simple, Transparent Pricing</h2>
          <p className="text-white/35 text-lg text-center mb-16">No hidden fees. Just aligned incentives.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((t,i) => (
              <div key={i} className={`rounded-2xl p-8 ${t.pop ? "bg-[var(--teal)] text-white scale-[1.02] shadow-2xl shadow-[var(--teal)]/20" : "bg-white/[0.03] border border-white/[0.06] text-white"}`}>
                {t.pop && <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">Most Popular</span>}
                <h3 className="text-2xl font-bold mt-3" style={{fontFamily:'DM Sans'}}>{t.name}</h3>
                <div className="mt-4"><span className="text-4xl font-bold">{t.price}</span><span className={`text-sm ${t.pop?"text-white/70":"text-white/35"}`}> AUM + {t.fee}</span></div>
                <p className={`text-sm mt-1 ${t.pop?"text-white/70":"text-white/35"}`}>Min. {t.min}</p>
                <ul className="mt-6 space-y-3">{t.features.map((f,j) => <li key={j} className="flex items-center gap-2.5 text-sm"><span className={t.pop?"":"text-[var(--teal)]"}>✓</span> {f}</li>)}</ul>
                <Link href="/onboarding" className={`block mt-8 text-center py-3 rounded-xl font-semibold text-sm transition-all ${t.pop?"bg-white text-[var(--teal)] hover:bg-white/90":"bg-white/10 hover:bg-white/15"}`}>Get Started</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-[var(--navy)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((f,i) => (
              <div key={i} className="rounded-2xl border border-white/[0.06] overflow-hidden">
                <button onClick={() => setFaq(faq===i?null:i)} className="w-full flex items-center justify-between p-5 text-left text-white font-medium hover:bg-white/[0.02]">
                  {f.q} <span className={`transition-transform ${faq===i?"rotate-180":""}`}>▾</span>
                </button>
                {faq===i && <div className="px-5 pb-5 text-white/35 text-sm leading-relaxed animate-in">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[var(--teal)] to-[var(--teal-dark)] text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Ready to Put Your Wealth to Work?</h2>
        <p className="text-white/70 text-lg mb-10">Let six specialized agents optimize every dimension of your financial life.</p>
        <Link href="/onboarding" className="inline-flex items-center gap-2 bg-white text-[var(--teal-dark)] font-bold py-4 px-10 rounded-xl text-lg hover:bg-white/90 transition-all">Get Started Now →</Link>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[var(--navy)] border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-lg bg-[var(--teal)] flex items-center justify-center font-bold text-white text-xs">W</div><span className="text-white font-bold">WelloFI</span></div>
          <div className="flex gap-6 text-sm text-white/25"><span>Privacy</span><span>Terms</span><span>Disclosures</span><span>Contact</span></div>
          <p className="text-white/15 text-xs">© 2026 WelloFI Inc.</p>
        </div>
      </footer>
    </div>
  );
}
