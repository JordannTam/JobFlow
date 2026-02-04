import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { TestimonialsSection } from './TestimonialsSection';

/**
 * Landing page with hero, features, testimonials, and CTA.
 * Uses Motion for animations.
 * Navbar is rendered by App.tsx above this component.
 */
export const Landing = (): JSX.Element => {
  return (
    <div>
      {/* Top Section - Hero + Features with brand-light background */}
      <div className="bg-brand-light">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section - White card floating on brand-light */}
        <div className="relative">
          {/* Background split: top half brand-light, bottom half white */}
          <div className="absolute inset-0 top-1/2 bg-white" />
          <div className="relative z-10">
            <FeaturesSection />
          </div>
        </div>
      </div>

      {/* Bottom Section - Testimonials, CTA, Footer on white */}
      <div className="bg-white">
        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-brand rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to organize your job search?
              </h2>
              <p className="text-white/80 mb-8 text-lg max-w-xl mx-auto">
                Join thousands of job seekers who landed their dream roles.
              </p>
              <Link to="/applications/new">
                <Button
                  size="lg"
                  className="bg-white text-brand hover:bg-gray-100 px-8 py-6 text-lg font-semibold cursor-pointer"
                >
                  Add Your First Application
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 text-center text-brand-body text-sm">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Built by Jordan • Portfolio Project
          </motion.p>
        </footer>
      </div>
    </div>
  );
};
