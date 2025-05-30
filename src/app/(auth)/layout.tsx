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
        className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 bg-white"
      >
        <div className="mx-auto w-full max-w-sm">
          <Link 
            href="/"
            className="text-2xl font-bold text-[#FF0000] mb-8 block"
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
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="absolute inset-0 bg-[url('/auth-background.jpg')] bg-cover bg-center mix-blend-overlay opacity-90" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Transform Your YouTube Experience</h2>
          <p className="text-lg text-white/90">
            Join thousands of focused learners who are building better watching habits.
          </p>
        </div>
      </motion.div>
    </div>
  );
} 