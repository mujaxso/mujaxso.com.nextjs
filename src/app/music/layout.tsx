import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Music | Mujahid Siyam",
    template: "%s | Music | Mujahid Siyam"
  },
  description: "Music portfolio and creative works",
  openGraph: {
    title: "Music | Mujahid Siyam",
    description: "Music portfolio and creative works",
    type: "website",
    images: ['/img/profile.png'],
  },
  robots: "index, follow",
};

export default function MusicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
