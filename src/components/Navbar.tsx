'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Link href="/" className="text-2xl font-bold text-[#FF0000]">
              YouFocus
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/videos">My Videos</NavLink>
            <NavLink href="/stats">Stats</NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm font-medium text-[#FF0000] hover:bg-red-50 rounded-full transition-colors"
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-sm font-medium text-white bg-[#FF0000] hover:bg-red-600 rounded-full transition-colors"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <Link 
      href={href}
      className="text-gray-600 hover:text-[#FF0000] transition-colors"
    >
      {children}
    </Link>
  </motion.div>
);

export default Navbar; 