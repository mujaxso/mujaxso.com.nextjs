import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music | Mujahid Siyam",
  description: "Music portfolio and creative works",
};

export default function MusicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
