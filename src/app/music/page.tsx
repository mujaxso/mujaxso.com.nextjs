import { MusicContent } from './MusicContent'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music | Mujahid Siyam",
  description: "Explore my curated playlists and musical journey across different platforms",
  alternates: {
    canonical: 'https://mujaxso.com/music',
  },
  openGraph: {
    title: "Music | Mujahid Siyam",
    description: "Explore my curated playlists and musical journey across different platforms",
    url: 'https://mujaxso.com/music',
    type: 'website',
  },
};

export default function MusicPage() {
  return <MusicContent />
}
