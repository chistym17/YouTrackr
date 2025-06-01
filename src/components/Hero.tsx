'use client';

import { motion } from 'framer-motion';
import HeroContent from './HeroContent';
import HeroIllustration from './hero/HeroIllustration';

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex items-center justify-center lg:justify-start">
            <HeroContent />
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;