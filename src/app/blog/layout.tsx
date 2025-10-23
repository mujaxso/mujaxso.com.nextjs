import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Blog | Mujahid Siyam",
    template: "%s | Blog | Mujahid Siyam"
  },
  description: "Thoughts on software engineering, AI/ML, and technology",
  openGraph: {
    title: "Blog | Mujahid Siyam",
    description: "Thoughts on software engineering, AI/ML, and technology",
    type: "website",
    images: ['/img/profile.png'],
  },
  robots: "index, follow",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
