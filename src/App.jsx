import { useState, useEffect, useCallback } from "react";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

const SECTIONS = ["home", "about", "projects", "skills", "contact"];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Scroll-to-section helper
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  return (
    <LazyMotion features={domAnimation}>
      {/* Skip-to-content link (a11y) */}
      <a href="#home" className="skip-to-content">
        Skip to main content
      </a>

      {/* Preloader — unmounts completely from DOM when done */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      <div
        className="min-h-screen w-full relative"
        style={{
          background: "var(--bg-primary)",
          overflow: isLoading ? "hidden" : undefined,
          height: isLoading ? "100vh" : undefined,
        }}
      >
        {/* Ambient radial glows — soft atmospheric lighting */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-[30%] -left-[15%] w-[600px] h-[600px] rounded-full opacity-[0.08]"
            style={{
              background: "radial-gradient(circle, rgba(45,212,191,0.4), transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div
            className="absolute top-[65%] -right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.06]"
            style={{
              background: "radial-gradient(circle, rgba(45,212,191,0.3), transparent 70%)",
              filter: "blur(100px)",
            }}
          />
        </div>
        <Navbar activeSection={activeSection} onNavigate={scrollToSection} />
        <main>
          <Hero onNavigate={scrollToSection} />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </LazyMotion>
  );
}

export default App;
