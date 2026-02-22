import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const BOOT_LINES = [
  { text: "> Initializing system...", delay: 0 },
  { text: "> Connecting to MongoDB cluster... ✓", delay: 250 },
  { text: "> Starting Node.js server on port 3000... ✓", delay: 500 },
  { text: "> Authenticating JWT tokens... ✓", delay: 750 },
  { text: "> Compiling React components... ✓", delay: 1000 },
  { text: "> Loading Tailwind CSS modules... ✓", delay: 1200 },
  { text: "> Establishing Socket.io connection... ✓", delay: 1400 },
  { text: "> All systems operational.", delay: 1600 },
];

const READY_DELAY = 1850; // When "SYSTEM READY" appears
const EXIT_DELAY = 2400; // When preloader starts dissolving

function TerminalLine({ text, delay, shouldReduceMotion }) {
  const [visible, setVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);
      if (shouldReduceMotion) {
        setDisplayText(text);
        return;
      }
      // Rapid typing effect — type entire line in ~80ms
      let i = 0;
      const typeInterval = setInterval(() => {
        i++;
        setDisplayText(text.slice(0, i));
        if (i >= text.length) clearInterval(typeInterval);
      }, 12);
      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(showTimer);
  }, [text, delay, shouldReduceMotion]);

  if (!visible) return null;

  const isSuccess = text.includes("✓");
  const isCommand = text.startsWith(">");

  return (
    <div className="flex items-start gap-0 leading-relaxed">
      <span
        className={`font-mono text-xs sm:text-sm ${
          isSuccess
            ? "text-emerald-400"
            : isCommand
              ? "text-[var(--text-secondary)]"
              : "text-[var(--text-muted)]"
        }`}
      >
        {displayText}
        {displayText.length < text.length && (
          <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
        )}
      </span>
    </div>
  );
}

export default function Preloader({ onComplete }) {
  const [showReady, setShowReady] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const readyTimer = setTimeout(() => setShowReady(true), READY_DELAY);
    const exitTimer = setTimeout(() => onComplete(), EXIT_DELAY);
    return () => {
      clearTimeout(readyTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ background: "var(--bg-primary)" }}
      initial={{ opacity: 1 }}
      exit={
        shouldReduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              scale: 1.05,
              filter: "blur(10px)",
              transition: { duration: 0.5, ease: "easeInOut" },
            }
      }
      aria-live="polite"
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Terminal window */}
      <div className="relative w-full max-w-lg">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 rounded-t-xl bg-white/[0.04] border border-b-0 border-[var(--border-glass)]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" aria-hidden="true" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" aria-hidden="true" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" aria-hidden="true" />
          <span className="ml-3 text-xs text-[var(--text-muted)] font-mono">
            om@portfolio ~ %
          </span>
        </div>

        {/* Terminal body */}
        <div className="glass rounded-b-xl p-5 sm:p-6 space-y-1.5 min-h-[260px] border-t-0">
          {BOOT_LINES.map((line, i) => (
            <TerminalLine
              key={i}
              text={line.text}
              delay={line.delay}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}

          {/* System Ready banner */}
          <AnimatePresence>
            {showReady && (
              <motion.div
                className="mt-4 pt-3 border-t border-[var(--border-glass)]"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  <span className="font-mono text-sm sm:text-base font-bold text-emerald-400 tracking-widest uppercase">
                    System Ready
                  </span>
                </div>
                <p className="font-mono text-xs text-[var(--text-muted)] mt-1">
                  Portfolio loaded successfully. Welcome.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
