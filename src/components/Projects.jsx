import { motion, useReducedMotion } from "framer-motion";
import "remixicon/fonts/remixicon.css";

/* ─── Image imports ─── */
import ShopSphereImg from "../assets/ShopSphere.png";
import JobPortalImg from "../assets/JobPortal.png";
// Uncomment when the Chat App screenshot is added:
import ChatAppImg from "../assets/ChatApp.png";

/* ─── Project Data ─── */
const PROJECTS = [
  {
    id: 1,
    title: "ShopSphere",
    subtitle: "Full-Stack E-Commerce Platform",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    brandColor: "124, 58, 237", // violet
    highlights: [
      "End-to-end JWT auth with role-based access — every API endpoint secured",
      "Real-time cart & wishlist sync across sessions with zero stale-state bugs",
      "Cloudinary CDN integration for sub-200ms optimized image delivery",
    ],
    github: "https://github.com/OxMxDev/ShopSphere",
    live: "https://shop-sphere-frontend-sepia.vercel.app",
    layout: "featured",
    image: ShopSphereImg,
  },
  {
    id: 2,
    title: "Real-Time Chat App",
    subtitle: "WebSocket-Powered Messaging",
    tech: ["React.js", "Socket.io", "Zustand", "MongoDB", "DaisyUI", "JWT"],
    brandColor: "20, 184, 166", // teal
    highlights: [
      "Sub-50ms messaging with typing indicators & read receipts via Socket.io",
      "Zustand state management — 80% less prop-drilling, instant UI sync",
      "Secure JWT cookie auth with dynamic profile management",
    ],
    github: "https://github.com/OxMxDev/Real-Time-Chat-Application",
    live: "https://real-time-chat-application-frontend-tawny.vercel.app",
    layout: "half",
    image: ChatAppImg, // Will be replaced with ChatAppImg once provided
    fallbackType: "chat",
  },
  {
    id: 3,
    title: "JobPortal",
    subtitle: "Dual-Persona Recruitment Platform",
    tech: ["React.js", "Node.js", "MongoDB", "Express.js", "Cloudinary"],
    brandColor: "245, 158, 11", // amber
    highlights: [
      "Recruiter + student dashboards with role-specific job/application workflows",
      "12+ RESTful endpoints with input validation & zero-downtime operations",
      "Mobile-first responsive UI with dynamic filtering across 5+ breakpoints",
    ],
    github: "https://github.com/OxMxDev/JobPortal",
    live: "https://job-portal-frontend-z7u1.onrender.com",
    layout: "half",
    image: JobPortalImg,
  },
];

/* ─── CSS Mockup fallback (only for Chat App until screenshot is added) ─── */
function ChatMockup() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-teal-600/20 to-emerald-900/30 p-4 flex gap-3">
      <div className="w-24 sm:w-28 flex-shrink-0 space-y-2">
        <div className="h-2 w-16 rounded-full bg-white/[0.08] mb-3" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white/[0.08] flex-shrink-0" />
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-full rounded-full bg-white/[0.07]" />
              <div className="h-1 w-2/3 rounded-full bg-white/[0.04]" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col justify-end gap-1.5 border-l border-white/[0.04] pl-3">
        <div className="self-start h-5 w-28 rounded-lg rounded-bl-none bg-white/[0.06]" />
        <div className="self-end h-5 w-20 rounded-lg rounded-br-none bg-white/[0.10]" />
        <div className="self-start h-5 w-32 rounded-lg rounded-bl-none bg-white/[0.06]" />
        <div className="self-end h-5 w-24 rounded-lg rounded-br-none bg-white/[0.10]" />
        <div className="h-7 w-full rounded-lg bg-white/[0.05] border border-white/[0.04] mt-2" />
      </div>
    </div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, shouldReduceMotion }) {
  const isFeatured = project.layout === "featured";

  return (
    <motion.article
      className={`group relative rounded-2xl overflow-hidden ${
        isFeatured ? "col-span-1 lg:col-span-2" : "col-span-1"
      }`}
      style={{
        background: "rgba(15, 15, 30, 0.5)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.04)",
      }}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -6,
              transition: { type: "spring", stiffness: 300, damping: 22 },
            }
      }
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(${project.brandColor}, 0.08), transparent 60%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 8px 40px -12px rgba(${project.brandColor}, 0.2)`,
        }}
        aria-hidden="true"
      />

      {/* ─── Image area with browser mockup ─── */}
      <div
        className={`relative ${isFeatured ? "p-5 sm:p-6 lg:p-8" : "p-4 sm:p-5"}`}
        style={{
          background: `rgba(${project.brandColor}, 0.04)`,
        }}
      >
        {/* Browser window frame */}
        <motion.div
          className={`rounded-lg overflow-hidden border border-white/[0.08] ${isFeatured ? "max-w-2xl mx-auto" : ""}`}
          style={{
            boxShadow: "0 4px 24px -6px rgba(0, 0, 0, 0.4), 0 2px 8px -2px rgba(0, 0, 0, 0.3)",
          }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* macOS title bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#1a1a2e] border-b border-white/[0.06]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" aria-hidden="true" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" aria-hidden="true" />
            <span className="ml-2 text-[9px] font-mono text-white/20 truncate">
              {project.title.toLowerCase().replace(/\s+/g, "-")}.vercel.app
            </span>
          </div>

          {/* Screenshot */}
          <div className={`overflow-hidden ${isFeatured ? "h-44 sm:h-56 lg:h-64" : "h-36 sm:h-44"}`}>
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} — ${project.subtitle}`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                width={800}
                height={500}
              />
            ) : (
              <ChatMockup />
            )}
          </div>
        </motion.div>
      </div>

      {/* ─── Content ─── */}
      <div className="relative p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs text-[var(--text-muted)] font-medium mt-0.5">
              {project.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.06] text-[var(--text-muted)] hover:text-white hover:border-white/20 transition-all duration-200"
              aria-label={`Live demo of ${project.title}`}
            >
              <i className="ri-external-link-line text-sm" aria-hidden="true"></i>
              Live Demo
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-white/20 transition-all duration-200"
              aria-label={`View ${project.title} on GitHub`}
            >
              <i className="ri-github-line text-base" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <ul className="space-y-2 mb-5" role="list">
          {project.highlights.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-[13px] sm:text-sm text-[var(--text-secondary)] leading-relaxed"
            >
              <span
                className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: `rgb(${project.brandColor})` }}
                aria-hidden="true"
              />
              {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[var(--text-muted)] hover:text-white/80 hover:border-white/10 transition-colors duration-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Projects Section ─── */
export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="projects" className="py-24 px-4" aria-label="Featured projects">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-14"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[var(--accent-violet)]" aria-hidden="true" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--text-muted)]">
              Selected Work
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Featured{" "}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-base text-[var(--text-muted)] mt-3 max-w-xl">
            Production-grade full-stack systems with secure auth, real-time data
            flows, and scalable architecture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
