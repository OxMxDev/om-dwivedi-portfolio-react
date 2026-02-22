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
      "bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-teal)] text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]",
    outlined:
      "border-2 border-[var(--border-glass)] text-[var(--text-primary)] hover:border-[var(--accent-violet-light)] hover:text-white bg-transparent",
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
