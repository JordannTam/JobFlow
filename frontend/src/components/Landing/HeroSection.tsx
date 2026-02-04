import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

/**
 * Hero section with Finpay-inspired design.
 * Text on LEFT (50%), image placeholder on RIGHT (50%).
 * Teal brand color scheme with Motion animations.
 */
export const HeroSection = (): JSX.Element => {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-brand-dark tracking-tight leading-tight"
            >
              Land your dream job,
              <br />
              <span className="text-brand">
                organized.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-xl text-brand-body max-w-lg"
            >
              Stop juggling spreadsheets. Track every application, interview, and offer in one beautiful dashboard.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex items-center gap-4"
            >
              <Link to="/applications">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg bg-brand hover:bg-brand-dark text-white border-0 cursor-pointer"
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
          </div>

          {/* Right side - Image placeholder with gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Teal gradient background for placeholder */}
              <div className="aspect-[4/3] bg-brand p-8 flex items-center justify-center">
                {/* Mock dashboard preview */}
                <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
                  {/* Mock header */}
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-32 bg-white/30 rounded" />
                    <div className="h-8 w-24 bg-white/20 rounded-lg" />
                  </div>
                  {/* Mock stat cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-16 bg-white/20 rounded-lg" />
                    <div className="h-16 bg-white/20 rounded-lg" />
                    <div className="h-16 bg-white/20 rounded-lg" />
                  </div>
                  {/* Mock table rows */}
                  <div className="space-y-2 pt-2">
                    <div className="h-10 bg-white/15 rounded-lg" />
                    <div className="h-10 bg-white/15 rounded-lg" />
                    <div className="h-10 bg-white/15 rounded-lg" />
                    <div className="h-10 bg-white/15 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative blur elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
