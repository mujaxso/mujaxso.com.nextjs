import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { PersonStructuredData } from "./components/StructuredData";
import Loading from "./loading";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeScript from "./components/ThemeScript";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    template: "%s | Mujahid Siyam",
    default: "Mujahid Siyam | Portfolio",
  },
  description: "Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps building cutting-edge solutions",
  keywords: ["software engineer", "AI/ML", "data science", "DevSecOps", "full-stack developer"],
  authors: [{ name: "Mujahid Siyam" }],
  metadataBase: new URL('https://mujaxso.com'),
  openGraph: {
    title: "Mujahid Siyam | Portfolio",
    description: "Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps",
    type: "website",
    images: [
      {
        url: '/img/profile.png',
        width: 1200,
        height: 630,
        alt: 'Mujahid Siyam Portfolio',
      },
    ],
    siteName: 'Mujahid Siyam Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mujahid Siyam | Portfolio",
    description: "Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps",
    images: ['/img/profile.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: '/img/favicon.ico',
    shortcut: '/img/favicon.ico',
    apple: '/img/apple-touch-icon.png',
  },
  verification: {
    // Add Google Search Console verification here when available
    // google: 'verification-token',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('mujaxso-theme');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var effectiveTheme = theme === 'system' ? systemTheme : (theme || 'light');
                  
                  // Apply theme immediately
                  document.documentElement.classList.add(effectiveTheme);
                  if (theme) {
                    document.documentElement.classList.add(theme);
                  }
                  // Mark theme as loaded
                  document.body.classList.add('theme-loaded');
                } catch (e) {
                  console.error('Theme initialization error:', e);
                  // Fallback to light theme
                  document.documentElement.classList.add('light');
                  document.body.classList.add('theme-loaded');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} antialiased font-mono`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 dark:from-[#0a0f1c] dark:via-[#0f172a] dark:to-[#1e1b4b] relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-300/10 rounded-full blur-3xl animate-pulse-slow animation-delay-4000"></div>
            
            <div className="relative z-10 flex flex-col min-h-screen">
              <Suspense fallback={<div>Loading header...</div>}>
                <Header />
              </Suspense>
              <main className="flex-1 pt-14">
                <Suspense fallback={<Loading />}>
                  {children}
                </Suspense>
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
