'use client';

import { motion } from 'framer-motion';

export default function HeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative w-full max-w-lg mx-auto"
    >
      <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl p-8">
        <svg
          viewBox="0 0 400 300"
          className="w-full h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background Elements */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            d="M50 50h300v200H50z"
            stroke="url(#gradient1)"
            strokeWidth="2"
            strokeDasharray="8 8"
            className="opacity-20"
          />
          
          {/* Main Video Frame */}
          <motion.rect
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            x="75"
            y="75"
            width="250"
            height="150"
            rx="8"
            fill="url(#gradient2)"
            className="shadow-lg"
          />
          
          {/* Play Button */}
          <motion.circle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.8 }}
            cx="200"
            cy="150"
            r="30"
            fill="#3B82F6"
            className="shadow-lg"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            d="M190 135l20 15-20 15z"
            fill="white"
          />
          
          {/* Focus Lock Badge */}
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            transform="translate(280, 85)"
          >
            <rect
              width="80"
              height="24"
              rx="12"
              fill="#3B82F6"
              fillOpacity="0.2"
              stroke="#3B82F6"
              strokeOpacity="0.3"
            />
            <text
              x="40"
              y="16"
              textAnchor="middle"
              fill="#3B82F6"
              className="text-xs font-medium"
            >
              Focus Lock
            </text>
          </motion.g>
          
          {/* Progress Bar */}
          <motion.rect
            initial={{ width: 0 }}
            animate={{ width: 250 }}
            transition={{ duration: 1, delay: 0.5 }}
            x="75"
            y="235"
            height="4"
            rx="2"
            fill="#3B82F6"
            fillOpacity="0.3"
          />
          <motion.rect
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ duration: 1, delay: 0.7 }}
            x="75"
            y="235"
            height="4"
            rx="2"
            fill="#3B82F6"
          />
          
          {/* Gradients */}
          <defs>
            <linearGradient id="gradient1" x1="0" y1="0" x2="400" y2="300">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0" y1="0" x2="250" y2="150">
              <stop offset="0%" stopColor="#1F2937" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
          </defs>
        </svg>
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
            <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
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