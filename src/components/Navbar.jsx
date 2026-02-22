import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import "remixicon/fonts/remixicon.css";
import SquishyButton from "./SquishyButton";

const NAV_ITEMS = ["home", "about", "projects", "skills", "contact"];

export default function Navbar({ activeSection, onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleNav = (sectionId) => {
    setIsMenuOpen(false);
    // Delay scroll so the menu's exit animation doesn't interrupt scrollIntoView
    setTimeout(() => onNavigate(sectionId), 300);
  };

  return (
    <nav
      className="fixed top-0 w-full z-50 glass"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="text-xl font-bold gradient-text tracking-tight"
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Om.dev
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item}
                onClick={() => handleNav(item)}
                className={`relative capitalize px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeSection === item
                    ? "text-white"
                    : "text-[var(--text-secondary)] hover:text-white"
                }`}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                aria-current={activeSection === item ? "page" : undefined}
              >
                {activeSection === item && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-white/10 border border-white/10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item}</span>
              </motion.button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <SquishyButton
              onClick={() => handleNav("contact")}
              variant="filled"
              className="!px-5 !py-2.5 !text-sm"
            >
              <i className="ri-mail-line" aria-hidden="true"></i>
              Let's Talk
            </SquishyButton>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden text-[var(--text-secondary)] p-2 rounded-lg hover:bg-white/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <i
              className={`text-2xl ${isMenuOpen ? "ri-close-line" : "ri-menu-3-line"}`}
              aria-hidden="true"
            ></i>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden border-t border-[var(--border-glass)] py-4 space-y-1"
              initial={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item}
                  onClick={() => handleNav(item)}
                  className={`block w-full text-left px-4 py-3 rounded-lg capitalize font-medium transition-colors duration-200 ${
                    activeSection === item
                      ? "text-white bg-white/5"
                      : "text-[var(--text-secondary)] hover:text-white hover:bg-white/5"
                  }`}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
