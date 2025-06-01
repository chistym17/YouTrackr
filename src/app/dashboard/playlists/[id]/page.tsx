'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Playlist, Video, playlistService } from '@/services/playlistService';
import VideoPlayer from '@/components/videos/VideoPlayer';
import AddVideoModal from '@/components/playlists/AddVideoModal';
import { toast } from 'react-hot-toast';

export default function PlaylistDetailPage() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);

  const fetchPlaylist = async () => {
    try {
      const data = await playlistService.getPlaylistById(id as string);
      setPlaylist(data);
      if (data.videos.length > 0 && !selectedVideo) {
        setSelectedVideo(data.videos[0].youtubeId);
      }
      setError(null);
    } catch (err) {
      setError('Failed to load playlist');
      toast.error('Failed to load playlist');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, [id]);

  const handleAddVideo = async (youtubeUrl: string) => {
    if (!playlist) return;
    
    try {
      const newVideo = await playlistService.addVideoToPlaylist(playlist.id, youtubeUrl);
      setPlaylist(prev => {
        if (!prev) return null;
        // If this is the first video, select it
        if (prev.videos.length === 0) {
          setSelectedVideo(newVideo.youtubeId);
        }
        return {
          ...prev,
          videos: [...prev.videos, newVideo],
        };
      });
      toast.success('Video added to playlist!');
    } catch (err) {
      toast.error('Failed to add video');
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF0000]"></div>
      </div>
    );
  }

  if (error || !playlist) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-red-400 text-lg mb-4">{error || 'Playlist not found'}</p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-[#FF0000] text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-[#FF0000]/10 to-transparent pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{playlist.name}</h1>
            {playlist.description && (
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">{playlist.description}</p>
            )}
            <div className="mt-6 flex items-center justify-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm ${
                playlist.isPublic 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {playlist.isPublic ? 'Public' : 'Private'}
              </span>
              <span className="text-gray-400 text-sm">
                {playlist.videos.length} {playlist.videos.length === 1 ? 'video' : 'videos'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Video List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Videos</h2>
                <button
                  onClick={() => setIsAddVideoModalOpen(true)}
                  className="px-4 py-2 bg-[#FF0000] text-white rounded-lg font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
                >
                  Add Video
                </button>
              </div>

              <div className="space-y-4">
                {playlist.videos.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p>No videos in this playlist yet.</p>
                    <p className="mt-2 text-sm">Click "Add Video" to get started!</p>
                  </div>
                ) : (
                  playlist.videos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setSelectedVideo(video.youtubeId)}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedVideo === video.youtubeId
                          ? 'bg-[#FF0000]/20 border-[#FF0000]/50 scale-[1.02]'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 hover:scale-[1.01]'
                      } border`}
                    >
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0 w-32 h-20 bg-gray-800 rounded-lg overflow-hidden">
                          {video.thumbnail && (
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-white truncate">
                            {video.title}
                          </h3>
                          <p className="mt-1 text-xs text-gray-400">
                            {video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : 'Unknown duration'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Video Player */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-6">
              {selectedVideo ? (
                <VideoPlayer videoUrl={`https://www.youtube.com/watch?v=${selectedVideo}`} />
              ) : (
                <div className="aspect-video flex items-center justify-center bg-black/40 rounded-xl">
                  <div className="text-center">
                    <p className="text-gray-400 mb-2">Select a video to start playing</p>
                    <button
                      onClick={() => setIsAddVideoModalOpen(true)}
                      className="text-[#FF0000] hover:text-red-400 transition-colors"
                    >
                      Add your first video
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <AddVideoModal
        isOpen={isAddVideoModalOpen}
        onClose={() => setIsAddVideoModalOpen(false)}
        onAdd={handleAddVideo}
      />
    </div>
  );
} 