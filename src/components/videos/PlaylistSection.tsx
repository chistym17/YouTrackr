'use client';

import { motion } from 'framer-motion';

export default function PlaylistSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-lg border border-white/5 rounded-xl p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">My Playlists</h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-[#FF0000] text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
        >
          Create Playlist
        </motion.button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Placeholder Playlist Cards */}
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <h3 className="text-white font-medium">Playlist {i}</h3>
            <p className="text-white/60 text-sm mt-1">0 videos</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 