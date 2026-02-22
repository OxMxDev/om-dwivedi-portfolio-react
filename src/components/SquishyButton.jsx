import { motion, useReducedMotion } from "framer-motion";

export default function SquishyButton({
  children,
  onClick,
  variant = "filled",
  className = "",
  href,
  target,
  rel,
  ariaLabel,
  type = "button",
}) {
  const shouldReduceMotion = useReducedMotion();

  const baseClasses =
    "relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-base cursor-pointer select-none transition-colors duration-200";

  const variantClasses = {
    filled:
      "bg-[var(--accent)] text-[#0a0a0a] font-bold hover:shadow-[0_0_24px_rgba(45,212,191,0.25)]",
    outlined:
      "border border-white/[0.08] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-white bg-transparent",
    ghost:
      "text-[var(--text-secondary)] hover:text-white hover:bg-white/5 bg-transparent",
  };

  const motionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 15 } },
        whileTap: { scale: 0.92, transition: { type: "spring", stiffness: 500, damping: 20 } },
      };

  const combinedClassName = `${baseClasses} ${variantClasses[variant] || variantClasses.filled} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={combinedClassName}
        aria-label={ariaLabel}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={combinedClassName}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
