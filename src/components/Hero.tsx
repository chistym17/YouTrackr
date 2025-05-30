'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import HeroContent from './HeroContent';

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <HeroContent />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[500px] w-full"
          >
            <Image
              src="/hero-illustration.svg"
              alt="YouTube Focus Illustration"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 