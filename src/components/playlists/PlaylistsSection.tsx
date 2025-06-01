'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import CreatePlaylistModal from './CreatePlaylistModal';
import { playlistService, type Playlist } from '@/services/playlistService';
import { toast } from 'react-hot-toast';

export default function PlaylistsSection() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaylists = async () => {
    try {
      const data = await playlistService.getPlaylists();
      setPlaylists(data);
      setError(null);
    } catch (err) {
      setError('Failed to load playlists');
      toast.error('Failed to load playlists');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async (data: { name: string; description: string; isPublic: boolean }) => {
    try {
      const newPlaylist = await playlistService.createPlaylist(data);
      setPlaylists(prev => [...prev, newPlaylist]);
      toast.success('Playlist created successfully!');
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Failed to create playlist');
      throw err;
    }
  };

  const handlePlaylistClick = (playlistId: string) => {
    router.push(`/dashboard/playlists/${playlistId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="backdrop-blur-lg bg-gray-800/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-700/50 p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold text-white">My Playlists</h3>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all shadow-lg shadow-blue-500/25"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Create Playlist</span>
        </motion.button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-400">
            <p>{error}</p>
            <button
              onClick={fetchPlaylists}
              className="mt-2 text-sm text-blue-400 hover:text-blue-300"
            >
              Try again
            </button>
          </div>
        ) : playlists.length === 0 ? (
          <div className="text-center py-12 text-gray-400 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <p className="text-lg">No playlists yet</p>
            <p className="mt-2 text-sm">Create your first playlist to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlists.map((playlist) => (
              <motion.div
                key={playlist.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePlaylistClick(playlist.id)}
                className="p-6 rounded-xl cursor-pointer transition-all bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 shadow-lg hover:shadow-xl"
              >
                <h4 className="font-semibold text-white text-lg">{playlist.name}</h4>
                {playlist.description && (
                  <p className="mt-2 text-sm text-gray-400 line-clamp-2">{playlist.description}</p>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {playlist?.videos?.length || 0} videos
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    playlist.isPublic 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {playlist.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </motion.div>
  );
} 