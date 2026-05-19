"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const nav = [
  { href: "/dashboard", label: "Home", emoji: "🏠" },
  { href: "/portfolio", label: "Portfolio", emoji: "💎" },
  { href: "/tax", label: "Tax Center", emoji: "🛡️" },
  { href: "/goals", label: "Goals", emoji: "🎯" },
  { href: "/simulator", label: "Simulator", emoji: "🔮" },
  { href: "/calculator", label: "Tax Calc", emoji: "🧮" },
  { href: "/advisor", label: "Ask Advisor", emoji: "💬" },
  { href: "/settings", label: "Settings", emoji: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed top-5 left-5 z-50 md:hidden w-10 h-10 bg-[var(--card)] rounded-2xl shadow-lg border border-[var(--border)] flex items-center justify-center text-lg hover:scale-105 transition-transform">☰</button>
      {open && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setOpen(false)} />}
      <aside className={"fixed top-0 left-0 h-screen w-[240px] bg-[var(--card)] border-r border-[var(--border)] z-40 flex flex-col transition-transform " + (open ? "translate-x-0" : "-translate-x-full") + " md:translate-x-0"}>
        <Link href="/" className="flex items-center gap-3 px-6 py-6">
          <div className="w-10 h-10 rounded-2xl gradient-lime flex items-center justify-center font-extrabold text-[#0D0F13] text-lg">W</div>
          <span className="text-xl font-extrabold tracking-tight">WelloFI</span>
        </Link>
        <nav className="flex-1 px-4 space-y-0.5 overflow-y-auto">
          {nav.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              className={"flex items-center gap-3 px-4 py-2.5 rounded-2xl text-[14px] font-medium transition-all " + (pathname === n.href ? "bg-[var(--lime-glow)] text-[var(--text)] font-semibold" : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg)]")}>
              <span className="text-lg">{n.emoji}</span> {n.label}
              {pathname === n.href && <div className="ml-auto w-2 h-2 rounded-full bg-[var(--lime)]" />}
            </Link>
          ))}
        </nav>
        <div className="px-4 pb-4 space-y-3">
          <div className="flex items-center justify-between px-2"><span className="text-xs text-[var(--muted)]">Theme</span><ThemeToggle /></div>
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--lime-glow)] to-[var(--purple-glow)] border border-[var(--border)]">
            <p className="text-sm font-semibold mb-0.5">Pro Plan ✨</p>
            <p className="text-xs text-[var(--muted)]">6 agents active</p>
          </div>
        </div>
      </aside>
    </>
  );
}
