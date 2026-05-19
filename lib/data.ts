export const agents = [
  { id: "taxshield", name: "TaxShield", emoji: "🛡️", fn: "Tax Optimization", status: "active", last: "Harvested $3,200 tax loss on VXUS", savings: 12480, color: "#00DC6F", badge: "badge-lime" },
  { id: "portfoliosync", name: "PortfolioSync", emoji: "📊", fn: "Portfolio Management", status: "active", last: "Rebalanced intl equity allocation +2%", savings: 8750, color: "#4DABF7", badge: "badge-sky" },
  { id: "estateplan", name: "EstatePlan", emoji: "🏛️", fn: "Estate Planning", status: "monitoring", last: "Reviewed trust beneficiary allocation", savings: 34200, color: "#7B61FF", badge: "badge-purple" },
  { id: "riskguard", name: "RiskGuard", emoji: "⚡", fn: "Risk Management", status: "active", last: "Reduced portfolio beta to 0.98", savings: 5600, color: "#FFB347", badge: "badge-amber" },
  { id: "goaltracker", name: "GoalTracker", emoji: "🎯", fn: "Goal Tracking", status: "active", last: "Retirement on track for 2048", savings: 0, color: "#FF6B6B", badge: "badge-coral" },
  { id: "cashflow", name: "CashFlow", emoji: "💰", fn: "Cash Management", status: "monitoring", last: "Moved $15K to 4.85% APY savings", savings: 2340, color: "#00DC6F", badge: "badge-lime" },
];

export const holdings = [
  { name: "Vanguard Total Stock Market", ticker: "VTI", value: 142500, alloc: 35.2, change: 2.4, sector: "US Equity", color: "#00DC6F" },
  { name: "Vanguard Total International", ticker: "VXUS", value: 68200, alloc: 16.8, change: -0.8, sector: "Intl Equity", color: "#4DABF7" },
  { name: "iShares Core US Agg Bond", ticker: "AGG", value: 52300, alloc: 12.9, change: 0.3, sector: "Fixed Income", color: "#7B61FF" },
  { name: "Vanguard Real Estate ETF", ticker: "VNQ", value: 32100, alloc: 7.9, change: 1.1, sector: "Real Estate", color: "#FFB347" },
  { name: "SPDR Gold Shares", ticker: "GLD", value: 24600, alloc: 6.1, change: 3.2, sector: "Commodities", color: "#FF6B6B" },
  { name: "Schwab US TIPS ETF", ticker: "SCHP", value: 28400, alloc: 7.0, change: 0.1, sector: "Inflation Prot.", color: "#4DABF7" },
  { name: "Vanguard Growth ETF", ticker: "VUG", value: 36800, alloc: 9.1, change: 3.8, sector: "US Growth", color: "#00DC6F" },
  { name: "High-Yield Savings", ticker: "CASH", value: 20100, alloc: 5.0, change: 0, sector: "Cash", color: "#8B919A" },
];

export const goals = [
  { id: "g1", name: "Retirement", emoji: "🏖️", target: 2500000, current: 405000, deadline: "2048", color: "#00DC6F" },
  { id: "g2", name: "Emergency Fund", emoji: "🆘", target: 45000, current: 38500, deadline: "2026", color: "#4DABF7" },
  { id: "g3", name: "Kids College", emoji: "🎓", target: 220000, current: 42000, deadline: "2040", color: "#7B61FF" },
  { id: "g4", name: "Dream Home", emoji: "🏡", target: 150000, current: 89000, deadline: "2028", color: "#FFB347" },
];

export const taxOps = [
  { id: "t1", type: "Tax-Loss Harvest", desc: "Sell VXUS at $3,200 loss to offset VUG gains", savings: 768, status: "recommended", date: "May 18" },
  { id: "t2", type: "Roth Conversion", desc: "Convert $12K Traditional IRA to Roth while in lower bracket", savings: 4200, status: "recommended", date: "May 15" },
  { id: "t3", type: "Tax-Loss Harvest", desc: "Harvested loss on SCHP, replaced with BND", savings: 1420, status: "executed", date: "May 10" },
  { id: "t4", type: "Capital Gains Timing", desc: "Deferred VUG trim to Jan 2027", savings: 2850, status: "executed", date: "Apr 28" },
  { id: "t5", type: "Asset Location", desc: "Moved bonds to tax-deferred, equities to taxable", savings: 3200, status: "executed", date: "Mar 15" },
  { id: "t6", type: "Charitable Giving", desc: "Donate appreciated VTI shares directly", savings: 2040, status: "pending", date: "May 20" },
];

export const chartData = [
  { m: "Jan", v: 368000 }, { m: "Feb", v: 372000 }, { m: "Mar", v: 365000 }, { m: "Apr", v: 381000 },
  { m: "May", v: 395000 }, { m: "Jun", v: 388000 }, { m: "Jul", v: 398000 }, { m: "Aug", v: 392000 },
  { m: "Sep", v: 401000 }, { m: "Oct", v: 396000 }, { m: "Nov", v: 399000 }, { m: "Dec", v: 405000 },
];

export const allocData = [
  { name: "US Equity", value: 44.3, color: "#00DC6F" },
  { name: "Intl Equity", value: 16.8, color: "#4DABF7" },
  { name: "Fixed Income", value: 19.9, color: "#7B61FF" },
  { name: "Real Estate", value: 7.9, color: "#FFB347" },
  { name: "Commodities", value: 6.1, color: "#FF6B6B" },
  { name: "Cash", value: 5.0, color: "#8B919A" },
];
