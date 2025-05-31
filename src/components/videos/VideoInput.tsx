'use client';

import { motion } from 'framer-motion';

interface VideoInputProps {
  videoUrl: string;
  onVideoUrlChange: (url: string) => void;
  onPlay: (e: React.FormEvent) => void;
}

export default function VideoInput({ videoUrl, onVideoUrlChange, onPlay }: VideoInputProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-lg border border-white/5 rounded-xl p-6"
    >
      <form onSubmit={onPlay} className="flex gap-4">
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => onVideoUrlChange(e.target.value)}
          placeholder="Paste YouTube video URL here"
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-[#FF0000]/50"
        />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="px-6 py-2 bg-[#FF0000] text-white rounded-lg font-medium hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
        >
          Play
        </motion.button>
      </form>
    </motion.div>
  );
} 