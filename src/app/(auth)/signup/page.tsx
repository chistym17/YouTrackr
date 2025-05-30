'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { EnvelopeIcon, LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      alert('Check your email for the confirmation link!');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Create your account</h1>
        <p className="mt-3 text-lg text-gray-700">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[#FF0000] hover:text-red-600">
            Sign in
          </Link>
        </p>
      </div>

      <form onSubmit={handleEmailSignup} className="space-y-6">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 text-base text-red-600 bg-red-50 rounded-lg border border-red-100"
          >
            {error}
          </motion.div>
        )}

        <div>
          <label htmlFor="email" className="block text-base font-semibold text-gray-900 mb-2">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <EnvelopeIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 rounded-lg border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 shadow-sm focus:border-[#FF0000] focus:ring-[#FF0000]"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-base font-semibold text-gray-900 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockClosedIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 rounded-lg border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 shadow-sm focus:border-[#FF0000] focus:ring-[#FF0000]"
              placeholder="Create a password"
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirm-password" className="block text-base font-semibold text-gray-900 mb-2">
            Confirm password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ShieldCheckIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full pl-10 rounded-lg border border-gray-300 bg-white px-4 py-3 text-lg text-gray-900 shadow-sm focus:border-[#FF0000] focus:ring-[#FF0000]"
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-5 w-5 rounded border-gray-300 text-[#FF0000] focus:ring-[#FF0000] bg-white"
            />
          </div>
          <label htmlFor="terms" className="ml-3 block text-base text-gray-900">
            I agree to the{' '}
            <Link href="/terms" className="font-semibold text-[#FF0000] hover:text-red-600">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="font-semibold text-[#FF0000] hover:text-red-600">
              Privacy Policy
            </Link>
          </label>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#FF0000] px-6 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-[#FF0000] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </motion.button>
      </form>
    </div>
  );
} 