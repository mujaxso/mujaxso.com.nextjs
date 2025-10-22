import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";

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
  openGraph: {
    title: "Mujahid Siyam | Portfolio",
    description: "Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps",
    type: "website",
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
    <html lang="en" suppressHydrationWarning className="dark">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-14">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
