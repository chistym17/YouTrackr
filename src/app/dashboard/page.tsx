'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import PlaylistsSection from '@/components/playlists/PlaylistsSection';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(user);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-lg bg-gray-800/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-700/50 p-8"
        >
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className="p-3 rounded-full bg-blue-500/20 backdrop-blur-sm shadow-lg">
                <UserCircleIcon className="h-16 w-16 text-blue-400" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Welcome back!</h2>
              <p className="text-gray-400 mt-1">{user?.email}</p>
            </div>
          </div>
        </motion.div>

        <PlaylistsSection />
      </div>
    </div>
  );
} 