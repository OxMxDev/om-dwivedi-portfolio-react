import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import "remixicon/fonts/remixicon.css";

/* ─── Image imports ─── */
import ShopSphereImg from "../assets/ShopSphere.png";
import JobPortalImg from "../assets/JobPortal.png";
import ChatAppImg from "../assets/ChatApp.png";

/* ─── Video imports (uncomment & add files when ready) ─── */
import ShopSphereVid from "../assets/ShopSphere.mp4";
import ChatAppVid from "../assets/ChatApp.mp4";
import JobPortalVid from "../assets/JobPortal.mp4";

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
    description:
      "ShopSphere is a production-grade e-commerce platform built from the ground up with React and Node.js. It features a fully functional product catalog with advanced filtering, search, and category navigation. The backend is powered by Express.js with MongoDB for flexible document-based storage, enabling complex queries for product variants, pricing tiers, and inventory management. Security was a top priority — every route is protected with JWT-based authentication and role-based access control, separating admin and customer permissions cleanly.",
    features: [
      "Complete shopping cart with persistent state across sessions — items, quantities, and pricing stay synced even after page refreshes or re-logins",
      "Admin dashboard with full CRUD operations for products, categories, and user management with audit logging",
      "Cloudinary-powered image pipeline that auto-optimizes uploads into multiple responsive sizes for fast delivery",
      "Wishlist system with real-time sync — add or remove items from any device and see changes instantly",
      "Secure checkout flow with address management, order summary, and payment integration-ready architecture",
      "Responsive UI built with Tailwind CSS featuring dark mode support and mobile-first breakpoints",
    ],
    github: "https://github.com/OxMxDev/ShopSphere",
    live: "https://shop-sphere-frontend-sepia.vercel.app",
    layout: "featured",
    image: ShopSphereImg,
    video: ShopSphereVid,
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
    description:
      "A real-time chat application built with React and Socket.io that delivers instant messaging with typing indicators and online presence tracking. The app uses Zustand for lightweight yet powerful state management, eliminating prop-drilling complexity while maintaining reactive UI updates across all connected clients. Authentication is handled through secure HTTP-only JWT cookies, ensuring session persistence without exposing tokens to client-side scripts.",
    features: [
      "Instant bi-directional messaging with sub-50ms latency using WebSocket connections via Socket.io",
      "Live typing indicators and online/offline presence detection across all active conversations",
      "User profile management with avatar uploads and display name customization",
      "Zustand-powered global state — reactive updates propagate instantly to all components without prop chains",
      "Message history with lazy-loaded pagination for efficient rendering of long conversation threads",
      "DaisyUI-themed responsive interface with smooth transitions and mobile-optimized chat layout",
    ],
    github: "https://github.com/OxMxDev/Real-Time-Chat-Application",
    live: "https://real-time-chat-application-frontend-tawny.vercel.app",
    layout: "half",
    image: ChatAppImg,
    video: ChatAppVid,
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
    description:
      "JobPortal is a dual-persona recruitment platform where recruiters post jobs and students discover opportunities — each with their own dedicated dashboard and workflow. Built on a RESTful Express.js backend with MongoDB, it supports complex queries for filtering jobs by location, salary range, experience level, and category. The platform handles the full application lifecycle from job posting through candidate review, with resume uploads powered by Cloudinary's media pipeline.",
    features: [
      "Role-based dual dashboards — recruiters manage postings and review applicants, students browse and track applications",
      "Advanced job search with multi-criteria filtering: location, salary, experience, category, and posting date",
      "Resume upload and management via Cloudinary with automatic format optimization and secure storage",
      "Application tracking system with status updates — applied, shortlisted, interviewed, and hired stages",
      "12+ RESTful API endpoints with comprehensive input validation, error handling, and consistent response format",
      "Mobile-first responsive design with dynamic layouts adapting across 5+ breakpoints for any device",
    ],
    github: "https://github.com/OxMxDev/JobPortal",
    live: "https://job-portal-frontend-z7u1.onrender.com",
    layout: "half",
    image: JobPortalImg,
    video: JobPortalVid,
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

/* ─── Hover Video Overlay ─── */
function HoverVideo({ video, brandColor }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  }, []);

  return (
    <div
      className="project-video-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video layer */}
      <video
        ref={videoRef}
        src={video}
        muted
        loop
        playsInline
        preload="metadata"
        className={`project-video-el ${isPlaying ? "is-playing" : ""}`}
        aria-hidden="true"
      />

      {/* Play indicator */}
      <div className={`project-video-indicator ${isPlaying ? "is-playing" : ""}`}>
        <div
          className="project-video-indicator-dot"
          style={{ background: `rgb(${brandColor})` }}
        />
        <i
          className={`${isPlaying ? "ri-pause-mini-fill" : "ri-play-mini-fill"} text-xs`}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

/* ─── Project Detail Modal ─── */
function ProjectDetailModal({ project, onClose }) {
  /* Close on Escape */
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="project-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <motion.div
        className="project-modal-content"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <i className="ri-close-line text-xl" aria-hidden="true" />
        </button>

        {/* ─── Image area ─── */}
        <div
          className="relative rounded-xl overflow-hidden border border-white/[0.08] mb-6"
          style={{
            boxShadow: `0 4px 32px -8px rgba(${project.brandColor}, 0.2), 0 2px 12px -2px rgba(0, 0, 0, 0.4)`,
          }}
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
          <div className="relative h-56 sm:h-72 lg:h-80 overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} — ${project.subtitle}`}
                className="w-full h-full object-cover object-top"
                width={800}
                height={500}
              />
            ) : (
              <ChatMockup />
            )}
          </div>
        </div>

        {/* ─── Header ─── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p
              className="text-sm font-medium mt-1"
              style={{ color: `rgb(${project.brandColor})` }}
            >
              {project.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg border transition-all duration-200"
              style={{
                background: `rgba(${project.brandColor}, 0.12)`,
                borderColor: `rgba(${project.brandColor}, 0.25)`,
                color: `rgb(${project.brandColor})`,
              }}
            >
              <i className="ri-external-link-line text-base" aria-hidden="true" />
              Live Demo
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-9 h-9 rounded-lg border border-white/[0.08] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-white/20 transition-all duration-200"
              aria-label={`View ${project.title} on GitHub`}
            >
              <i className="ri-github-line text-lg" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* ─── Description ─── */}
        <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] mb-6">
          {project.description}
        </p>

        {/* ─── Key Features ─── */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4 flex items-center gap-2">
            <span
              className="w-5 h-px"
              style={{ background: `rgb(${project.brandColor})` }}
              aria-hidden="true"
            />
            Key Features
          </h4>
          <ul className="space-y-3" role="list">
            {project.features.map((feature, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.35 }}
              >
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: `rgb(${project.brandColor})` }}
                  aria-hidden="true"
                />
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* ─── Tech Stack ─── */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3 flex items-center gap-2">
            <span
              className="w-5 h-px"
              style={{ background: `rgb(${project.brandColor})` }}
              aria-hidden="true"
            />
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors duration-200"
                style={{
                  background: `rgba(${project.brandColor}, 0.06)`,
                  borderColor: `rgba(${project.brandColor}, 0.12)`,
                  color: "var(--text-secondary)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, shouldReduceMotion, onReadMore }) {
  const isFeatured = project.layout === "featured";

  return (
    <motion.article
      className={`group relative rounded-2xl overflow-hidden ${
        isFeatured ? "col-span-1 lg:col-span-2" : "col-span-1"
      }`}
      style={{
        background: "var(--bg-card)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid var(--border-glass)",
      }}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -2,
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
          boxShadow: `inset 0 0 0 1px rgba(${project.brandColor}, 0.2)`,
        }}
        aria-hidden="true"
      />

      {/* ─── Image / Video area with browser mockup ─── */}
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
          whileHover={shouldReduceMotion ? {} : { y: -2 }}
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

          {/* Screenshot + Video overlay */}
          <div className={`relative overflow-hidden ${isFeatured ? "h-56 sm:h-72 lg:h-80" : "h-36 sm:h-44"}`}>
            {/* Static image (always visible as base layer) */}
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

            {/* Video overlay — only rendered when a video source is provided */}
            {project.video && (
              <HoverVideo
                video={project.video}
                brandColor={project.brandColor}
              />
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

        <div className="flex flex-wrap items-center gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[var(--text-muted)] hover:text-white/80 hover:border-white/10 transition-colors duration-200"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Read More button */}
        <button
          className="project-read-more-btn mt-4 w-full"
          style={{ "--brand": project.brandColor }}
          onClick={() => onReadMore(project)}
          aria-label={`Read more about ${project.title}`}
        >
          <span>Read More</span>
          <i className="ri-arrow-right-line text-sm" aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  );
}

/* ─── Projects Section ─── */
export default function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState(null);

  const handleReadMore = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <>
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
                onReadMore={handleReadMore}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Detail Modal ─── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}
