import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Mujahid Siyam",
  description: "Showcase of software projects and contributions",
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
