import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'Track Applications',
    description: 'Keep all your job applications organized in one place. Never lose track of where you applied.',
    icon: '📋',
  },
  {
    title: 'Monitor Progress',
    description: 'See your application status at a glance. From applied to interview to offer.',
    icon: '📊',
  },
  {
    title: 'Stay Organized',
    description: 'Add notes, links, and dates. Everything you need to ace your job search.',
    icon: '✨',
  },
];

/**
 * Landing page with hero, features, and CTA.
 * Uses Motion for animations.
 */
export const Landing = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <span className="text-xl font-bold text-gray-900">JobTracker</span>
          <Link to="/applications">
            <Button variant="ghost">Sign In</Button>
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-32 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight"
        >
          Land your dream job,
          <br />
          <span className="text-blue-600">organized.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Stop juggling spreadsheets. Track every application, interview, and offer in one beautiful dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <Link to="/applications">
            <Button size="lg" className="px-8 py-6 text-lg">
              Get Started — It's Free
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              View Demo
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center text-gray-900 mb-16"
        >
          Everything you need to succeed
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 rounded-3xl p-12 md:p-20 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to organize your job search?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join thousands of job seekers who landed their dream roles.
          </p>
          <Link to="/applications/new">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg"
            >
              Add Your First Application
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 text-center text-gray-500 text-sm">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Built by Jordan • Portfolio Project
        </motion.p>
      </footer>
    </div>
  );
};
