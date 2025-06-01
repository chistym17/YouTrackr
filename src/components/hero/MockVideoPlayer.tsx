'use client';

import { motion } from 'framer-motion';
import { Play, Clock, Shield, Target } from 'lucide-react';

export default function MockVideoPlayer() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative"
    >
      {/* Mock Video Player */}
      <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl">
        <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
          >
            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
          </motion.div>
        </div>
        
        {/* Player Controls */}
        <div className="p-4 bg-gray-800/80">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium">Advanced React Tutorial - Part 1</span>
            <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold">
              <Clock className="w-4 h-4" />
              <span>25:30</span>
            </div>
          </div>
          <div className="mt-2 bg-gray-700 rounded-full h-2">
            <div className="bg-blue-500 h-full rounded-full w-1/3"></div>
          </div>
        </div>
        
        {/* Focus Lock Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute top-4 right-4 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg px-3 py-1"
        >
          <div className="flex items-center gap-2 text-blue-400 text-sm font-medium">
            <Shield className="w-4 h-4" />
            <span>Focus Lock: ON</span>
          </div>
        </motion.div>
      </div>
      
      {/* Floating Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute -bottom-6 -left-6 bg-gray-800/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
            <Target className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <p className="text-white font-semibold">Focus Score</p>
            <p className="text-green-400 text-xl font-bold">95%</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 