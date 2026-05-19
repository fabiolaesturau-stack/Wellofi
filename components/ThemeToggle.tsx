"use client";
import { useState, useEffect } from "react";
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => { setDark(document.documentElement.getAttribute("data-theme") === "dark"); }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button onClick={toggle} className="w-10 h-10 rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-lg hover:scale-110 transition-transform" title="Toggle theme">
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
