'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full bg-gray-900/40 backdrop-blur-lg z-50 border-b border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
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
              className="px-6 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all border border-gray-700/50"
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-all shadow-lg shadow-blue-500/25"
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
      className="text-gray-300 hover:text-blue-400 transition-colors font-medium"
    >
      {children}
    </Link>
  </motion.div>
);

export default Navbar; 