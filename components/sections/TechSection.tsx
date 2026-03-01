'use client';

import { motion } from 'framer-motion';

const technologies = [
  { name: 'Next.js',      bg: '#000',     color: '#fff',    letter: 'N' },
  { name: 'React',        bg: '#20232a',  color: '#61dafb', letter: 'R' },
  { name: 'Angular',      bg: '#dd0031',  color: '#fff',    letter: 'A' },
  { name: 'Node.js',      bg: '#3c873a',  color: '#fff',    letter: 'N' },
  { name: 'NestJS',       bg: '#e0234e',  color: '#fff',    letter: 'N' },
  { name: 'PostgreSQL',   bg: '#336791',  color: '#fff',    letter: 'P' },
  { name: 'MySQL',        bg: '#00618a',  color: '#fff',    letter: 'M' },
  { name: 'Laravel',      bg: '#ff2d20',  color: '#fff',    letter: 'L' },
  { name: 'Flutter',      bg: '#02569b',  color: '#fff',    letter: 'F' },
  { name: 'Tailwind CSS', bg: '#0ea5e9',  color: '#fff',    letter: 'T' },
];

export default function TechSection() {
  return (
    <section className="py-24 bg-[var(--bg-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#E31837]">
            Notre stack
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black text-[var(--fg)]">
            Technologies maîtrisées
          </h2>
          <p className="mt-4 text-lg text-[var(--fg-muted)] max-w-2xl mx-auto">
            Nous utilisons les technologies les plus modernes pour construire des
            produits fiables et scalables.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-5">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, type: 'spring' }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl min-w-[100px]
                bg-[var(--bg-card)] border border-[var(--border)]
                hover:border-[#002B5C] dark:hover:border-[#003d80]
                transition-all duration-300 cursor-default group"
            >
              {/* Tech avatar */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center
                  text-xl font-black shadow-md group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: tech.bg, color: tech.color }}
              >
                {tech.letter}
              </div>

              <span className="text-sm font-semibold text-[var(--fg)] text-center whitespace-nowrap">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
