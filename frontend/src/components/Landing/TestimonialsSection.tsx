import type { JSX } from 'react';
import { motion } from 'motion/react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "JobPilot helped me stay organized during my job search. I landed my dream role at a FAANG company within 3 months!",
    name: "Sarah M.",
    role: "Software Engineer",
    initials: "SM",
  },
  {
    quote: "Finally, a job tracker that doesn't feel like a chore. The clean interface made tracking 50+ applications actually manageable.",
    name: "James L.",
    role: "Product Manager",
    initials: "JL",
  },
];

/**
 * Testimonials section displaying user success stories.
 * Shows avatar initials, name, role, and quote.
 */
export const TestimonialsSection = (): JSX.Element => {
  return (
    <section className="container mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center text-brand-dark mb-12"
      >
        Loved by job seekers
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-8 rounded-2xl bg-brand-light border border-gray-100 shadow-sm"
          >
            <p className="text-brand-body text-lg italic leading-relaxed mb-6">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-4">
              {/* Avatar with brand color */}
              <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white font-semibold text-sm">
                {testimonial.initials}
              </div>
              <div>
                <p className="font-semibold text-brand-dark">{testimonial.name}</p>
                <p className="text-sm text-brand-body">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
