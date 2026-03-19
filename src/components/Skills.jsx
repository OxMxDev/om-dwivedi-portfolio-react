import { motion, useReducedMotion } from "framer-motion";
import "remixicon/fonts/remixicon.css";

/* ─── Skills Data ─── */
const ROW_1 = [
  { name: "React", icon: "ri-reactjs-line", color: "#61DAFB" },
  { name: "Next.js", icon: "ri-layout-grid-line", color: "#FFFFFF" },
  { name: "Node.js", icon: "ri-nodejs-line", color: "#68A063" },
  { name: "TypeScript", icon: "ri-code-s-slash-line", color: "#3178C6" },
  { name: "MongoDB", icon: "ri-database-2-line", color: "#4DB33D" },
  { name: "Express", icon: "ri-server-line", color: "#FFFFFF" },
  { name: "Tailwind CSS", icon: "ri-palette-line", color: "#38BDF8" },
];

const ROW_2 = [
  { name: "Prisma", icon: "ri-database-line", color: "#2D3748" },
  { name: "Socket.io", icon: "ri-wifi-line", color: "#25C2A0" },
  { name: "JWT", icon: "ri-shield-keyhole-line", color: "#D63AFF" },
  { name: "Cloudinary", icon: "ri-cloud-line", color: "#3448C5" },
  { name: "Zustand", icon: "ri-bear-smile-line", color: "#FF9F43" },
  { name: "Git", icon: "ri-git-branch-line", color: "#F05032" },
];

/* ─── Single skill chip ─── */
function SkillChip({ skill }) {
  return (
    <div
      className="belt-chip group"
      style={{ "--chip-color": skill.color }}
    >
      <i
        className={`${skill.icon} text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110`}
        style={{ color: skill.color }}
        aria-hidden="true"
      />
      <span className="text-sm sm:text-base font-semibold text-white whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );
}

/* ─── Marquee row — duplicates content for seamless loop ─── */
function MarqueeRow({ skills, direction = "left", speed = 30 }) {
  // Duplicate the items enough times to fill the viewport seamlessly
  const items = [...skills, ...skills, ...skills, ...skills];
  const animClass = direction === "left" ? "belt-scroll-left" : "belt-scroll-right";

  return (
    <div className="belt-track" aria-hidden="true">
      <div
        className={`belt-inner ${animClass}`}
        style={{ "--belt-speed": `${speed}s` }}
      >
        {items.map((skill, i) => (
          <SkillChip key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

/* ─── Skills Section ─── */
export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="py-24 relative overflow-hidden"
      aria-label="Skills and technologies"
    >
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="mb-14"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[var(--accent)]" aria-hidden="true" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[var(--text-muted)]">
              My Toolkit
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
            Skills &{" "}
            <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-base text-[var(--text-muted)] mt-3 max-w-2xl">
            The technologies I use to build performant, scalable, and delightful
            web applications.
          </p>
        </motion.div>
      </div>

      {/* ─── Conveyor belts ─── */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="belt-section"
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Edge fades */}
          <div className="belt-fade-left" aria-hidden="true" />
          <div className="belt-fade-right" aria-hidden="true" />

        {/* Row 1 — scrolls left */}
        <MarqueeRow
          skills={ROW_1}
          direction="left"
          speed={shouldReduceMotion ? 0 : 35}
        />

        {/* Row 2 — scrolls right */}
        <MarqueeRow
          skills={ROW_2}
          direction="right"
          speed={shouldReduceMotion ? 0 : 40}
        />
      </motion.div>
      </div>

      {/* Accessible fallback for screen readers */}
      <div className="sr-only">
        <ul>
          {[...ROW_1, ...ROW_2].map((s) => (
            <li key={s.name}>{s.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
