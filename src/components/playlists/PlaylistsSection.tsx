'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';
import CreatePlaylistModal from './CreatePlaylistModal';
import { playlistService, type Playlist } from '@/services/playlistService';
import { toast } from 'react-hot-toast';

export default function PlaylistsSection() {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">My Playlists</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Create Playlist</span>
        </button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-400">
            <p>{error}</p>
            <button
              onClick={fetchPlaylists}
              className="mt-2 text-sm text-purple-400 hover:text-purple-300"
            >
              Try again
            </button>
          </div>
        ) : playlists.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No playlists yet. Create your first playlist!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <h4 className="font-medium text-white">{playlist.name}</h4>
                {playlist.description && (
                  <p className="mt-1 text-sm text-gray-400">{playlist.description}</p>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {playlist?.videos?.length} videos
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    playlist.isPublic 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {playlist.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
              </div>
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