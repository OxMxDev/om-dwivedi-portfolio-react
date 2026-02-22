import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import "remixicon/fonts/remixicon.css";
import pfp from "../assets/pfp.png";
import SquishyButton from "./SquishyButton";

const HERO_WORDS_LINE1 = ["Full-Stack", "Developer"];
const HERO_WORDS_LINE2 = ["Building", "the", "Future"];

function KineticWord({ word, index, shouldReduceMotion }) {
  return (
    <motion.span
      className="inline-block mr-[0.3em]"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 40, rotateX: -40 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: 0.3 + index * 0.12,
        duration: 0.7,
        type: "spring",
        stiffness: 100,
        damping: 12,
      }}
    >
      {word}
    </motion.span>
  );
}

export default function Hero({ onNavigate }) {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      aria-label="Hero introduction"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--accent-violet) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent-violet) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
        style={{ background: "var(--accent-violet)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
        style={{ background: "var(--accent-teal)" }}
        aria-hidden="true"
      />

      <motion.div
        className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-20"
        style={shouldReduceMotion ? {} : { y: textY, opacity }}
      >
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-6" style={{ perspective: "600px" }}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-3">
              {HERO_WORDS_LINE1.map((word, i) => (
                <KineticWord
                  key={word}
                  word={word}
                  index={i}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </h1>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
              {HERO_WORDS_LINE2.map((word, i) => (
                <KineticWord
                  key={word}
                  word={word}
                  index={i + HERO_WORDS_LINE1.length}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
              <motion.span
                className="gradient-text"
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
              >
                {" "}of Web.
              </motion.span>
            </h2>
          </div>

          <motion.p
            className="text-lg lg:text-xl text-[var(--text-secondary)] mb-8 max-w-2xl leading-relaxed"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            I craft end-to-end web applications—from database architecture to
            pixel-perfect frontends. React, Node.js, MongoDB, APIs—I handle the
            full stack so you don't have to.
          </motion.p>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {[
              { icon: "ri-code-s-slash-line", text: "Frontend" },
              { icon: "ri-server-line", text: "Backend" },
              { icon: "ri-database-2-line", text: "Database" },
              { icon: "ri-git-branch-line", text: "DevOps" },
            ].map((item) => (
              <span
                key={item.text}
                className="flex items-center gap-2 text-sm text-[var(--text-secondary)] glass px-4 py-2 rounded-full"
              >
                <i className={item.icon} aria-hidden="true"></i>
                {item.text}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <SquishyButton onClick={() => onNavigate("contact")} variant="filled">
              <i className="ri-sparkling-line" aria-hidden="true"></i>
              Let's Build Something
            </SquishyButton>
            <SquishyButton onClick={() => onNavigate("projects")} variant="outlined">
              <i className="ri-eye-line" aria-hidden="true"></i>
              View My Work
            </SquishyButton>
          </motion.div>

          {/* Socials */}
          <motion.div
            className="flex gap-3 justify-center lg:justify-start"
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
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
                className="w-11 h-11 rounded-xl glass flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-[var(--accent-violet-light)] transition-colors duration-200"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                aria-label={social.label}
              >
                <i className={`${social.icon} text-xl`} aria-hidden="true"></i>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div
          className="flex-shrink-0"
          style={shouldReduceMotion ? {} : { y: imageY }}
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 80 }}
        >
          <div className="relative">
            {/* Glow ring */}
            <div
              className="absolute -inset-2 rounded-2xl opacity-60 blur-xl"
              style={{ background: "var(--gradient-hero)" }}
              aria-hidden="true"
            />
            <div className="relative gradient-border">
              <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden bg-[var(--bg-secondary)]">
                <img
                  src={pfp}
                  alt="Om Dwivedi — Full-Stack Developer"
                  className="w-full h-full object-cover"
                  width={320}
                  height={320}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]"
        initial={shouldReduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <i className="ri-arrow-down-line text-lg"></i>
        </motion.div>
      </motion.div>
    </section>
  );
}
