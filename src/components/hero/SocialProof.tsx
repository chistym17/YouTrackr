'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export default function SocialProof() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="flex items-center gap-4 pt-6"
    >
      <div className="flex -space-x-3">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-3 border-gray-800 flex items-center justify-center shadow-sm" 
          >
            <Users className="w-5 h-5 text-white" />
          </div>
        ))}
      </div>
      <div>
        <p className="text-white font-semibold text-lg">2,500+ Students</p>
        <p className="text-gray-400 text-sm">already learning distraction-free</p>
      </div>
    </motion.div>
  );
} 