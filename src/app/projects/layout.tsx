import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Projects | Mujahid Siyam",
    template: "%s | Projects | Mujahid Siyam"
  },
  description: "Showcase of software projects and contributions",
  openGraph: {
    title: "Projects | Mujahid Siyam",
    description: "Showcase of software projects and contributions",
    type: "website",
    images: ['/img/profile.png'],
  },
  robots: "index, follow",
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
