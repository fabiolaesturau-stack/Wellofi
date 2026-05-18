"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/portfolio", label: "Portfolio", icon: "📈" },
  { href: "/tax", label: "Tax Center", icon: "🛡️" },
  { href: "/goals", label: "Goals", icon: "🎯" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(!open)} className="fixed top-4 left-4 z-50 md:hidden bg-white rounded-xl p-2.5 shadow-lg border border-[var(--border)] text-lg">☰</button>
      {open && <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-screen w-[220px] bg-[var(--navy)] text-white z-40 flex flex-col transition-transform ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-[var(--teal)] flex items-center justify-center font-bold text-sm">W</div>
          <span className="text-lg font-bold tracking-tight">WelloFI</span>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {nav.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${pathname === n.href ? "bg-[var(--teal)] text-white shadow-lg" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
              <span>{n.icon}</span> {n.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 pb-4">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-red-400 transition-all">
            <span>🚪</span> Sign Out
          </Link>
        </div>
      </aside>
    </>
  );
}
