import { motion, useReducedMotion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const STATS = [
  { value: "6+", label: "Projects Built" },
  { value: "8+", label: "Technologies" },
  { value: "2027", label: "B.Tech Grad" },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? {} : containerVariants;
  const iVariants = shouldReduceMotion ? {} : itemVariants;

  return (
    <section
      id="about"
      className="py-24 px-4 relative"
      aria-label="About me"
    >
      {/* Subtle gradient bg */}
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: "var(--gradient-card)" }}
        aria-hidden="true"
      />

      <motion.div
        className="relative max-w-5xl mx-auto"
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section header */}
        <motion.div className="text-center mb-14" variants={iVariants}>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-violet-light)] mb-3 block">
            Get to Know Me
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold">
            About{" "}
            <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Main text */}
          <motion.div
            className="lg:col-span-3 space-y-5"
            variants={iVariants}
          >
            <div className="glass rounded-2xl p-8 space-y-5">
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                Hi! I'm <span className="text-white font-semibold">Om Dwivedi</span>, a Full-Stack
                Developer pursuing B.Tech in Computer Science from SRM Institute of
                Science and Technology, Kattankulathur — graduating in 2027.
              </p>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                I love building end-to-end web applications—from designing responsive
                frontends with React, developing robust backends with Node.js and
                Express, to working with databases and REST APIs. I enjoy turning ideas
                into real, functional products.
              </p>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                When I'm not coding, I enjoy exploring AI and deep learning concepts,
                solving coding challenges, and experimenting with new frameworks to stay
                at the forefront of web development.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="lg:col-span-2 grid grid-cols-1 gap-4"
            variants={iVariants}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-6 text-center hover:border-[var(--accent-violet)]/30 transition-colors duration-300"
              >
                <div className="text-3xl lg:text-4xl font-extrabold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--text-muted)] font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
