import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "WelloFI - Your Wealth, Your Way", description: "Multi-agent wealth management that feels like magic." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();
        `}} />
        {children}
      </body>
    </html>
  );
}
