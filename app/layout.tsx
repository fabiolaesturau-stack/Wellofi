import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "WelloFI - Intelligent Wealth Management", description: "Multi-agent wealth management platform" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
