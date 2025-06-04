'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Playlist, Video, playlistService } from '@/services/playlistService';
import VideoPlayer from '@/components/videos/VideoPlayer';
import AddVideoModal from '@/components/playlists/AddVideoModal';
import { toast } from 'react-hot-toast';
import { 
  PlusIcon, 
  PlayIcon, 
  ClockIcon, 
  EyeIcon, 
  LockClosedIcon,
  VideoCameraIcon,
  ListBulletIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { 
  PlayIcon as PlayIconSolid,
  PauseIcon
} from '@heroicons/react/24/solid';
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
      <div className="min-h-screen bg-black">
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-700 border-t-white rounded-full animate-spin"></div>
              <VideoCameraIcon className="w-8 h-8 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-gray-300 font-medium">Loading playlist...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !playlist) {
    return (
      <div className="min-h-screen bg-black">
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700 max-w-md w-full">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <VideoCameraIcon className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Oops!</h2>
            <p className="text-red-400 mb-6">{error || 'Playlist not found'}</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 w-full px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-all shadow-lg"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Go Back</span>
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  const currentVideoIndex = playlist.videos.findIndex(v => v.youtubeId === selectedVideo);
  const currentVideo = playlist.videos[currentVideoIndex];
  const totalDuration = playlist.videos.reduce((acc, video) => acc + (video.duration || 0), 0);

  return (
    <div className="min-h-screen bg-black">
      {/* Enhanced Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-700">
                <ListBulletIcon className="w-8 h-8 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">{playlist.name}</h1>
                {playlist.description && (
                  <p className="text-gray-300 mb-2 line-clamp-2">{playlist.description}</p>
                )}
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <VideoCameraIcon className="w-4 h-4" />
                    <span>{playlist.videos.length} videos</span>
                  </div>
                  {totalDuration > 0 && (
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{formatDuration(totalDuration)}</span>
                    </div>
                  )}
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                    playlist.isPublic 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {playlist.isPublic ? <EyeIcon className="w-3 h-3" /> : <LockClosedIcon className="w-3 h-3" />}
                    <span>{playlist.isPublic ? 'Public' : 'Private'}</span>
                  </div>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAddVideoModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-all shadow-lg flex-shrink-0"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add Video</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Video Player Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="xl:col-span-8"
          >
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700 overflow-hidden shadow-2xl">
              {selectedVideo ? (
                <>
                  <div className="aspect-video bg-black">
                    <VideoPlayer videoUrl={`https://www.youtube.com/watch?v=${selectedVideo}`} />
                  </div>
                  {currentVideo && (
                    <div className="p-6">
                      <h2 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                        {currentVideo.title}
                      </h2>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <PlayIconSolid className="w-4 h-4" />
                            <span>Video {currentVideoIndex + 1} of {playlist.videos.length}</span>
                          </div>
                          {currentVideo.duration && (
                            <div className="flex items-center space-x-1">
                              <ClockIcon className="w-4 h-4" />
                              <span>{formatDuration(currentVideo.duration)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-video flex items-center justify-center p-8">
                  <div className="text-center max-w-md">
                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700">
                      <PlayIcon className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Ready to watch?</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Select a video from the playlist to start streaming, or add your first video to get started.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsAddVideoModalOpen(true)}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-black rounded-xl font-medium hover:bg-gray-100 transition-all shadow-lg"
                    >
                      <PlusIcon className="w-5 h-5" />
                      <span>Add Video</span>
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Playlist Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="xl:col-span-4"
          >
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-700 shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">Playlist</h3>
                  <span className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded-full border border-gray-600">
                    {playlist.videos.length} videos
                  </span>
                </div>
                {totalDuration > 0 && (
                  <p className="text-sm text-gray-400">
                    Total duration: {formatDuration(totalDuration)}
                  </p>
                )}
              </div>

              <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
                {playlist.videos.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                      <VideoCameraIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Empty playlist</h4>
                    <p className="text-gray-400 mb-4">Add some videos to get started</p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsAddVideoModalOpen(true)}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-all"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span>Add Video</span>
                    </motion.button>
                  </div>
                ) : (
                  <div className="p-2">
                    {playlist.videos.map((video, index) => {
                      const isActive = selectedVideo === video.youtubeId;
                      return (
                        <motion.button
                          key={video.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => setSelectedVideo(video.youtubeId)}
                          className={`w-full flex items-start space-x-3 p-3 rounded-2xl transition-all mb-2 group ${
                            isActive
                              ? 'bg-gray-800 border border-gray-600'
                              : 'hover:bg-gray-800/50 border border-transparent'
                          }`}
                        >
                          <div className="relative flex-shrink-0">
                            <div className="w-16 h-12 rounded-xl overflow-hidden bg-gray-800">
                              <img
                                src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                alt={video.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className={`absolute inset-0 flex items-center justify-center rounded-xl transition-opacity ${
                              isActive ? 'bg-black/60 opacity-100' : 'bg-black/40 opacity-0 group-hover:opacity-100'
                            }`}>
                              {isActive ? (
                                <PauseIcon className="w-4 h-4 text-white" />
                              ) : (
                                <PlayIcon className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <div className="absolute top-1 left-1 bg-black/80 text-white text-xs px-1 rounded">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <h4 className={`text-sm font-medium line-clamp-2 leading-tight mb-1 ${
                              isActive ? 'text-white' : 'text-gray-200 group-hover:text-white'
                            }`}>
                              {video.title}
                            </h4>
                            <div className="flex items-center space-x-2 text-xs text-gray-400">
                              {video.duration && (
                                <div className="flex items-center space-x-1">
                                  <ClockIcon className="w-3 h-3" />
                                  <span>{formatDuration(video.duration)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
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
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.4) transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.4);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.6);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}