import type { JSX } from 'react';
import { motion } from 'motion/react';

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const features: Feature[] = [
  {
    title: 'Track Applications',
    description: 'Keep all your job applications organized in one place. Never lose track of where you applied.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Monitor Progress',
    description: 'See your application status at a glance. From applied to interview to offer.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Stay Organized',
    description: 'Add notes, links, and dates. Everything you need to ace your job search.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

/**
 * Features section with 3 feature cards.
 * Uses brand teal icons and Motion animations.
 */
export const FeaturesSection = (): JSX.Element => {
  return (
    <section className="container border-b-0 shadow-lg mx-auto px-6 py-20 bg-white rounded-2xl">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center text-brand-dark mb-4"
      >
        Everything you need to succeed
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-brand-body text-center mb-16 max-w-2xl mx-auto"
      >
        A simple, powerful toolkit to help you land your next role
      </motion.p>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-8 rounded-2xl"
          >
            {/* Icon with brand background */}
            <div className="w-12 h-12 rounded-xl bg-brand flex items-center justify-center text-white mb-5">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-brand-dark mb-2">
              {feature.title}
            </h3>
            <p className="text-brand-body">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
