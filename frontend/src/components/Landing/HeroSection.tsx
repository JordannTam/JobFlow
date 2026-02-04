import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

/**
 * Hero section with gradient background.
 * Centered text content with animated gradient orbs.
 */
export const HeroSection = (): JSX.Element => {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Animated gradient background orbs */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-brand/30 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-1/2 -left-40 w-80 h-80 bg-brand/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute -bottom-20 right-1/4 w-72 h-72 bg-brand/25 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-20 lg:py-28 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-brand-dark tracking-tight leading-tight"
          >
            Land your dream job,
            <br />
            <span className="bg-gradient-to-r from-brand to-teal-400 bg-clip-text text-transparent">
              organized.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-brand-body max-w-2xl mx-auto"
          >
            Stop juggling spreadsheets. Track every application, interview, and offer in one beautiful dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/applications">
              <Button
                size="lg"
                className="px-8 py-6 text-lg bg-gradient-to-r from-brand to-teal-500 hover:from-brand-dark hover:to-teal-600 text-white border-0 cursor-pointer shadow-lg shadow-brand/25"
              >
                Get Started — It's Free
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg border-brand text-brand hover:bg-brand hover:text-white cursor-pointer"
              >
                View Demo
              </Button>
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-brand-body/70"
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-dark">1000+</p>
              <p className="text-sm">Applications Tracked</p>
            </div>
            <div className="w-px h-12 bg-gray-300 hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-dark">4</p>
              <p className="text-sm">Status Categories</p>
            </div>
            <div className="w-px h-12 bg-gray-300 hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-dark">100%</p>
              <p className="text-sm">Free to Use</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
