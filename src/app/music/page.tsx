"use client"

import { useState } from "react"
import { ExternalLink, Play, Music2 } from "lucide-react"
import { Button } from "../components/ui/Button"
import dynamic from 'next/dynamic'

// Dynamically import react-player to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

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
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playerKey, setPlayerKey] = useState(0)
  const [playerError, setPlayerError] = useState<string | null>(null)
  const [isPlayerLoading, setIsPlayerLoading] = useState(false)

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

  const playPlaylist = (playlist: Playlist) => {
    // Reset error state
    setPlayerError(null)
    setIsPlayerLoading(true)
    // Stop current playback first
    setIsPlaying(false)
    
    // Use setTimeout to ensure the previous player is properly unmounted
    setTimeout(() => {
      setCurrentPlaylist(playlist)
      setPlayerKey(prev => prev + 1) // Force new player instance
      // Don't set isPlaying to true immediately - let the player handle it
    }, 100)
  }

  const stopPlaylist = () => {
    setIsPlaying(false)
    // Don't immediately remove currentPlaylist to avoid abrupt unmounting
    setTimeout(() => {
      setCurrentPlaylist(null)
    }, 100)
  }

  const handlePlayerReady = () => {
    // Player is ready, now we can safely start playback
    setIsPlayerLoading(false)
    setIsPlaying(true)
  }

  const handlePlayerError = (error: any) => {
    console.error('Player error:', error)
    setIsPlaying(false)
    setPlayerError('Failed to load the player. Please try again or open the playlist in the app directly.')
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

        {/* Embedded Player Section */}
        {currentPlaylist && (
          <div className="mb-16">
            <div className="backdrop-blur-xl bg-glass border border-glass-border rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Now Playing: {currentPlaylist.title}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stopPlaylist}
                >
                  Close Player
                </Button>
              </div>
              {playerError ? (
                <div className="aspect-video rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-red-400 mb-4">{playerError}</p>
                    <Button
                      variant="default"
                      onClick={() => window.open(currentPlaylist.url, '_blank')}
                    >
                      Open in {getServiceName(currentPlaylist.service)}
                    </Button>
                  </div>
                </div>
              ) : isPlayerLoading ? (
                <div className="aspect-video rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-primary">Loading player...</p>
                  </div>
                </div>
              ) : (
                <div className="aspect-video rounded-xl overflow-hidden">
                  <ReactPlayer
                    key={playerKey} // Force new instance when key changes
                    url={currentPlaylist.embedUrl}
                    width="100%"
                    height="100%"
                    playing={isPlaying}
                    controls={true}
                    style={{ borderRadius: '12px' }}
                    onReady={handlePlayerReady}
                    onError={handlePlayerError}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    config={{
                      youtube: {
                        playerVars: { 
                          showinfo: 1,
                          rel: 0,
                          modestbranding: 1
                        }
                      },
                      soundcloud: {
                        options: {
                          show_artwork: true,
                          buying: false,
                          liking: false,
                          download: false,
                          sharing: false,
                          show_comments: false,
                          show_playcount: false,
                          show_user: false
                        }
                      },
                      spotify: {
                        attributes: {
                          style: { borderRadius: '12px', width: '100%', height: '100%' },
                          frameBorder: 0,
                          allow: 'encrypted-media'
                        }
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Playlists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {playlists.map((playlist) => (
            <div 
              key={playlist.id}
              className="group relative backdrop-blur-xl bg-glass border border-glass-border rounded-2xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-xl"
            >
              {/* Playlist Cover */}
              <div className="relative mb-4">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                    <Music2 className="w-12 h-12 text-white/60" />
                  </div>
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                  <Button
                    variant="default"
                    size="sm"
                    className="rounded-full p-3"
                    onClick={() => playPlaylist(playlist)}
                  >
                    <Play className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Playlist Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-foreground line-clamp-2">
                    {playlist.title}
                  </h3>
                  <span className="text-2xl ml-2 flex-shrink-0">
                    {getServiceIcon(playlist.service)}
                  </span>
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

                {/* Service Badge */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getServiceColor(playlist.service)}`}>
                  {getServiceName(playlist.service)}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1"
                    onClick={() => playPlaylist(playlist)}
                    disabled={currentPlaylist?.id === playlist.id && isPlaying}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {currentPlaylist?.id === playlist.id && isPlaying ? 'Playing...' : 'Play Here'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => window.open(playlist.url, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in App
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="backdrop-blur-xl bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 border border-glass-border">
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
        </div>
      </div>
    </div>
  )
}
