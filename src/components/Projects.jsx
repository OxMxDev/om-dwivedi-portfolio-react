import { motion, useReducedMotion } from "framer-motion";
import "remixicon/fonts/remixicon.css";

const PROJECTS = [
  {
    id: 1,
    title: "ShopSphere",
    subtitle: "Full-Stack E-Commerce Platform",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    gradient: "from-violet-600 to-indigo-600",
    icon: "ri-shopping-bag-3-line",
    highlights: [
      "Engineered end-to-end JWT authentication with role-based access, securing 100% of API endpoints against unauthorized access",
      "Built dynamic cart & wishlist with real-time state sync, eliminating stale-state UI bugs across the shopping flow",
      "Integrated Cloudinary CDN for profile image uploads with automatic format optimization and sub-200ms delivery",
    ],
    github: "https://github.com/OxMxDev/ShopSphere",
    featured: true,
  },
  {
    id: 2,
    title: "Real-Time Chat App",
    subtitle: "WebSocket-Powered Communication",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Socket.io", "Tailwind CSS", "DaisyUI", "Zustand", "JWT"],
    gradient: "from-teal-500 to-emerald-500",
    icon: "ri-chat-3-line",
    highlights: [
      "Architected sub-50ms real-time messaging via Socket.io WebSocket channels — 1-on-1 & group chats with typing indicators & read receipts",
      "Zustand-based global state management reduced prop-drilling complexity by 80%, enabling instant UI sync across components",
      "Responsive DaisyUI-themed UI with dynamic profile management and secure JWT cookie authorization",
    ],
    github: "https://github.com/OxMxDev/ChatApp",
  },
  {
    id: 3,
    title: "JobPortal",
    subtitle: "Dual-Persona Recruitment Platform",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS", "Cloudinary"],
    gradient: "from-amber-500 to-orange-500",
    icon: "ri-briefcase-4-line",
    highlights: [
      "Built dual-persona platform (recruiter + student) with role-specific dashboards handling job posting, applications & status workflows",
      "Developed 12+ RESTful API endpoints with JWT/cookie auth and input validation achieving zero-downtime data operations",
      "Dynamic job filtering (role, salary, location) with mobile-first responsive UI tested across 5+ breakpoints",
    ],
    github: "https://github.com/OxMxDev/JobPortal",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function ProjectCard({ project, shouldReduceMotion }) {
  const hoverProps = shouldReduceMotion
    ? {}
    : {
        whileHover: {
          y: -6,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        },
      };

  return (
    <motion.article
      className={`group relative glass rounded-2xl overflow-hidden hover:shadow-[var(--shadow-glow)] transition-shadow duration-500 ${
        project.featured ? "bento-featured" : ""
      }`}
      variants={shouldReduceMotion ? {} : cardVariants}
      {...hoverProps}
    >
      {/* Gradient header */}
      <div
        className={`relative h-40 ${project.featured ? "h-52" : "h-40"} bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
      >
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
          aria-hidden="true"
        />
        <i
          className={`${project.icon} text-7xl ${project.featured ? "text-8xl" : "text-7xl"} text-white/30 group-hover:text-white/50 group-hover:scale-110 transition-all duration-500`}
          aria-hidden="true"
        ></i>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-7">
        <div className="mb-4">
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] font-medium">
            {project.subtitle}
          </p>
        </div>

        {/* Highlights */}
        <ul className="space-y-2.5 mb-5" role="list">
          {project.highlights.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed"
            >
              <i
                className="ri-arrow-right-s-line text-[var(--accent-violet-light)] mt-0.5 flex-shrink-0"
                aria-hidden="true"
              ></i>
              {point}
            </li>
          ))}
        </ul>

        {/* Tech stack tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/5 border border-[var(--border-glass)] text-[var(--text-secondary)] hover:border-[var(--accent-violet)]/40 hover:text-white transition-colors duration-200"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors duration-200"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <i className="ri-github-line text-lg" aria-hidden="true"></i>
            Source Code
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="projects" className="py-24 px-4" aria-label="Featured projects">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-teal)] mb-3 block">
            Recent Work
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Featured{" "}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Production-ready full-stack applications demonstrating end-to-end
            architecture, secure auth, and real-time data flows
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="bento-grid"
          variants={shouldReduceMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
