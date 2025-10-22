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
  title: "Mujahid Siyam | Portfolio",
  description: "Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps building cutting-edge solutions",
  keywords: ["software engineer", "AI/ML", "data science", "DevSecOps", "full-stack developer"],
  authors: [{ name: "Mujahid Siyam" }],
  openGraph: {
    title: "Mujahid Siyam | Portfolio",
    description: "Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps",
    type: "website",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
