'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { UserCircleIcon, EnvelopeIcon, CalendarIcon } from '@heroicons/react/24/outline';

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF0000]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Dashboard
          </h1>
          <p className="mt-3 text-lg text-gray-300">Welcome to your YouFocus dashboard</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6"
        >
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm">
                <UserCircleIcon className="h-16 w-16 text-purple-400" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">Account Information</h2>
              <p className="text-sm text-gray-400">Your personal account details</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 space-y-6">
            <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <EnvelopeIcon className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Email address</p>
                <p className="text-base text-white">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200">
              <div className="p-2 rounded-lg bg-pink-500/20">
                <CalendarIcon className="h-6 w-6 text-pink-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Member since</p>
                <p className="text-base text-white">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6 hover:bg-white/15 transition-colors duration-200">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                <p className="text-sm text-gray-400">Total Focus Time</p>
                <p className="text-2xl font-bold text-white">0h 0m</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6 hover:bg-white/15 transition-colors duration-200">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500/20 to-red-500/20">
                <p className="text-sm text-gray-400">Last Session</p>
                <p className="text-2xl font-bold text-white">No sessions yet</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 