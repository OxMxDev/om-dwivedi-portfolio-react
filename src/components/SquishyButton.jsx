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
    "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-[15px] cursor-pointer select-none transition-colors duration-200";

  const variantClasses = {
    filled:
      "bg-[var(--text-primary)] text-[#0a0a0a] hover:bg-white",
    outlined:
      "border border-white/[0.15] text-[var(--text-primary)] hover:border-white/30 hover:bg-white/[0.02] bg-transparent",
    ghost:
      "text-[var(--text-secondary)] hover:text-white hover:bg-white/5 bg-transparent",
  };

  const motionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { y: -1, transition: { type: "spring", stiffness: 400, damping: 15 } },
        whileTap: { scale: 0.98, transition: { type: "spring", stiffness: 500, damping: 20 } },
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
