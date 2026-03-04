import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "remixicon/fonts/remixicon.css";

/* ─── Config ─── */
const GITHUB_USERNAME = "OxMxDev";


/* ─── About Cards Data ─── */
const CARDS = [
  {
    id: "engineering",
    label: "The Engineer",
    icon: "ri-terminal-box-line",
    color: "124, 58, 237", // violet
    headline: "I architect systems, not just pages.",
    body: "Full-stack MERN applications with secure JWT auth, RESTful APIs, real-time WebSocket channels, and scalable MongoDB schemas. I write production code in React, Node.js, Express — and solve DSA problems in C++20.",
    tags: ["React", "Node.js", "Express", "MongoDB", "C++20", "REST APIs"],
    span: "lg:col-span-2", // wide card
  },
  {
    id: "datascience",
    label: "The Data Scientist",
    icon: "ri-brain-line",
    color: "20, 184, 166", // teal
    headline: "I extract intelligence from raw data.",
    body: "NVIDIA-certified in Deep Learning. Currently building a Home Energy Resource Optimization Advisor using real-time weather and consumption data, and publishing a UROP journal paper on Heart Sound Classification using CNNs with Log-Mel Spectrograms.",
    tags: ["Python", "TensorFlow", "CNNs", "Pandas", "Deep Learning"],
    span: "lg:col-span-1",
  },
  {
    id: "credentials",
    label: "Credentials",
    icon: "ri-award-line",
    color: "245, 158, 11", // amber
    headline: null,
    body: null,
    credentials: [
      { title: "B.Tech Computer Science", org: "SRM IST, Kattankulathur", year: "2023 – 2027" },
      { title: "Deep Learning Certification", org: "NVIDIA", year: "2025" },
      { title: "Heart Sound Classification (UROP)", org: "Journal Publication", year: "2025" },
    ],
    span: "lg:col-span-1",
  },
  {
    id: "philosophy",
    label: "How I Think",
    icon: "ri-lightbulb-flash-line",
    color: "244, 63, 94", // rose
    headline: "Backend logic meets model inference.",
    body: "I don't just build apps and throw ML at them. I engineer the data pipeline from database to model input, design the API contract that serves predictions, and build the frontend that makes the output actionable. Full loop — one developer.",
    tags: null,
    span: "lg:col-span-1",
  },
];

/* ─── Credential Card Content ─── */
function CredentialContent({ credentials, color }) {
  return (
    <div className="space-y-4">
      {credentials.map((cred, i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="relative mt-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: `rgb(${color})` }}
            />
            {i < credentials.length - 1 && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-3 w-px h-8"
                style={{ background: `rgba(${color}, 0.15)` }}
              />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">
              {cred.title}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              {cred.org} · {cred.year}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── About Card ─── */
function AboutCard({ card, index, shouldReduceMotion }) {
  return (
    <motion.div
      className={`group relative rounded-2xl overflow-hidden ${card.span}`}
      style={{
        background: "var(--bg-card)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid var(--border-glass)",
      }}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={
        shouldReduceMotion
          ? {}
          : { y: -2, transition: { type: "spring", stiffness: 300, damping: 22 } }
      }
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(${card.color}, 0.06), transparent 60%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px rgba(${card.color}, 0.2)`,
        }}
        aria-hidden="true"
      />

      <div className="relative p-5 sm:p-6">
        {/* Label */}
        <div className="flex items-center gap-2 mb-4">
          <i
            className={`${card.icon} text-lg`}
            style={{ color: `rgb(${card.color})` }}
            aria-hidden="true"
          ></i>
          <span
            className="text-xs font-semibold uppercase tracking-[0.15em]"
            style={{ color: `rgb(${card.color})` }}
          >
            {card.label}
          </span>
        </div>

        {/* Credential card — timeline layout */}
        {card.credentials ? (
          <CredentialContent credentials={card.credentials} color={card.color} />
        ) : (
          <>
            {/* Headline */}
            {card.headline && (
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2 leading-snug">
                {card.headline}
              </h3>
            )}

            {/* Body */}
            {card.body && (
              <p className="text-[13px] sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                {card.body}
              </p>
            )}

            {/* Tags */}
            {card.tags && (
              <div className="flex flex-wrap gap-1.5">
                {card.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] sm:text-xs font-medium px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[var(--text-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Contribution Chart Card ─── */
function ContributionCard({ title, icon, color, href, children, index, shouldReduceMotion }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden"
      style={{
        background: "var(--bg-card)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid var(--border-glass)",
      }}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      whileHover={
        shouldReduceMotion
          ? {}
          : { y: -2, transition: { type: "spring", stiffness: 300, damping: 22 } }
      }
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(${color}, 0.06), transparent 60%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px rgba(${color}, 0.2)` }}
        aria-hidden="true"
      />

      <div className="relative p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <i
              className={`${icon} text-lg`}
              style={{ color: `rgb(${color})` }}
              aria-hidden="true"
            />
            <span
              className="text-xs font-semibold uppercase tracking-[0.15em]"
              style={{ color: `rgb(${color})` }}
            >
              {title}
            </span>
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[var(--text-muted)] hover:text-white hover:border-white/20 transition-all duration-200"
          >
            <i className="ri-external-link-line text-xs" aria-hidden="true" />
            Profile
          </a>
        </div>

        {/* Chart area */}
        <div className="contribution-chart-wrapper">
          {!imgLoaded && (
            <div className="contribution-chart-skeleton">
              <div className="contribution-skeleton-shimmer" />
            </div>
          )}
          <div className={`contribution-chart-img ${imgLoaded ? "is-loaded" : ""}`}>
            {children(setImgLoaded)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── About Section ─── */
export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-24 px-4" aria-label="About me">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-14"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[var(--accent-teal)]" aria-hidden="true" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--text-muted)]">
              Who I Am
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Engineer First,{" "}
            <span className="gradient-text">Scientist Always.</span>
          </h2>
          <p className="text-base text-[var(--text-muted)] mt-3 max-w-2xl">
            I don't just write code that works — I build infrastructure that
            scales and layer intelligence on top of it. From database to neural
            network, I own the full pipeline.
          </p>
        </motion.div>

        {/* Bento Grid — 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {CARDS.map((card, i) => (
            <AboutCard
              key={card.id}
              card={card}
              index={i}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* ─── Contribution Charts ─── */}
        <motion.div
          className="mt-6"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ContributionCard
              title="GitHub Activity"
              icon="ri-github-fill"
              color="142, 68, 255"
              href={`https://github.com/${GITHUB_USERNAME}`}
              index={0}
              shouldReduceMotion={shouldReduceMotion}
            >
              {(onLoad) => (
                <img
                  src={`https://ghchart.rshah.org/7c3aed/${GITHUB_USERNAME}`}
                  alt={`${GITHUB_USERNAME}'s GitHub contribution chart`}
                  className="w-full h-auto"
                  onLoad={() => onLoad(true)}
                  loading="lazy"
                />
              )}
            </ContributionCard>
        </motion.div>
      </div>
    </section>
  );
}
