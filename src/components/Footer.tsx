'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-[#FF0000]">
              YouFocus
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              Transform your YouTube experience with focused watching and better habits.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="/features">Features</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/help">Help Center</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex space-x-4">
              {['twitter', 'github', 'linkedin'].map((social) => (
                <motion.a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 hover:text-[#FF0000] transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-6 h-6 bg-gray-200 rounded-full" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} YouFocus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.li whileHover={{ x: 5 }}>
    <Link 
      href={href}
      className="text-sm text-gray-600 hover:text-[#FF0000] transition-colors"
    >
      {children}
    </Link>
  </motion.li>
);

export default Footer; 