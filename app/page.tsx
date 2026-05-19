"use client";
import Link from "next/link";
import { useState } from "react";

const agentCards = [
  { name: "TaxShield", emoji: "🛡️", desc: "Finds every tax-saving opportunity. Harvests losses, optimizes Roth conversions, and times capital gains perfectly.", color: "#00DC6F", bg: "from-green-50 to-emerald-50" },
  { name: "PortfolioSync", emoji: "📊", desc: "Keeps your portfolio perfectly balanced. Smart rebalancing, factor investing, and ESG alignment on autopilot.", color: "#4DABF7", bg: "from-blue-50 to-sky-50" },
  { name: "EstatePlan", emoji: "🏛️", desc: "Protects your legacy. Trust optimization, inheritance planning, and charitable giving strategies that save millions.", color: "#7B61FF", bg: "from-violet-50 to-purple-50" },
  { name: "RiskGuard", emoji: "⚡", desc: "Your financial bodyguard. Monitors volatility, identifies insurance gaps, and runs scenario models 24/7.", color: "#FFB347", bg: "from-amber-50 to-orange-50" },
  { name: "GoalTracker", emoji: "🎯", desc: "Maps your path to every milestone. Retirement, college, your dream home. Real-time projections that adapt.", color: "#FF6B6B", bg: "from-red-50 to-rose-50" },
  { name: "CashFlow", emoji: "💰", desc: "Makes every dollar work harder. Optimizes income, sizes emergency funds, and maximizes yield on idle cash.", color: "#00DC6F", bg: "from-green-50 to-teal-50" },
];

const tiers = [
  { name: "Starter", emoji: "🌱", price: "0.50%", fee: "Free", min: "$10K", features: ["3 Active Agents", "Portfolio + Tax + Goals", "Chat Support", "Tax-Loss Harvesting", "Mobile App"] },
  { name: "Professional", emoji: "🚀", price: "0.40%", fee: "$49/mo", min: "$250K", pop: true, features: ["All 6 Agents", "Quarterly Video Calls", "Estate Planning", "Custom Risk Profiles", "Priority Support"] },
  { name: "Family Office", emoji: "👑", price: "0.35%", fee: "$199/mo", min: "$2M", features: ["All 6 + Custom Agents", "Dedicated Advisor Team", "Full Family Coverage", "Multi-Entity Coordination", "White-Glove Service"] },
];

const faqs = [
  { q: "How do the agents actually work together?", a: "Think of it like having 6 financial experts in a room, all talking to each other about your money. TaxShield finds a savings opportunity, checks with PortfolioSync if the trade makes sense, and RiskGuard confirms it won't increase your risk. All in milliseconds, 24/7." },
  { q: "Is my money safe?", a: "Absolutely. We're a registered investment adviser (RIA) with a fiduciary duty. Your assets sit at a regulated third-party custodian, not with us. SOC 2 Type II certified, end-to-end encrypted, and every agent action has human oversight." },
  { q: "How is this different from Betterment or Wealthfront?", a: "They use one algorithm for everything. We deploy six specialized agents that coordinate in real time, plus human advisors. It's like comparing a Swiss Army knife to a team of specialists." },
  { q: "Can I talk to a real human?", a: "Always. Every plan includes human advisor access. Starter gets chat, Pro gets quarterly video calls, Family Office gets a dedicated advisory team that knows your name." },
];

export default function Home() {
  const [faq, setFaq] = useState<number|null>(null);
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl gradient-lime flex items-center justify-center font-extrabold text-dark text-lg">W</div>
            <span className="text-xl font-extrabold tracking-tight">WelloFI</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-[var(--muted)] font-medium">
            <a href="#agents" className="hover:text-[var(--text)] transition-colors">Agents</a>
            <a href="#how" className="hover:text-[var(--text)] transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-[var(--text)] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[var(--text)] transition-colors">FAQ</a>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard" className="btn btn-ghost text-sm !py-2.5 !px-5 hidden sm:flex">Log In</Link>
            <Link href="/onboarding" className="btn btn-primary text-sm !py-2.5 !px-5">Get Started Free →</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 md:pt-40 md:pb-32 px-6 relative overflow-hidden">
        <div className="blob w-[600px] h-[600px] bg-[var(--lime)] top-[-100px] left-[-200px] opacity-[0.07]" />
        <div className="blob w-[500px] h-[500px] bg-[var(--purple)] bottom-[-100px] right-[-200px] opacity-[0.06]" />
        <div className="blob w-[300px] h-[300px] bg-[var(--sky)] top-[50%] left-[50%] opacity-[0.05]" />
        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full bg-[var(--lime-glow)] border border-[var(--lime)]/20">
            <span className="w-2 h-2 rounded-full bg-[var(--lime)] animate-pulse" />
            <span className="text-sm font-semibold text-[#00915A]">6 Agents Working For You Right Now</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] mb-8 tracking-tight">
            Your wealth<br/>deserves a <span className="gradient-text">whole team</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--muted)] max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Six specialized agents coordinate 24/7 to cut your taxes, grow your portfolio, and hit every financial goal. All with human advisors watching over everything.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/onboarding" className="btn btn-primary text-lg !py-4 !px-10 !rounded-2xl">Start for Free →</Link>
            <Link href="/dashboard" className="btn btn-ghost text-lg !py-4 !px-10 !rounded-2xl">See It In Action</Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-[var(--muted)] text-sm font-medium">
            <span className="flex items-center gap-2">🔒 SEC Registered</span>
            <span className="flex items-center gap-2">⚖️ Fiduciary</span>
            <span className="flex items-center gap-2">🛡️ SOC 2 Certified</span>
            <span className="flex items-center gap-2">💚 No minimums to start</span>
          </div>
        </div>
      </section>

      {/* Agent Parade */}
      <section id="agents" className="py-24 px-6 bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge badge-lime mb-4">Meet Your Team</span>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4">Six agents.<br/>One mission. 🎯</h2>
            <p className="text-xl text-[var(--muted)] max-w-xl mx-auto">Each one is a specialist. Together, they are the most powerful wealth team you have ever had.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {agentCards.map((a,i) => (
              <div key={i} className={"p-7 rounded-3xl bg-gradient-to-br " + a.bg + " border border-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-default"}>
                <div className="text-4xl mb-4">{a.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{a.name}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge badge-purple mb-4">Dead Simple</span>
            <h2 className="text-4xl md:text-6xl font-extrabold">Three steps to<br/>smarter money 💸</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "1", emoji: "📝", t: "Tell us your goals", d: "Quick questionnaire about your finances, risk tolerance, and what you want to achieve. Takes 3 minutes.", color: "var(--lime)" },
              { n: "2", emoji: "🤖", t: "Agents get to work", d: "Six agents analyze everything and start coordinating. Tax strategies, portfolio moves, goal projections, all at once.", color: "var(--purple)" },
              { n: "3", emoji: "📈", t: "Watch it grow", d: "Monitor from your dashboard. Chat with human advisors. See your wealth grow and your tax bill shrink.", color: "var(--sky)" },
            ].map((s,i) => (
              <div key={i} className="text-center p-8 rounded-3xl bg-[var(--bg)] border border-[var(--border)] hover:border-transparent hover:shadow-lg transition-all">
                <div className="text-5xl mb-5">{s.emoji}</div>
                <div className="w-10 h-10 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold" style={{background:s.color}}>{s.n}</div>
                <h3 className="text-xl font-bold mb-3">{s.t}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 px-6 gradient-lime">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{v:"$405M+",l:"Assets Managed",e:"💰"},{v:"6",l:"Specialized Agents",e:"🤖"},{v:"$12.4K",l:"Avg. Tax Savings/yr",e:"🛡️"},{v:"24/7",l:"Always Watching",e:"👁️"}].map((s,i)=>(
            <div key={i}>
              <div className="text-2xl mb-2">{s.e}</div>
              <div className="text-3xl md:text-4xl font-extrabold text-[var(--dark)]">{s.v}</div>
              <div className="text-[var(--dark)]/60 text-sm mt-1 font-medium">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge badge-amber mb-4">Pricing</span>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4">Transparent.<br/>Always. 🤝</h2>
            <p className="text-xl text-[var(--muted)]">No hidden fees. Your success is our success.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((t,i) => (
              <div key={i} className={"rounded-3xl p-8 transition-all duration-300 " + (t.pop ? "bg-[var(--dark)] text-white scale-[1.03] shadow-2xl ring-2 ring-[var(--lime)]" : "bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--lime)]")}>
                <div className="text-3xl mb-3">{t.emoji}</div>
                {t.pop && <span className="badge bg-[var(--lime)] text-[var(--dark)] text-xs mb-3">Most Popular</span>}
                <h3 className="text-2xl font-extrabold">{t.name}</h3>
                <div className="mt-3"><span className="text-4xl font-extrabold">{t.price}</span><span className={"text-sm " + (t.pop?"text-white/60":"text-[var(--muted)]")}> AUM + {t.fee}</span></div>
                <p className={"text-sm mt-1 " + (t.pop?"text-white/50":"text-[var(--muted)]")}>Min. {t.min}</p>
                <ul className="mt-6 space-y-3">{t.features.map((f,j) => <li key={j} className="flex items-center gap-3 text-sm"><span className={"text-base " + (t.pop?"":"")}>✓</span> {f}</li>)}</ul>
                <Link href="/onboarding" className={"block mt-8 text-center py-3.5 rounded-2xl font-bold text-sm transition-all " + (t.pop ? "bg-[var(--lime)] text-[var(--dark)] hover:bg-[var(--lime-dark)]" : "bg-white border-2 border-[var(--border)] hover:border-[var(--lime)] hover:bg-[var(--lime-glow)]")}>
                  Get Started →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-[var(--bg)]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold">Got questions? 🙋</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f,i) => (
              <div key={i} className="rounded-2xl bg-white border border-[var(--border)] overflow-hidden hover:border-[var(--lime)] transition-colors">
                <button onClick={() => setFaq(faq===i?null:i)} className="w-full flex items-center justify-between p-6 text-left font-semibold text-[var(--text)] hover:bg-[var(--bg)]/50 transition-colors">
                  {f.q} <span className={"text-2xl transition-transform duration-300 " + (faq===i?"rotate-45":"")} style={{color:"var(--lime)"}}>+</span>
                </button>
                {faq===i && <div className="px-6 pb-6 text-[var(--muted)] leading-relaxed animate-in">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[var(--dark)] relative overflow-hidden">
        <div className="blob w-[400px] h-[400px] bg-[var(--lime)] top-[-100px] right-[-100px] opacity-[0.1]" />
        <div className="blob w-[300px] h-[300px] bg-[var(--purple)] bottom-[-100px] left-[-100px] opacity-[0.1]" />
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Ready to level up<br/>your wealth?</h2>
          <p className="text-xl text-white/50 mb-12">Join thousands of families who put their money on autopilot.</p>
          <Link href="/onboarding" className="btn btn-primary text-lg !py-4 !px-12 !rounded-2xl">Get Started Free →</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[var(--dark)] border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-lime flex items-center justify-center font-extrabold text-dark text-sm">W</div>
            <span className="text-white font-bold">WelloFI</span>
          </div>
          <div className="flex gap-6 text-sm text-white/30 font-medium"><span>Privacy</span><span>Terms</span><span>Disclosures</span><span>Contact</span></div>
          <p className="text-white/20 text-xs">&copy; 2026 WelloFI Inc. SEC Registered RIA.</p>
        </div>
      </footer>
    </div>
  );
}
