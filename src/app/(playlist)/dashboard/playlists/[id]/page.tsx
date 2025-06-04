'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Playlist, Video, playlistService } from '@/services/playlistService';
import VideoPlayer from '@/components/videos/VideoPlayer';
import AddVideoModal from '@/components/playlists/AddVideoModal';
import { toast } from 'react-hot-toast';
import { PlusIcon } from '@heroicons/react/24/outline';
import { formatDuration } from '@/services/youtubeService';

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
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !playlist) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
        <p className="text-red-400 text-lg mb-4">{error || 'Playlist not found'}</p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Playlist Header */}
      <div className="sticky top-16 z-10 w-full backdrop-blur-lg bg-gray-900/80 border-b border-gray-700/50">
        <div className="w-full px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">{playlist.name}</h1>
              {playlist.description && (
                <p className="text-sm text-gray-400 mt-1">{playlist.description}</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm ${
                playlist.isPublic 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-gray-500/20 text-gray-400'
              }`}>
                {playlist.isPublic ? 'Public' : 'Private'}
              </span>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsAddVideoModalOpen(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all shadow-lg shadow-blue-500/25"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Add Video</span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Column - Video List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 xl:col-span-4"
          >
            <div className="backdrop-blur-lg bg-gray-800/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-700/50 p-4">
              <h2 className="text-xl font-semibold text-white mb-4 px-2">
                Videos ({playlist.videos.length})
              </h2>

              <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 custom-scrollbar">
                {playlist.videos.map((video) => (
                  <motion.button
                    key={video.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedVideo(video.youtubeId)}
                    className={`w-full flex items-start space-x-4 p-3 rounded-xl transition-all ${
                      selectedVideo === video.youtubeId
                        ? 'bg-blue-500/20 border border-blue-500/30'
                        : 'hover:bg-gray-700/50 border border-transparent'
                    }`}
                  >
                    <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden">
                      <img
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <h3 className="text-base font-medium text-white line-clamp-2 text-left leading-snug">
                        {video.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-2">
                        {video.duration ? formatDuration(video.duration) : 'Unknown duration'}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Video Player */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 xl:col-span-8"
          >
            <div className="backdrop-blur-lg bg-gray-800/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-700/50 p-4">
              <div className="max-w-4xl mx-auto">
                {selectedVideo ? (
                  <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
                    <VideoPlayer videoUrl={`https://www.youtube.com/watch?v=${selectedVideo}`} />
                  </div>
                ) : (
                  <div className="aspect-video flex items-center justify-center bg-gray-800/30 rounded-xl border border-gray-700/50">
                    <div className="text-center">
                      <p className="text-gray-400 text-lg mb-3">Select a video to start playing</p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsAddVideoModalOpen(true)}
                        className="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25"
                      >
                        Add your first video
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <AddVideoModal
        isOpen={isAddVideoModalOpen}
        onClose={() => setIsAddVideoModalOpen(false)}
        onAdd={handleAddVideo}
      />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
} 