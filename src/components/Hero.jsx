import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import SquishyButton from "./SquishyButton";

/* ─── Kinetic word reveal ─── */
function KineticWord({ word, index, className = "", shouldReduceMotion }) {
  return (
    <motion.span
      className={`inline-block mr-[0.25em] ${className}`}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 60, skewY: 4 }}
      animate={{ opacity: 1, y: 0, skewY: 0 }}
      transition={{
        delay: 0.2 + index * 0.1,
        duration: 0.7,
        type: "spring",
        stiffness: 90,
        damping: 14,
      }}
    >
      {word}
    </motion.span>
  );
}

/* ─── Animated floating code editor ─── */
function CodeWindow({ shouldReduceMotion }) {
  const codeLines = [
    { indent: 0, tokens: [{ text: "const", c: "text-violet-400" }, { text: " server", c: "text-white" }, { text: " = ", c: "text-gray-500" }, { text: "express", c: "text-amber-400" }, { text: "()", c: "text-gray-500" }] },
    { indent: 0, tokens: [{ text: "const", c: "text-violet-400" }, { text: " db", c: "text-white" }, { text: " = ", c: "text-gray-500" }, { text: "mongoose", c: "text-emerald-400" }, { text: ".connect(", c: "text-gray-500" }, { text: "URI", c: "text-teal-300" }, { text: ")", c: "text-gray-500" }] },
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [{ text: "app", c: "text-white" }, { text: ".post(", c: "text-gray-500" }, { text: "'/api/predict'", c: "text-amber-300" }, { text: ", ", c: "text-gray-500" }, { text: "async", c: "text-violet-400" }, { text: " (req, res)", c: "text-white" }, { text: " => {", c: "text-gray-500" }] },
    { indent: 1, tokens: [{ text: "const", c: "text-violet-400" }, { text: " model", c: "text-white" }, { text: " = ", c: "text-gray-500" }, { text: "await", c: "text-violet-400" }, { text: " tf", c: "text-teal-300" }, { text: ".loadModel()", c: "text-gray-500" }] },
    { indent: 1, tokens: [{ text: "const", c: "text-violet-400" }, { text: " result", c: "text-white" }, { text: " = ", c: "text-gray-500" }, { text: "model", c: "text-teal-300" }, { text: ".predict(", c: "text-gray-500" }, { text: "data", c: "text-amber-300" }, { text: ")", c: "text-gray-500" }] },
    { indent: 1, tokens: [{ text: "res", c: "text-white" }, { text: ".json(", c: "text-gray-500" }, { text: "{ prediction: result }", c: "text-emerald-300" }, { text: ")", c: "text-gray-500" }] },
    { indent: 0, tokens: [{ text: "})", c: "text-gray-500" }] },
  ];

  return (
    <motion.div
      className="relative w-full max-w-md"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: 0.8, duration: 1, type: "spring", stiffness: 60 }}
    >
      {/* Floating data viz behind the code window */}
      <DataViz shouldReduceMotion={shouldReduceMotion} />

      {/* Code editor */}
      <div
        className="relative rounded-xl overflow-hidden border border-white/[0.06] bg-[#0d0d1a]/90 backdrop-blur-sm"
        style={{ perspective: "800px" }}
      >
        {/* Editor tab bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <div className="flex gap-0 ml-3">
            <span className="text-[10px] font-mono px-3 py-1 rounded-t bg-white/[0.05] text-[var(--text-secondary)] border-b border-violet-500/50">
              server.js
            </span>
            <span className="text-[10px] font-mono px-3 py-1 text-[var(--text-muted)]">
              model.py
            </span>
          </div>
        </div>

        {/* Code body */}
        <div className="p-4 font-mono text-[11px] sm:text-xs leading-relaxed space-y-0.5">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              className="flex"
              style={{ paddingLeft: `${line.indent * 20}px` }}
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 + i * 0.08, duration: 0.3 }}
            >
              {/* Line number */}
              <span className="text-white/10 w-6 flex-shrink-0 select-none text-right mr-4">
                {line.tokens.length > 0 ? i + 1 : ""}
              </span>
              {/* Tokens */}
              <span>
                {line.tokens.map((token, j) => (
                  <span key={j} className={token.c}>{token.text}</span>
                ))}
                {line.tokens.length === 0 && <span>&nbsp;</span>}
              </span>
            </motion.div>
          ))}
          {/* Blinking cursor */}
          <motion.div
            className="flex"
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <span className="text-white/10 w-6 flex-shrink-0 text-right mr-4 select-none">9</span>
            <span className="w-1.5 h-4 bg-violet-400/80 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Ambient data visualization (floating behind code window) ─── */
function DataViz({ shouldReduceMotion }) {
  const bars = [60, 85, 45, 70, 90, 55, 75, 40, 80, 65];

  return (
    <motion.div
      className="absolute -right-8 -top-8 w-36 h-28 flex items-end gap-1 opacity-[0.15]"
      initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.15, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      aria-hidden="true"
    >
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-sm bg-[var(--accent)]"
          initial={shouldReduceMotion ? { height: `${h}%` } : { height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{
            delay: 1.6 + i * 0.06,
            duration: 0.5,
            type: "spring",
            stiffness: 120,
          }}
        />
      ))}
    </motion.div>
  );
}

const GITHUB_USERNAME = "OxMxDev";

const FALLBACK_STATS = [
  { value: "6+", label: "Public Repos" },
  { value: "10+", label: "Followers" },
  { value: "MERN", label: "Core Stack" },
];

/* ─── Skeleton pulse block ─── */
function StatSkeleton() {
  return (
    <div className="text-center lg:text-left animate-pulse">
      <div className="h-6 w-10 rounded bg-white/[0.06] mb-1.5 mx-auto lg:mx-0" />
      <div className="h-3 w-16 rounded bg-white/[0.04] mx-auto lg:mx-0" />
    </div>
  );
}

/* ─── Dynamic GitHub stats ─── */
function GitHubStats({ shouldReduceMotion }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setStats([
          { value: `${data.public_repos}+`, label: "Public Repos" },
          { value: `${data.followers}+`, label: "Followers" },
          { value: "MERN", label: "Core Stack" },
        ]);
        setLoading(false);
      })
      .catch(() => {
        setStats(FALLBACK_STATS);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <motion.div
      className="flex flex-wrap gap-6 mb-8 justify-center lg:justify-start text-sm font-mono"
      initial={shouldReduceMotion ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      {loading
        ? [1, 2, 3].map((i) => <StatSkeleton key={i} />)
        : stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center lg:text-left"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-white font-bold text-lg">{stat.value}</div>
              <div className="text-[var(--text-muted)] text-xs uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
    </motion.div>
  );
}

/* ─── Hero Section ─── */
export default function Hero({ onNavigate }) {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const codeY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const LINE1 = ["I", "Build"];
  const LINE2 = ["Full-Stack"];
  const LINE3 = ["MERN", "Systems"];
  const ACCENT_LINE = ["&", "AI-Driven", "Intelligence."];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      aria-label="Hero introduction"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Stark horizontal accent line */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-full opacity-[0.06]"
        style={{ background: "linear-gradient(90deg, transparent, white 30%, white 70%, transparent)" }}
        initial={shouldReduceMotion ? {} : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
        aria-hidden="true"
      />

      <motion.div
        className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-12 pt-20"
        style={shouldReduceMotion ? {} : { opacity }}
      >
        {/* ─── Left: Typography ─── */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          style={shouldReduceMotion ? {} : { y: contentY }}
        >
          {/* Overline label */}
          <motion.div
            className="inline-flex items-center gap-2 mb-6 text-xs font-mono uppercase tracking-[0.3em] text-[var(--text-muted)]"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="w-6 h-px bg-[var(--text-muted)]" aria-hidden="true" />
            Full-Stack Developer
            <span className="w-6 h-px bg-[var(--text-muted)]" aria-hidden="true" />
          </motion.div>

          {/* Main headline — massive brutalist type */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-[-0.03em] mb-2">
            {LINE1.map((w, i) => (
              <KineticWord key={w} word={w} index={i} shouldReduceMotion={shouldReduceMotion} />
            ))}
            <br className="hidden sm:block" />
            {LINE2.map((w, i) => (
              <KineticWord
                key={w}
                word={w}
                index={i + LINE1.length}
                className="text-white/90"
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
            <br />
            {LINE3.map((w, i) => (
              <KineticWord
                key={w}
                word={w}
                index={i + LINE1.length + LINE2.length}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </h1>

          {/* Accent line — gradient */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1] tracking-[-0.02em] mb-8">
            {ACCENT_LINE.map((w, i) => (
              <KineticWord
                key={w}
                word={w}
                index={i + LINE1.length + LINE2.length + LINE3.length}
                className="gradient-text"
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </h2>

          {/* Subtext */}
          <motion.p
            className="text-base sm:text-lg text-[var(--text-muted)] mb-8 max-w-lg leading-relaxed font-light lg:text-left text-center"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            Engineering production-grade MERN applications with secure auth,
            real-time data flows, and scalable APIs — then layering in machine
            learning models to extract insights from the data they generate.
          </motion.p>

          {/* Dynamic GitHub stats */}
          <GitHubStats shouldReduceMotion={shouldReduceMotion} />

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <SquishyButton onClick={() => onNavigate("projects")} variant="filled">
              View My Systems
              <i className="ri-arrow-right-line" aria-hidden="true"></i>
            </SquishyButton>
            <SquishyButton onClick={() => onNavigate("contact")} variant="outlined">
              Get in Touch
            </SquishyButton>
          </motion.div>

          {/* Socials — minimal */}
          <motion.div
            className="flex gap-3 justify-center lg:justify-start"
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            {[
              { href: "https://github.com/OxMxDev", icon: "ri-github-fill", label: "GitHub" },
              { href: "https://www.linkedin.com/in/om-dwivedi129/", icon: "ri-linkedin-fill", label: "LinkedIn" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-white/[0.06] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:border-white/20 transition-all duration-200"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                aria-label={social.label}
              >
                <i className={`${social.icon} text-lg`} aria-hidden="true"></i>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* ─── Right: Interactive Code Window ─── */}
        <motion.div
          className="flex-shrink-0 w-full lg:w-auto"
          style={shouldReduceMotion ? {} : { y: codeY }}
        >
          <CodeWindow shouldReduceMotion={shouldReduceMotion} />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]"
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <i className="ri-arrow-down-s-line text-sm"></i>
        </motion.div>
      </motion.div>
    </section>
  );
}
