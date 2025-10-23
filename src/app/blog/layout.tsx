import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Mujahid Siyam",
  description: "Thoughts on software engineering, AI/ML, and technology",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
