import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";
import { PersonStructuredData } from "./components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mujahid Siyam | Portfolio",
  description: "Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps building cutting-edge solutions",
  keywords: ["software engineer", "AI/ML", "data science", "DevSecOps", "full-stack developer"],
  authors: [{ name: "Mujahid Siyam" }],
  metadataBase: new URL('https://mujaxso.com'),
  openGraph: {
    title: "Mujahid Siyam | Portfolio",
    description: "Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps",
    type: "website",
    images: ['/img/profile.png'],
  },
  robots: "index, follow",
  manifest: "/manifest.json",
  icons: {
    icon: '/img/favicon.ico',
    shortcut: '/img/favicon.ico',
    apple: '/img/apple-touch-icon.png',
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PersonStructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        style={{
          fontFamily: 'var(--font-family-primary)',
          viewTransitionName: 'root-layout',
        }}
      >
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 dark:from-[#0a0f1c] dark:via-[#0f172a] dark:to-[#1e1b4b] relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
            
            <div className="relative z-10 flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 pt-14">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
