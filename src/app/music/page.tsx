"use client"

import { useState, useRef, useEffect } from "react"
import { ExternalLink, Play, Pause, SkipBack, SkipForward, Volume2, Music2 } from "lucide-react"
import { Button } from "../components/ui/Button"

interface Track {
  id: string
  title: string
  artist: string
  duration: string
  audioUrl: string
  coverUrl: string
}

interface Playlist {
  id: string
  title: string
  description: string
  coverUrl: string
  service: "spotify" | "soundcloud" | "youtube" | "apple"
  url: string
  trackCount: number
  duration?: string
  tracks: Track[]
}

export default function MusicPage() {
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Mock playlists with sample tracks - replace with your actual music
  const playlists: Playlist[] = [
    {
      id: "1",
      title: "Coding Focus",
      description: "Deep focus tracks for coding sessions and late-night development",
      coverUrl: "/api/placeholder/300/300",
      service: "spotify",
      url: "https://open.spotify.com/playlist/your-playlist-id",
      trackCount: 3,
      duration: "15m",
      tracks: [
        {
          id: "1-1",
          title: "Ambient Coding",
          artist: "Mujahid Siyam",
          duration: "5:00",
          audioUrl: "/audio/sample1.mp3", // Replace with your actual audio files
          coverUrl: "/api/placeholder/80/80"
        },
        {
          id: "1-2",
          title: "Focus Flow",
          artist: "Mujahid Siyam",
          duration: "5:00",
          audioUrl: "/audio/sample2.mp3",
          coverUrl: "/api/placeholder/80/80"
        },
        {
          id: "1-3",
          title: "Deep Work",
          artist: "Mujahid Siyam",
          duration: "5:00",
          audioUrl: "/audio/sample3.mp3",
          coverUrl: "/api/placeholder/80/80"
        }
      ]
    },
    {
      id: "2",
      title: "My Productions",
      description: "Original music compositions and productions",
      coverUrl: "/api/placeholder/300/300",
      service: "soundcloud",
      url: "https://soundcloud.com/your-profile/sets/your-playlist",
      trackCount: 3,
      duration: "15m",
      tracks: [
        {
          id: "2-1",
          title: "Digital Dreams",
          artist: "Mujahid Siyam",
          duration: "4:30",
          audioUrl: "/audio/sample4.mp3",
          coverUrl: "/api/placeholder/80/80"
        },
        {
          id: "2-2",
          title: "Neural Melody",
          artist: "Mujahid Siyam",
          duration: "3:45",
          audioUrl: "/audio/sample5.mp3",
          coverUrl: "/api/placeholder/80/80"
        },
        {
          id: "2-3",
          title: "Code Symphony",
          artist: "Mujahid Siyam",
          duration: "6:15",
          audioUrl: "/audio/sample6.mp3",
          coverUrl: "/api/placeholder/80/80"
        }
      ]
    }
  ]

  const currentTrack = currentPlaylist?.tracks[currentTrackIndex]

  // Audio player controls
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const playTrack = (playlist: Playlist, trackIndex: number = 0) => {
    setCurrentPlaylist(playlist)
    setCurrentTrackIndex(trackIndex)
    setIsPlaying(true)
    // Audio will start playing when the src is set and play() is called
  }

  const nextTrack = () => {
    if (currentPlaylist && currentTrackIndex < currentPlaylist.tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1)
    }
  }

  const prevTrack = () => {
    if (currentPlaylist && currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1)
    }
  }

  const handleProgress = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.target as HTMLAudioElement
    const progress = (audio.currentTime / audio.duration) * 100
    setProgress(progress)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return
    
    const progressBar = e.currentTarget
    const clickX = e.clientX - progressBar.getBoundingClientRect().left
    const width = progressBar.clientWidth
    const seekTime = (clickX / width) * audioRef.current.duration
    
    audioRef.current.currentTime = seekTime
    setProgress((seekTime / audioRef.current.duration) * 100)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  // Effect to handle track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioUrl
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play().catch(console.error)
      }
    }
  }, [currentTrack, isPlaying])

  // Effect to reset progress when track changes
  useEffect(() => {
    setProgress(0)
  }, [currentTrackIndex])

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
                    onClick={() => playTrack(playlist)}
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

                {/* Track List */}
                <div className="mt-4 space-y-2">
                  {playlist.tracks.map((track, index) => (
                    <div
                      key={track.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer group/track"
                      onClick={() => playTrack(playlist, index)}
                    >
                      <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center">
                        {currentPlaylist?.id === playlist.id && currentTrackIndex === index && isPlaying ? (
                          <Pause className="w-3 h-3 text-primary" />
                        ) : (
                          <Play className="w-3 h-3 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">
                          {track.title}
                        </div>
                        <div className="text-xs text-foreground/60">
                          {track.artist} • {track.duration}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => window.open(playlist.url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Listen on {getServiceName(playlist.service)}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Music Player */}
        {currentPlaylist && currentTrack && (
          <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-glass border-t border-glass-border p-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4">
                {/* Track Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Music2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-foreground truncate">
                      {currentTrack.title}
                    </div>
                    <div className="text-sm text-foreground/60 truncate">
                      {currentTrack.artist} • {currentPlaylist.title}
                    </div>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevTrack}
                    disabled={currentTrackIndex === 0}
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="default"
                    size="sm"
                    className="rounded-full p-3"
                    onClick={togglePlay}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextTrack}
                    disabled={currentTrackIndex === currentPlaylist.tracks.length - 1}
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 max-w-md">
                  <div 
                    className="h-1 bg-foreground/20 rounded-full cursor-pointer"
                    onClick={handleSeek}
                  >
                    <div 
                      className="h-1 bg-primary rounded-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2 w-24">
                  <Volume2 className="w-4 h-4 text-foreground/60" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleProgress}
          onEnded={nextTrack}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

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
