import type { JSX } from 'react';
import { motion } from 'motion/react';
import { ClipboardList, BarChart3, Sparkles } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const features: Feature[] = [
  {
    title: 'Track Applications',
    description: 'Keep all your job applications organized in one place. Never lose track of where you applied.',
    icon: <ClipboardList className="w-6 h-6" />,
  },
  {
    title: 'Monitor Progress',
    description: 'See your application status at a glance. From applied to interview to offer.',
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    title: 'Stay Organized',
    description: 'Add notes, links, and dates. Everything you need to ace your job search.',
    icon: <Sparkles className="w-6 h-6" />,
  },
];

/**
 * Features section with 3 feature cards.
 * Uses brand teal icons and Motion animations.
 */
export const FeaturesSection = (): JSX.Element => {
  return (
    <section className="container shadow-lg mx-auto px-6 py-20 bg-white rounded-4xl border">
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
