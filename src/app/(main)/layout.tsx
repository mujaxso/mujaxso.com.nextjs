import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Mujahid Siyam | Portfolio",
    template: "%s | Mujahid Siyam"
  },
  description: "Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps building cutting-edge solutions",
  openGraph: {
    title: "Mujahid Siyam | Portfolio",
    description: "Software Engineer | AI/ML Engineer | Data Scientist | DevSecOps building cutting-edge solutions",
    type: "website",
    images: ['/img/profile.png'],
  },
  robots: "index, follow",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
