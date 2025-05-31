'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import HeroContent from './HeroContent';

const Hero = () => {
  return (
    <div className="min-h-screen bg-black pt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <HeroContent />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[500px] w-full"
          >
            <div className="absolute inset-0 bg-[#FF0000]/5 rounded-2xl backdrop-blur-sm border border-white/5" />
            <Image
              src="/hero-illustration.svg"
              alt="YouTube Focus Illustration"
              fill
              className="object-contain p-8"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 