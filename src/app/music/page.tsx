"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Music2 } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardFooter } from "../components/ui/Card"

// Import SVG icons for music services
const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-2-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
)

const AppleMusicIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M21.65 2.24a1 1 0 0 0-.8-.2l-13 2A1 1 0 0 0 7 5v10.35A3.45 3.45 0 0 0 5.5 15 3.5 3.5 0 1 0 9 18.5v-7.64l11-1.69v4.18a3.45 3.45 0 0 0-1.5-.35 3.5 3.5 0 1 0 3.5 3.5V3a1 1 0 0 0-.35-.76z"/>
  </svg>
)

const SoundCloudIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M11.56 8.87V17h8.76c.7 0 1.27-.56 1.27-1.26 0-.69-.57-1.25-1.27-1.25h-.08c.05-.23.08-.47.08-.71a2.92 2.92 0 0 0-2.9-2.91c-.49 0-.94.13-1.34.35-.25-2.92-2.73-5.2-5.71-5.2-2.14 0-3.97 1.24-4.84 3.02-.63-.26-1.33-.41-2.07-.41C2.5 8.87 1 10.36 1 12.13c0 1.78 1.5 3.26 3.32 3.26h7.24z"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M19.67 8.12c-.24-.84-.94-1.5-1.83-1.73C16.04 6 12 6 12 6s-4.04 0-5.84.39c-.89.23-1.59.89-1.83 1.73C4 9.91 4 12 4 12s0 2.09.33 3.88c.24.84.94 1.5 1.83 1.73C7.96 18 12 18 12 18s4.04 0 5.84-.39c.89-.23 1.59-.89 1.83-1.73C20 14.09 20 12 20 12s0-2.09-.33-3.88zm-9.35 6.15V9.73l4.47 2.27-4.47 2.27z"/>
  </svg>
)

interface Playlist {
  id: string
  title: string
  description: string
  coverUrl: string
  service: "spotify" | "soundcloud" | "youtube" | "apple"
  url: string
  embedUrl: string
  trackCount: number
  duration?: string
}

export default function MusicPage() {
  const [playerErrors, setPlayerErrors] = useState<Record<string, string | null>>({})
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({})

  // Replace these with your actual playlist URLs
  const playlists: Playlist[] = [
    {
      id: "1",
      title: "CODING FOCUS",
      description: "Beautiful instrumental music to keep you in the flow as you code or study. Ideal for programming during stressful times.",
      coverUrl: "/api/placeholder/300/300",
      service: "spotify",
      url: "https://open.spotify.com/playlist/15ngsvOmlTkARCg7ipoNvG",
      embedUrl: "https://open.spotify.com/embed/playlist/15ngsvOmlTkARCg7ipoNvG?utm_source=generator",
      trackCount: 1345,
      duration: "over 24 hr"
    },
    {
      id: "2",
      title: "Chillstep Programming Mix",
      description: "Chillstep music perfect for concentration while programming, coding, or hacking. Deep bass, beautiful vocals and rhythms.",
      coverUrl: "/api/placeholder/300/300",
      service: "youtube",
      url: "https://www.youtube.com/watch?v=M5QY2_8704o&list=RDQMzSeUiyuhqBE&start_radio=1",
      embedUrl: "https://www.youtube.com/embed/videoseries?list=RDQMzSeUiyuhqBE",
      trackCount: 25,
      duration: "1h 45m"
    }
  ]

  // Initialize loading states
  useEffect(() => {
    const initialLoadingStates: Record<string, boolean> = {}
    playlists.forEach(playlist => {
      initialLoadingStates[playlist.id] = true
    })
    setLoadingStates(initialLoadingStates)
  }, [])

  const handlePlayerLoad = (playlistId: string) => {
    setLoadingStates(prev => ({ ...prev, [playlistId]: false }))
  }

  const handlePlayerError = (playlistId: string) => {
    setLoadingStates(prev => ({ ...prev, [playlistId]: false }))
    setPlayerErrors(prev => ({ 
      ...prev, 
      [playlistId]: 'Failed to load the playlist. Please try again.' 
    }))
  }

  const getServiceColor = (service: Playlist["service"]) => {
    switch (service) {
      case "spotify": return "bg-green-500/20 text-green-400 border-green-500/30"
      case "soundcloud": return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "apple": return "bg-pink-500/20 text-pink-400 border-pink-500/30"
      case "youtube": return "bg-red-500/20 text-red-400 border-red-500/30"
      default: return "bg-primary/20 text-primary border-primary/30"
    }
  }

  const getServiceIcon = (service: Playlist["service"]) => {
    switch (service) {
      case "spotify": return <SpotifyIcon />
      case "soundcloud": return <SoundCloudIcon />
      case "apple": return <AppleMusicIcon />
      case "youtube": return <YouTubeIcon />
      default: return <Music2 className="w-6 h-6" />
    }
  }

  const getServiceName = (service: Playlist["service"]) => {
    switch (service) {
      case "spotify": return "Spotify"
      case "soundcloud": return "SoundCloud"
      case "apple": return "Apple Music"
      case "youtube": return "YouTube Music"
      default: return service
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center">
              <Music2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Music
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Explore my curated playlists across different music platforms. 
            From coding focus tracks to original productions, discover the sounds that inspire my work.
          </p>
        </div>

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {playlists.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-foreground/60">No playlists available at the moment.</p>
            </div>
          ) : (
            playlists.map((playlist) => (
            <Card key={playlist.id} className="group">
              {/* Playlist Player at the top */}
              <div className="mb-4 rounded-xl overflow-hidden bg-primary/10 border border-primary/20">
                <div className="aspect-video relative">
                  {/* Show loading spinner while iframe is loading */}
                  {loadingStates[playlist.id] && (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10">
                      <div className="text-center p-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                        <p className="text-primary text-sm">Loading...</p>
                      </div>
                    </div>
                  )}
                  {/* Always render iframe, but control visibility */}
                  <iframe
                    src={playlist.embedUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="encrypted-media"
                    allowFullScreen
                    className={`w-full h-full ${loadingStates[playlist.id] ? 'invisible' : 'visible'}`}
                    onLoad={() => handlePlayerLoad(playlist.id)}
                    onError={() => handlePlayerError(playlist.id)}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                {playerErrors[playlist.id] && (
                  <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-red-400 text-center text-sm">{playerErrors[playlist.id]}</p>
                    <div className="flex justify-center mt-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => window.open(playlist.url, '_blank')}
                      >
                        Open in {getServiceName(playlist.service)}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Playlist Details */}
              <div className="space-y-3">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {playlist.title}
                  </h3>
                  <div className="flex justify-center items-center gap-3 mb-2">
                    <div className="w-6 h-6 flex items-center justify-center">
                      {getServiceIcon(playlist.service)}
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getServiceColor(playlist.service)}`}>
                      {getServiceName(playlist.service)}
                    </div>
                  </div>
                </div>
                
                <p className="text-foreground/60 text-sm line-clamp-2">
                  {playlist.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-foreground/50">
                  <span>{playlist.trackCount} tracks</span>
                  {playlist.duration && (
                    <span>{playlist.duration}</span>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => window.open(playlist.url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in {getServiceName(playlist.service)}
                </Button>
              </div>
            </Card>
          ))
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-primary to-secondary border-none">
            <div className="p-12">
              <h3 className="text-3xl font-bold mb-4 text-white">
                Follow My Musical Journey
              </h3>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Stay updated with my latest releases, playlists, and musical experiments across all platforms.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex flex-col items-center justify-center gap-2 min-w-[160px] h-[120px] p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300"
                  onClick={() => window.open('https://open.spotify.com/user/mujaxso', '_blank')}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <SpotifyIcon />
                  </div>
                  <span className="text-white text-sm font-medium">Spotify</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex flex-col items-center justify-center gap-2 min-w-[160px] h-[120px] p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300"
                  onClick={() => window.open('https://music.apple.com/profile/mujaxso', '_blank')}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <AppleMusicIcon />
                  </div>
                  <span className="text-white text-sm font-medium">Apple Music</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex flex-col items-center justify-center gap-2 min-w-[160px] h-[120px] p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300"
                  onClick={() => window.open('https://soundcloud.com/mujaxso', '_blank')}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <SoundCloudIcon />
                  </div>
                  <span className="text-white text-sm font-medium">SoundCloud</span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex flex-col items-center justify-center gap-2 min-w-[160px] h-[120px] p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-105 transition-all duration-300"
                  onClick={() => window.open('https://www.youtube.com/@mujaxso', '_blank')}
                >
                  <div className="w-8 h-8 flex items-center justify-center">
                    <YouTubeIcon />
                  </div>
                  <span className="text-white text-sm font-medium">YouTube</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
