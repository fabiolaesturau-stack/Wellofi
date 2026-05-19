"use client";
import Sidebar from "@/components/Sidebar";
import Notifications from "@/components/Notifications";
export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Sidebar />
      <Notifications />
      <main className="md:ml-[240px] p-5 md:p-8 pt-20 md:pt-8">{children}</main>
    </div>
  );
}
