import { motion, useReducedMotion } from "framer-motion";
import "remixicon/fonts/remixicon.css";

const SKILLS = [
  {
    name: "React",
    icon: "ri-reactjs-line",
    color: "#61DAFB",
    desc: "Component-driven UIs",
  },
  {
    name: "Node.js",
    icon: "ri-nodejs-line",
    color: "#68A063",
    desc: "Server-side runtime",
  },
  {
    name: "MongoDB",
    icon: "ri-database-2-line",
    color: "#4DB33D",
    desc: "NoSQL database",
  },
  {
    name: "Express",
    icon: "ri-server-line",
    color: "#FFFFFF",
    desc: "Backend framework",
  },
  {
    name: "Tailwind CSS",
    icon: "ri-palette-line",
    color: "#38BDF8",
    desc: "Utility-first CSS",
  },
  {
    name: "Socket.io",
    icon: "ri-wifi-line",
    color: "#25C2A0",
    desc: "Real-time WebSockets",
  },
  {
    name: "JWT",
    icon: "ri-shield-keyhole-line",
    color: "#D63AFF",
    desc: "Token-based auth",
  },
  {
    name: "Cloudinary",
    icon: "ri-cloud-line",
    color: "#3448C5",
    desc: "Image CDN & uploads",
  },
  {
    name: "Zustand",
    icon: "ri-bear-smile-line",
    color: "#FF9F43",
    desc: "Lightweight state mgmt",
  },
  {
    name: "Git",
    icon: "ri-git-branch-line",
    color: "#F05032",
    desc: "Version control",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const skillVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="py-24 px-4 relative"
      aria-label="Skills and technologies"
    >


      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)] mb-3 block">
            My Toolkit
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Skills &{" "}
            <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            The technologies I use to build performant, scalable, and delightful
            web applications
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          variants={shouldReduceMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {SKILLS.map((skill) => (
            <motion.div
              key={skill.name}
              className="group glass rounded-2xl p-5 text-center cursor-default transition-all duration-300 hover:border-white/15"
              variants={shouldReduceMotion ? {} : skillVariants}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : {
                      y: -4,
                      transition: { type: "spring", stiffness: 300, damping: 20 },
                    }
              }
              style={{
                "--skill-color": skill.color,
              }}
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${skill.color}10, transparent 70%)`,
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <i
                  className={`${skill.icon} text-4xl lg:text-5xl mb-3 block transition-all duration-300 group-hover:scale-110`}
                  style={{ color: skill.color }}
                  aria-hidden="true"
                ></i>
                <h3 className="text-sm lg:text-base font-semibold text-white mb-0.5">
                  {skill.name}
                </h3>
                <p className="text-xs text-[var(--text-muted)] hidden sm:block">
                  {skill.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
