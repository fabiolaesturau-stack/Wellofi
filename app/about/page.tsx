"use client";
import Link from "next/link";

const team = [
  { name: "Alex Rivera", role: "CEO & Co-Founder", bio: "Former VP at Goldman Sachs. 15 years in wealth management. MBA from Wharton.", emoji: "👔", color: "#00DC6F" },
  { name: "Dr. Maya Chen", role: "CTO & Co-Founder", bio: "Ex-Google DeepMind. PhD in Machine Learning from Stanford. Built trading systems at Citadel.", emoji: "💻", color: "#4DABF7" },
  { name: "Sarah Okonkwo", role: "Chief Compliance Officer", bio: "Former SEC examiner. 12 years in securities law. JD from Columbia.", emoji: "⚖️", color: "#7B61FF" },
  { name: "James Park", role: "Head of Advisory", bio: "CFP, CFA. Former lead advisor at Vanguard Personal Advisor Services. 20 years advising families.", emoji: "🎯", color: "#FFB347" },
  { name: "Priya Sharma", role: "Head of Engineering", bio: "Ex-Stripe and Plaid. Built payment infrastructure serving 100M+ users.", emoji: "⚡", color: "#FF6B6B" },
  { name: "Marcus Thompson", role: "Head of Product", bio: "Former product lead at Robinhood and Betterment. Obsessed with making finance simple.", emoji: "🎨", color: "#00DC6F" },
];

const values = [
  { title: "Fiduciary First", desc: "Every decision we make, every agent we deploy, serves your interest above all else. That is not a tagline, it is a legal obligation we embrace.", emoji: "⚖️" },
  { title: "Radical Transparency", desc: "You see every action every agent takes. No black boxes. No hidden fees. No surprises. Ever.", emoji: "🔍" },
  { title: "Human + Machine", desc: "Technology handles the scale and speed. Humans provide the judgment and empathy. Together, they are unstoppable.", emoji: "🤝" },
  { title: "Wealth for All", desc: "Institutional-grade financial intelligence should not be reserved for the ultra-wealthy. We are democratizing the advisory team.", emoji: "💚" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl gradient-lime flex items-center justify-center font-extrabold text-[#0D0F13] text-lg">W</div>
            <span className="text-xl font-extrabold">WelloFI</span>
          </Link>
          <Link href="/dashboard" className="btn btn-primary text-sm !py-2.5 !px-5">Go to Dashboard →</Link>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="blob w-[600px] h-[600px] bg-[var(--lime)] top-[-200px] left-[-200px] opacity-[0.06]" />
        <div className="max-w-4xl mx-auto relative">
          <span className="badge badge-lime mb-6">About WelloFI</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">We believe everyone<br/>deserves a <span className="gradient-text">wealth team</span></h1>
          <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">WelloFI was founded on a simple idea: the same coordinated, multi-strategy wealth management that serves billionaires should be available to every American family.</p>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--bg)]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Our Values 💚</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="card flex gap-4 items-start hover:scale-[1.01]">
                <span className="text-3xl">{v.emoji}</span>
                <div><h3 className="text-lg font-bold mb-1">{v.title}</h3><p className="text-sm text-[var(--muted)] leading-relaxed">{v.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">The Team 🙌</h2>
          <p className="text-center text-[var(--muted)] mb-12 text-lg">World-class talent from finance, technology, and regulation.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((t, i) => (
              <div key={i} className="card text-center hover:scale-[1.02] transition-all">
                <div className="w-16 h-16 rounded-3xl mx-auto mb-4 flex items-center justify-center text-3xl" style={{background: t.color + "15"}}>{t.emoji}</div>
                <h3 className="text-lg font-bold">{t.name}</h3>
                <p className="text-sm font-semibold mb-2" style={{color: t.color}}>{t.role}</p>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--dark)] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Join us on this mission 🚀</h2>
          <p className="text-white/50 text-lg mb-10">We are just getting started. Be one of the first families to experience what coordinated wealth management really feels like.</p>
          <Link href="/onboarding" className="btn btn-primary text-lg !py-4 !px-10 !rounded-2xl">Get Started Free →</Link>
        </div>
      </section>

      <footer className="py-10 px-6 bg-[var(--dark)] border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-xl gradient-lime flex items-center justify-center font-extrabold text-[#0D0F13] text-sm">W</div><span className="text-white font-bold">WelloFI</span></div>
          <p className="text-white/20 text-xs">&copy; 2026 WelloFI Inc. SEC Registered RIA.</p>
        </div>
      </footer>
    </div>
  );
}
