"use client";
import DashLayout from "@/components/DashLayout";
import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

const R: Record<string, string> = {
  tax: "Great question about taxes! 🛡️\n\nWelloFI's TaxShield agent constantly scans your portfolio for tax optimization opportunities. The three biggest strategies we use are:\n\n**1. Tax-loss harvesting** - selling positions at a loss to offset your capital gains. This year alone, TaxShield has saved clients an average of $12,480.\n\n**2. Roth conversions** - strategically converting Traditional IRA funds to Roth when you're in a lower tax bracket.\n\n**3. Asset location** - putting tax-inefficient investments (like bonds) in tax-deferred accounts, and tax-efficient ones (like index funds) in taxable accounts.\n\nWant me to dig deeper into any of these strategies?\n\n*This is educational guidance, not personalized financial advice.*",
  retire: "Let's talk retirement! 🏖️\n\n**The 25x Rule**: You need roughly 25 times your annual expenses saved. Spending $80K/year? Aim for $2M.\n\n**Key levers you can pull:**\n- Save more (even $200/mo extra compounds massively)\n- Invest more aggressively while young\n- Delay retirement by 1-2 years (huge impact)\n- Minimize taxes along the way with TaxShield\n\nYour GoalTracker agent adjusts projections in real-time based on market conditions. At your current rate, you're on track for 2048. Check the Goals page for details!\n\n*This is educational guidance, not personalized financial advice.*",
  portfolio: "Let's talk portfolio! 📊\n\n**Your Current Mix:**\n- US Equity: 44% (VTI, VUG)\n- International: 17% (VXUS)\n- Fixed Income: 20% (AGG, SCHP)\n- Real Estate: 8% (VNQ)\n- Commodities: 6% (GLD)\n- Cash: 5%\n\n**Why this mix?** It balances growth with protection. PortfolioSync rebalances when any class drifts 3%+ from target, which adds ~0.3-0.5% in annual returns through disciplined 'buy low, sell high.'\n\nTry the Simulator to experiment with different allocations! 🔮\n\n*This is educational guidance, not personalized financial advice.*",
  risk: "Risk management is key! ⚡\n\n**Your Portfolio Beta**: 0.98 (moves roughly with the market). RiskGuard recently reduced this from 1.12.\n\n**What RiskGuard does 24/7:**\n- Runs thousands of market scenarios (2008 crash, rate hikes, inflation)\n- Monitors volatility across all positions\n- Identifies insurance gaps in your coverage\n- Adjusts downside protection dynamically\n\nRemember: risk isn't about avoiding all losses. It's about making sure losses never threaten your financial goals.\n\n*This is educational guidance, not personalized financial advice.*",
  estate: "Estate planning protects your legacy! 🏛️\n\n**Key Strategies EstatePlan Uses:**\n\n**1. Charitable Stock Donations** - Donate appreciated stock directly instead of cash. You skip capital gains tax AND get the full deduction. This is one of the most powerful strategies.\n\n**2. Trust Optimization** - Properly structured trusts can save significant estate taxes and transfer wealth exactly as you wish.\n\n**3. Beneficiary Reviews** - EstatePlan regularly checks all account beneficiaries are current. This is often overlooked but critically important.\n\n*This is educational guidance, not personalized financial advice.*",
  stock: "Let's talk investing! 📈\n\n**WelloFI's Investment Philosophy:**\n\n**1. Index-first**: 90%+ of active funds underperform over 15 years. We use low-cost ETFs (VTI, VXUS, VUG) as the core.\n\n**2. Factor tilts**: We tilt toward value, small-cap, quality, and momentum factors that historically provide excess returns.\n\n**3. Copy the best**: Check out the Invest page to see strategies inspired by legends like Warren Buffett, Ray Dalio, and Cathie Wood.\n\n**4. Stay disciplined**: PortfolioSync handles rebalancing so emotions never drive decisions.\n\nHead to the Invest page to see live prices and explore strategies! 💎\n\n*This is educational guidance, not personalized financial advice.*",
  hello: "Hey there! 👋 Great to see you!\n\nI'm your WelloFI financial advisor. I can help with:\n\n🛡️ Tax optimization strategies\n📊 Portfolio allocation questions\n🎯 Retirement planning\n📈 Stock market and investing\n🏛️ Estate planning\n💰 Cash management\n\nWhat would you like to talk about?",
  def: "That's a great question! 💚\n\nLet me point you in the right direction:\n\n🛡️ **Tax help** → ask about 'tax strategies' or try the Tax Calculator\n📊 **Portfolio** → ask about 'allocation' or visit your Portfolio page\n🔮 **Projections** → try the Simulator to model scenarios\n📈 **Investing** → ask about 'stocks' or visit the Invest page\n🧾 **Tax forms** → check out the Form 1040 Builder\n\nTry asking something like:\n- 'How do I reduce my taxes?'\n- 'Should I do a Roth conversion?'\n- 'What stocks should I look at?'\n- 'Am I saving enough for retirement?'\n\n*I provide educational guidance, not personalized financial advice.*",
};

function getR(input: string): string {
  const l = input.toLowerCase();
  if (l.includes("hi") || l.includes("hello") || l.includes("hey") || l.includes("hola")) return R.hello;
  if (l.includes("tax") || l.includes("harvest") || l.includes("roth") || l.includes("deduct") || l.includes("1040")) return R.tax;
  if (l.includes("retire") || l.includes("401k") || l.includes("pension") || l.includes("goal")) return R.retire;
  if (l.includes("portfolio") || l.includes("allocat") || l.includes("rebalance") || l.includes("divers")) return R.portfolio;
  if (l.includes("risk") || l.includes("volatil") || l.includes("crash") || l.includes("protect") || l.includes("beta")) return R.risk;
  if (l.includes("estate") || l.includes("trust") || l.includes("inherit") || l.includes("charit")) return R.estate;
  if (l.includes("stock") || l.includes("invest") || l.includes("buy") || l.includes("etf") || l.includes("market") || l.includes("trade") || l.includes("share")) return R.stock;
  return R.def;
}

export default function Advisor() {
  const [msgs, setMsgs] = useState<Message[]>([{ role:"assistant", content:"Hi! 👋 I'm your WelloFI advisor. Ask me anything about taxes, investing, retirement, or your portfolio.\n\nOr try one of the quick questions below!" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs]);

  const send = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim() || loading) return;
    const userMsg: Message = { role:"user", content:msg };
    setMsgs(p=>[...p, userMsg]);
    setInput("");
    setLoading(true);

    // Try live API first
    try {
      const res = await fetch("/api/chat", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ messages:[...msgs, userMsg].map(m=>({role:m.role,content:m.content})) }) });
      if (res.ok) { const d = await res.json(); if (d.reply && !d.reply.includes("went wrong")) { setMsgs(p=>[...p,{role:"assistant",content:d.reply}]); setLoading(false); return; } }
    } catch(e) {}

    // Fallback: smart responses
    await new Promise(r=>setTimeout(r, 600+Math.random()*1000));
    setMsgs(p=>[...p,{role:"assistant",content:getR(msg)}]);
    setLoading(false);
  };

  const quick = ["How can I reduce my taxes?","Am I on track for retirement?","Explain my portfolio","Should I invest in stocks?","What is tax-loss harvesting?","Tell me about estate planning"];

  return (
    <DashLayout>
      <div className="max-w-3xl mx-auto h-[calc(100vh-120px)] flex flex-col">
        <div className="mb-4"><h1 className="text-2xl md:text-3xl font-extrabold">Ask Your Advisor 💬</h1><p className="text-[var(--muted)] text-sm">Real answers about your finances. Available 24/7.</p></div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
          {msgs.map((m,i) => (
            <div key={i} className={"flex " + (m.role==="user"?"justify-end":"justify-start") + " animate-in"}>
              <div className={"max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed " + (m.role==="user"?"gradient-lime text-[#0D0F13] rounded-br-md":"bg-[var(--card)] border border-[var(--border)] rounded-bl-md")}>
                {m.role==="assistant" && <span className="text-xs font-bold text-[var(--lime)] block mb-2">WelloFI Advisor 🧠</span>}
                <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{__html:m.content.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}} />
              </div>
            </div>
          ))}
          {loading && <div className="flex justify-start animate-in"><div className="bg-[var(--card)] border border-[var(--border)] p-4 rounded-2xl rounded-bl-md"><span className="text-xs font-bold text-[var(--lime)] block mb-2">WelloFI Advisor 🧠</span><div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--lime)] animate-pulse2"/><div className="w-2 h-2 rounded-full bg-[var(--lime)] animate-pulse2" style={{animationDelay:"0.2s"}}/><div className="w-2 h-2 rounded-full bg-[var(--lime)] animate-pulse2" style={{animationDelay:"0.4s"}}/></div></div></div>}
          <div ref={ref}/>
        </div>

        {msgs.length<=2 && <div className="flex flex-wrap gap-2 mb-3">{quick.map((q,i)=>(<button key={i} onClick={()=>send(q)} className="px-4 py-2 rounded-full text-xs font-semibold bg-[var(--lime-glow)] text-[#00915A] hover:bg-[var(--lime)] hover:text-[#0D0F13] transition-all">{q}</button>))}</div>}

        <div className="flex gap-3">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask about taxes, investing, retirement..." className="flex-1 px-5 py-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-sm font-medium" />
          <button onClick={()=>send()} disabled={loading} className="btn btn-primary !px-6 !rounded-2xl disabled:opacity-50">{loading?"...":"→"}</button>
        </div>
      </div>
    </DashLayout>
  );
}
