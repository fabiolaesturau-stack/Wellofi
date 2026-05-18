"use client";
import Sidebar from "@/components/Sidebar";
export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Sidebar />
      <main className="md:ml-[220px] p-4 md:p-8 pt-16 md:pt-8">{children}</main>
    </div>
  );
}
