'use client';

import { motion } from 'framer-motion';

const HeroContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight"
      >
        Focus on what matters,{' '}
        <span className="text-[#FF0000]">watch with purpose</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg font-semibold text-white/80 max-w-xl leading-relaxed"
      >
        Transform your YouTube experience. Track progress, stay focused, and build better watching habits with our distraction-free platform.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-[#FF0000] text-white rounded-lg font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
        >
          Get Started Free
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-white/5 text-white rounded-lg font-semibold border border-white/10 hover:bg-white/10 transition-all"
        >
          Learn More
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-3 text-sm font-medium text-white/60"
      >
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="w-8 h-8 rounded-full bg-[#FF0000]/10 border-2 border-white/10 shadow-sm" 
            />
          ))}
        </div>
        <p className="font-semibold text-white/80">Join 1,000+ focused learners</p>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent; 