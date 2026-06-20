import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "John J. Lawal | Enterprise Architect",
  description: "I engineer the bridge between untapped potential and absolute performance. Operating from Abuja, Nigeria.",
};

import SovereignFooter from "@/components/SovereignFooter";
import SovereignTerminal from "@/components/SovereignTerminal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-obsidian text-gray-300 antialiased min-h-screen relative flex flex-col">
        
        {/* The Institutional Canvas (Global Environment) */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-obsidian">
          {/* Radial Depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,_#141414_0%,_#0A0A0A_80%)]"></div>
          {/* Engineering Grid */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%231A2B3C' stroke-width='1' stroke-opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>

        {/* Global Terminal / Command Palette */}
        <SovereignTerminal />

        {/* Main Content */}
        <div className="flex-grow z-0">
          {children}
        </div>
        
        {/* Global Footer */}
        <SovereignFooter />
      </body>
    </html>
  );
}
