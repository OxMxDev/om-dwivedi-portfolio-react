export default function Footer() {
  return (
    <footer
      className="relative py-10 px-4 text-center"
      role="contentinfo"
    >
      {/* Gradient divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-xl h-px"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden="true"
      />

      <p className="text-sm text-[var(--text-muted)]">
        &copy; {new Date().getFullYear()} Om Dwivedi. Crafted with React, Tailwind CSS &amp; Framer Motion.
      </p>
    </footer>
  );
}
