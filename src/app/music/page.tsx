"use client"

import { useState, useEffect } from "react"
import { ExternalLink, Music2 } from "lucide-react"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardFooter } from "../components/ui/Card"

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
  const [playerError, setPlayerError] = useState<string | null>(null)
  const [isPlayerLoading, setIsPlayerLoading] = useState(true)

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

  // Set loading to false after a delay when the page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlayerLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

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
      case "spotify": return "🎵"
      case "soundcloud": return "☁️"
      case "apple": return "🍎"
      case "youtube": return "▶️"
      default: return "🎵"
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
            <div className="p-4 bg-gradient-to-r from-primary to-secondary rounded-2xl">
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
        <div className="grid grid-cols-1 gap-8 mb-16">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="group">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Playlist Info */}
                <div className="lg:w-1/3 space-y-4">
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                      <Music2 className="w-16 h-16 text-white/60" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-2xl font-bold text-foreground">
                        {playlist.title}
                      </h3>
                      <span className="text-3xl ml-2 flex-shrink-0">
                        {getServiceIcon(playlist.service)}
                      </span>
                    </div>
                    
                    <p className="text-foreground/60">
                      {playlist.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-foreground/50">
                      <span>{playlist.trackCount} tracks</span>
                      {playlist.duration && (
                        <span>{playlist.duration}</span>
                      )}
                    </div>

                    {/* Service Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getServiceColor(playlist.service)}`}>
                      {getServiceName(playlist.service)}
                    </div>
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

                {/* Full Playlist Player */}
                <div className="lg:w-2/3">
                  {isPlayerLoading ? (
                    <div className="h-80 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-primary">Loading playlist...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-80 rounded-xl overflow-hidden">
                      <iframe
                        src={playlist.embedUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="encrypted-media"
                        allowFullScreen
                        style={{ borderRadius: '12px' }}
                        onLoad={() => setIsPlayerLoading(false)}
                        onError={() => setPlayerError('Failed to load the playlist. Please try again.')}
                      />
                    </div>
                  )}
                  {playerError && (
                    <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <p className="text-red-400 text-center">{playerError}</p>
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
              </div>
            </Card>
          ))}
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
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => window.open('https://open.spotify.com/user/your-profile', '_blank')}
                >
                  🎵 Follow on Spotify
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => window.open('https://soundcloud.com/your-profile', '_blank')}
                >
                  ☁️ Follow on SoundCloud
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
