import { useState, useEffect, useCallback } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const SECTIONS = ["home", "about", "projects", "skills", "contact"];

function App() {
  const [activeSection, setActiveSection] = useState("home");

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
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      {/* Skip-to-content link (a11y) */}
      <a href="#home" className="skip-to-content">
        Skip to main content
      </a>

      <div className="min-h-screen w-full" style={{ background: "var(--bg-primary)" }}>
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
