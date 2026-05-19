"use client";
import DashLayout from "@/components/DashLayout";
import { useState, useEffect, useMemo } from "react";

const initialStocks = [
  { ticker:"AAPL", name:"Apple Inc.", price:198.50, change:2.34, pct:1.19, vol:"52.3M", cap:"3.05T", sector:"Technology" },
  { ticker:"MSFT", name:"Microsoft Corp.", price:442.80, change:5.12, pct:1.17, vol:"28.1M", cap:"3.29T", sector:"Technology" },
  { ticker:"GOOGL", name:"Alphabet Inc.", price:178.90, change:-1.23, pct:-0.68, vol:"31.2M", cap:"2.20T", sector:"Technology" },
  { ticker:"AMZN", name:"Amazon.com Inc.", price:195.40, change:3.67, pct:1.91, vol:"45.8M", cap:"2.02T", sector:"Consumer" },
  { ticker:"NVDA", name:"NVIDIA Corp.", price:135.20, change:4.56, pct:3.49, vol:"89.2M", cap:"3.32T", sector:"Technology" },
  { ticker:"TSLA", name:"Tesla Inc.", price:284.30, change:-8.40, pct:-2.87, vol:"72.1M", cap:"905B", sector:"Auto" },
  { ticker:"META", name:"Meta Platforms", price:512.60, change:7.89, pct:1.56, vol:"19.4M", cap:"1.30T", sector:"Technology" },
  { ticker:"BRK.B", name:"Berkshire Hathaway", price:478.90, change:1.20, pct:0.25, vol:"4.2M", cap:"1.04T", sector:"Finance" },
  { ticker:"JPM", name:"JPMorgan Chase", price:245.30, change:3.10, pct:1.28, vol:"9.8M", cap:"706B", sector:"Finance" },
  { ticker:"V", name:"Visa Inc.", price:312.40, change:2.45, pct:0.79, vol:"7.1M", cap:"625B", sector:"Finance" },
  { ticker:"JNJ", name:"Johnson & Johnson", price:158.70, change:-0.45, pct:-0.28, vol:"6.3M", cap:"383B", sector:"Healthcare" },
  { ticker:"UNH", name:"UnitedHealth Group", price:528.90, change:6.70, pct:1.28, vol:"3.9M", cap:"488B", sector:"Healthcare" },
  { ticker:"VTI", name:"Vanguard Total Market ETF", price:282.40, change:2.10, pct:0.75, vol:"5.2M", cap:"N/A", sector:"ETF" },
  { ticker:"QQQ", name:"Invesco QQQ Trust", price:498.30, change:5.80, pct:1.18, vol:"38.1M", cap:"N/A", sector:"ETF" },
  { ticker:"SPY", name:"SPDR S&P 500 ETF", price:548.20, change:3.40, pct:0.62, vol:"62.4M", cap:"N/A", sector:"ETF" },
];

const strategies = [
  {
    name: "Warren Buffett", emoji: "🎩", style: "Value Investing",
    desc: "Buy wonderful companies at fair prices. Hold forever. Focus on strong moats and consistent earnings.",
    holdings: ["BRK.B","AAPL","BAC","KO","CVX","OXY","AXP","KHC"],
    returns: "+19.8%", risk: "Moderate", minInvest: "$1,000",
    philosophy: "Be fearful when others are greedy, and greedy when others are fearful.",
    allocation: { stocks:90, bonds:5, cash:5 },
  },
  {
    name: "Ray Dalio", emoji: "🌊", style: "All Weather",
    desc: "Balance risk across economic environments. Perform well in inflation, deflation, growth, and recession.",
    holdings: ["SPY","TLT","GLD","VTI","IEF","DBC","TIPS"],
    returns: "+9.2%", risk: "Low", minInvest: "$500",
    philosophy: "He who lives by the crystal ball will eat shattered glass.",
    allocation: { stocks:30, bonds:55, alternatives:15 },
  },
  {
    name: "Cathie Wood", emoji: "🚀", style: "Disruptive Innovation",
    desc: "Invest in companies driving technological breakthroughs: AI, genomics, blockchain, autonomous vehicles.",
    holdings: ["TSLA","ROKU","COIN","SQ","PATH","PLTR","DKNG","RBLX"],
    returns: "+28.4%", risk: "High", minInvest: "$500",
    philosophy: "Innovation solves problems. Invest in the solutions.",
    allocation: { stocks:95, bonds:0, alternatives:5 },
  },
  {
    name: "Jack Bogle", emoji: "📊", style: "Index Investing",
    desc: "Buy the entire market at the lowest cost possible. Don't try to beat the market. Be the market.",
    holdings: ["VTI","VXUS","BND","VNQ","VTIP"],
    returns: "+10.5%", risk: "Moderate", minInvest: "$100",
    philosophy: "Don't look for the needle in the haystack. Just buy the haystack.",
    allocation: { stocks:60, bonds:35, alternatives:5 },
  },
];

export default function Invest() {
  const [stocks, setStocks] = useState(initialStocks);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedStrategy, setSelectedStrategy] = useState<number|null>(null);
  const [portfolio, setPortfolio] = useState<{ticker:string,shares:number,avgPrice:number}[]>([]);
  const [showBuy, setShowBuy] = useState<string|null>(null);
  const [buyShares, setBuyShares] = useState(1);
  const [tab, setTab] = useState<"market"|"strategies"|"portfolio">("market");

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(s => {
        const delta = (Math.random() - 0.48) * s.price * 0.003;
        const newPrice = Math.max(1, s.price + delta);
        const newChange = s.change + delta;
        return { ...s, price: Math.round(newPrice * 100) / 100, change: Math.round(newChange * 100) / 100, pct: Math.round((newChange / (newPrice - newChange)) * 10000) / 100 };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sectors = ["All", "Technology", "Finance", "Healthcare", "ETF", "Consumer", "Auto"];

  const filtered = useMemo(() => {
    return stocks.filter(s => {
      const matchSector = filter === "All" || s.sector === filter;
      const matchSearch = !search || s.ticker.toLowerCase().includes(search.toLowerCase()) || s.name.toLowerCase().includes(search.toLowerCase());
      return matchSector && matchSearch;
    });
  }, [stocks, filter, search]);

  const buyStock = (ticker: string) => {
    const stock = stocks.find(s => s.ticker === ticker);
    if (!stock) return;
    setPortfolio(prev => {
      const existing = prev.find(p => p.ticker === ticker);
      if (existing) {
        const totalShares = existing.shares + buyShares;
        const avgPrice = ((existing.avgPrice * existing.shares) + (stock.price * buyShares)) / totalShares;
        return prev.map(p => p.ticker === ticker ? { ...p, shares: totalShares, avgPrice: Math.round(avgPrice * 100) / 100 } : p);
      }
      return [...prev, { ticker, shares: buyShares, avgPrice: stock.price }];
    });
    setShowBuy(null);
    setBuyShares(1);
  };

  const portfolioValue = portfolio.reduce((sum, p) => {
    const stock = stocks.find(s => s.ticker === p.ticker);
    return sum + (stock ? stock.price * p.shares : 0);
  }, 0);

  const portfolioCost = portfolio.reduce((sum, p) => sum + p.avgPrice * p.shares, 0);

  return (
    <DashLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-1">Invest 📈</h1>
        <p className="text-[var(--muted)] mb-6">Live market data, expert strategies, and simulated trading.</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["market","strategies","portfolio"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={"px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all capitalize " + (tab===t?"gradient-lime text-[#0D0F13]":"bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)]")}>{t === "market" ? "🏛️ Market" : t === "strategies" ? "🧠 Strategies" : "💼 My Portfolio"}</button>
          ))}
        </div>

        {/* MARKET TAB */}
        {tab === "market" && (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search ticker or company..." className="flex-1 px-5 py-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-sm font-medium" />
              <div className="flex gap-2 overflow-x-auto pb-1">
                {sectors.map(s => (
                  <button key={s} onClick={() => setFilter(s)} className={"px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all " + (filter===s?"gradient-lime text-[#0D0F13]":"bg-[var(--card)] border border-[var(--border)] text-[var(--muted)]")}>{s}</button>
                ))}
              </div>
            </div>

            <div className="card overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Live Prices</h2>
                <span className="badge badge-lime text-xs">🟢 Market Open</span>
              </div>
              <table className="w-full text-sm">
                <thead><tr className="border-b border-[var(--border)]">
                  <th className="text-left py-3 text-[var(--muted)] font-semibold text-xs uppercase">Symbol</th>
                  <th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase">Price</th>
                  <th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase">Change</th>
                  <th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase">Volume</th>
                  <th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase">Mkt Cap</th>
                  <th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase"></th>
                </tr></thead>
                <tbody>{filtered.map(s => (
                  <tr key={s.ticker} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)] transition-colors">
                    <td className="py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{background:s.pct>=0?"var(--lime)":"var(--coral)"}}>{s.ticker[0]}</div><div><span className="font-bold">{s.ticker}</span><p className="text-xs text-[var(--muted)]">{s.name}</p></div></div></td>
                    <td className="py-4 text-right font-bold font-mono">${s.price.toFixed(2)}</td>
                    <td className={"py-4 text-right font-bold " + (s.pct>=0?"text-[var(--lime)]":"text-[var(--coral)]")}>{s.pct>=0?"+":""}{s.pct.toFixed(2)}%</td>
                    <td className="py-4 text-right text-[var(--muted)]">{s.vol}</td>
                    <td className="py-4 text-right text-[var(--muted)]">{s.cap}</td>
                    <td className="py-4 text-right">
                      {showBuy===s.ticker ? (
                        <div className="flex items-center gap-2 justify-end">
                          <input type="number" min={1} value={buyShares} onChange={e=>setBuyShares(Math.max(1,+e.target.value))} className="w-16 px-2 py-1.5 rounded-xl border border-[var(--border)] text-xs text-center" />
                          <button onClick={()=>buyStock(s.ticker)} className="btn btn-primary !text-xs !py-1.5 !px-3 !rounded-xl">Buy</button>
                          <button onClick={()=>setShowBuy(null)} className="text-xs text-[var(--muted)]">✕</button>
                        </div>
                      ) : (
                        <button onClick={()=>setShowBuy(s.ticker)} className="btn btn-ghost !text-xs !py-1.5 !px-4 !rounded-xl">Trade</button>
                      )}
                    </td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </>
        )}

        {/* STRATEGIES TAB */}
        {tab === "strategies" && (
          <div className="space-y-6">
            <p className="text-sm text-[var(--muted)]">Learn from legendary investors. Explore their philosophy and see what a portfolio inspired by their approach looks like.</p>
            <div className="grid md:grid-cols-2 gap-5">
              {strategies.map((s, i) => (
                <div key={i} onClick={() => setSelectedStrategy(selectedStrategy===i?null:i)} className={"card cursor-pointer hover:scale-[1.01] transition-all " + (selectedStrategy===i?"!border-[var(--lime)] ring-1 ring-[var(--lime)]":"")}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">{s.emoji}</span>
                    <div>
                      <h3 className="text-lg font-extrabold">{s.name}</h3>
                      <span className="badge badge-lime text-xs">{s.style}</span>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-lg font-extrabold text-[var(--lime)]">{s.returns}</p>
                      <p className="text-xs text-[var(--muted)]">avg/yr</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--muted)] mb-3">{s.desc}</p>
                  <p className="text-xs italic text-[var(--muted)] mb-4">"{s.philosophy}"</p>

                  {selectedStrategy===i && (
                    <div className="animate-in border-t border-[var(--border)] pt-4 mt-2 space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 rounded-2xl bg-[var(--bg)]"><p className="text-xs text-[var(--muted)]">Risk</p><p className="font-bold text-sm">{s.risk}</p></div>
                        <div className="text-center p-3 rounded-2xl bg-[var(--bg)]"><p className="text-xs text-[var(--muted)]">Min. Invest</p><p className="font-bold text-sm">{s.minInvest}</p></div>
                        <div className="text-center p-3 rounded-2xl bg-[var(--bg)]"><p className="text-xs text-[var(--muted)]">Style</p><p className="font-bold text-sm">{s.style.split(" ")[0]}</p></div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[var(--muted)] uppercase mb-2">Allocation</p>
                        <div className="flex gap-1 h-4 rounded-full overflow-hidden">
                          <div className="bg-[var(--lime)] rounded-l-full" style={{width:s.allocation.stocks+"%"}} title={"Stocks "+s.allocation.stocks+"%"} />
                          <div className="bg-[var(--sky)]" style={{width:s.allocation.bonds+"%"}} title={"Bonds "+s.allocation.bonds+"%"} />
                          <div className="bg-[var(--purple)] rounded-r-full" style={{width:(s.allocation.alternatives||0)+"%"}} title={"Alts "+(s.allocation.alternatives||0)+"%"} />
                        </div>
                        <div className="flex gap-4 mt-1 text-xs text-[var(--muted)]">
                          <span>🟢 Stocks {s.allocation.stocks}%</span>
                          <span>🔵 Bonds {s.allocation.bonds}%</span>
                          <span>🟣 Alts {s.allocation.alternatives||0}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[var(--muted)] uppercase mb-2">Top Holdings</p>
                        <div className="flex flex-wrap gap-2">{s.holdings.map((h,j) => <span key={j} className="badge badge-lime text-xs">{h}</span>)}</div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); s.holdings.forEach(h => { const stock = stocks.find(st => st.ticker === h); if (stock) buyStock(h); }); }} className="btn btn-primary w-full justify-center text-sm">Copy This Strategy →</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PORTFOLIO TAB */}
        {tab === "portfolio" && (
          <div>
            {portfolio.length === 0 ? (
              <div className="card text-center py-16">
                <span className="text-5xl mb-4 block">💼</span>
                <h3 className="text-xl font-extrabold mb-2">Your portfolio is empty</h3>
                <p className="text-[var(--muted)] mb-6">Start by buying stocks from the Market tab or copying a strategy!</p>
                <button onClick={() => setTab("market")} className="btn btn-primary">Go to Market →</button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="card text-center"><p className="text-xs text-[var(--muted)] uppercase font-semibold">Portfolio Value</p><p className="text-2xl font-extrabold mt-1">${portfolioValue.toLocaleString(undefined,{maximumFractionDigits:0})}</p></div>
                  <div className="card text-center"><p className="text-xs text-[var(--muted)] uppercase font-semibold">Total Cost</p><p className="text-2xl font-extrabold mt-1">${portfolioCost.toLocaleString(undefined,{maximumFractionDigits:0})}</p></div>
                  <div className="card text-center"><p className="text-xs text-[var(--muted)] uppercase font-semibold">P&L</p><p className={"text-2xl font-extrabold mt-1 " + (portfolioValue-portfolioCost>=0?"text-[var(--lime)]":"text-[var(--coral)]")}>{portfolioValue-portfolioCost>=0?"+":""}${(portfolioValue-portfolioCost).toLocaleString(undefined,{maximumFractionDigits:0})}</p></div>
                </div>
                <div className="card overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-[var(--border)]">
                      <th className="text-left py-3 text-[var(--muted)] font-semibold text-xs uppercase">Symbol</th>
                      <th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase">Shares</th>
                      <th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase">Avg Cost</th>
                      <th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase">Current</th>
                      <th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase">Value</th>
                      <th className="text-right py-3 text-[var(--muted)] font-semibold text-xs uppercase">P&L</th>
                    </tr></thead>
                    <tbody>{portfolio.map(p => {
                      const stock = stocks.find(s=>s.ticker===p.ticker);
                      const current = stock?.price || 0;
                      const value = current * p.shares;
                      const cost = p.avgPrice * p.shares;
                      const pl = value - cost;
                      return (
                        <tr key={p.ticker} className="border-b border-[var(--border)] last:border-0">
                          <td className="py-3 font-bold">{p.ticker}</td>
                          <td className="py-3 text-right">{p.shares}</td>
                          <td className="py-3 text-right text-[var(--muted)]">${p.avgPrice.toFixed(2)}</td>
                          <td className="py-3 text-right font-mono">${current.toFixed(2)}</td>
                          <td className="py-3 text-right font-bold">${value.toLocaleString(undefined,{maximumFractionDigits:0})}</td>
                          <td className={"py-3 text-right font-bold " + (pl>=0?"text-[var(--lime)]":"text-[var(--coral)]")}>{pl>=0?"+":""}${pl.toFixed(0)}</td>
                        </tr>
                      );
                    })}</tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </DashLayout>
  );
}
