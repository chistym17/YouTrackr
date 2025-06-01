'use client';

import { motion } from 'framer-motion';
import { Shield, Target, Clock } from 'lucide-react';

const HeroContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl space-y-12"
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight"
      >
        <span className="block">Learn Better,</span>
        <span className="block text-blue-400 mt-2">Stay Focused</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-8 text-sm"
      >
        {[
          { icon: Shield, text: "Focus Mode" },
          { icon: Target, text: "Track Progress" },
          { icon: Clock, text: "Save Time" }
        ].map(({ icon: Icon, text }, index) => (
          <div key={index} className="flex items-center gap-2 text-gray-400">
            <Icon className="w-4 h-4 text-blue-400" />
            <span className="font-medium">{text}</span>
          </div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 bg-blue-500 text-white rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25"
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;