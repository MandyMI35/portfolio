import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "page2", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map((item) => document.getElementById(item.id));
      const currentSection = sections.findIndex((section) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });
      if (currentSection !== -1) setActiveSection(navItems[currentSection].id);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? "0.75rem 1.5rem" : "1.5rem 2rem",
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: scrolled ? "blur(30px)" : "blur(10px)",
          transition: "all 0.3s ease",
          boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.05)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "90vw",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo / name - visible on mobile */}
          <motion.span
            style={{
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "#f0aec9",
              letterSpacing: "0.05em",
              cursor: "pointer",
            }}
            onClick={() => scrollToSection("home")}
          >
            MD
          </motion.span>

          {/* Desktop links */}
          <div
            style={{
              display: "flex",
              gap: "3rem",
            }}
            className="nav-desktop-links"
          >
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: activeSection === item.id ? "600" : "400",
                  color: activeSection === item.id ? "#f0aec9" : "#666",
                  padding: "0.5rem 0",
                  position: "relative",
                  transition: "color 0.3s ease",
                }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSectionIndicator"
                    style={{
                      position: "absolute",
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "#f0aec9",
                      borderRadius: "2px",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Hamburger button — mobile only */}
          <motion.button
            className="nav-hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            whileTap={{ scale: 0.9 }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem",
              display: "none", // shown via CSS below
              color: "#555",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "60px",
              left: 0,
              right: 0,
              zIndex: 999,
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              padding: "1rem 2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  fontWeight: activeSection === item.id ? "700" : "400",
                  color: activeSection === item.id ? "#f0aec9" : "#444",
                  textAlign: "left",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS scoped here */}
      <style>{`
        @media (max-width: 640px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
