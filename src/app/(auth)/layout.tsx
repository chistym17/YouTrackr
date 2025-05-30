'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 bg-white"
      >
        <div className="mx-auto w-full max-w-md">
          <Link 
            href="/"
            className="text-3xl font-extrabold text-[#FF0000] mb-10 block"
          >
            YouFocus
          </Link>
          {children}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="hidden lg:block lg:w-1/2 relative bg-gray-100"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop"
            alt="Focus and productivity"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-16 text-white">
          <h2 className="text-5xl font-bold mb-6 leading-tight">Transform Your YouTube Experience</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Join thousands of focused learners who are building better watching habits and achieving their goals.
          </p>
        </div>
      </motion.div>
    </div>
  );
} 