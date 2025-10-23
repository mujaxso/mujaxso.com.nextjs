import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mujahid Siyam | Portfolio",
  description: "Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps building cutting-edge solutions",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
