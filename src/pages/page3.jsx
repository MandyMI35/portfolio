import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Plus, Minus, ExternalLink } from "lucide-react";
import pci from "../assets/projects/pci.png";
import jv from "../assets/projects/jv.png";

const projects = [
  {
    title: "Pavement Condition Index Dashboard",
    description:
      "Developed an Enhanced PCI Dashboard for Ratnagiri Zilla Parishad using Flask and PostgreSQL to automate reporting for 2200+ road inspection journeys with interactive visualizations, deployed on Amazon EC2 with Nginx and Gunicorn for scalable backend performance",
    tech: ["Flask", "PostgreSQL", "Amazon EC2", "Nginx", "Gunicorn", "Python", "ReportLab", "PostGIS"],
    image: pci,
    url: "http://65.2.86.160:3000/",
  },
  {
    title: "Sports Website IITB",
    description: "Engineered full stack platform supporting 15,000+ students",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1570327832470-8bece396bc88?q=80&w=1490&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "https://gymkhana.iitb.ac.in/sports/",
  },
  {
    title: "Unified Spherical Harmonics Library",
    description:
      "Built a differentiable PyTorch library unifying three spherical harmonic formulations (Legendre, Cartesian, solid recurrence) for GPU-accelerated MLIPs. Validated analytic gradients up to ℓ=10 against SciPy and autograd; benchmarked on GTO workloads at float16/32/64.",
    tech: ["PyTorch", "Python", "SciPy", "NumPy"],
    image: "https://images.stockcake.com/public/3/3/6/3364860a-c75f-4e47-86d1-2fbff287da61_large/digital-quantum-waves-stockcake.jpg",
    url: "https://drive.google.com/file/d/1tNGUC2q5aD_BP5yc9XvZfVXLWs9m4wn2/view?usp=sharing",
  },
  {
    title: "Multi-Fidelity Optimization for Kinetics",
    description:
      "Conducted research on multi-fidelity optimization for reaction kinetics by developing an automated NEB workflow and fine-tuning MACE machine-learning potentials to analyze catalytic adsorption processes, while integrating Bayesian active learning to reduce expensive DFT computations in reaction discovery pipelines",
    tech: ["Python", "DFT", "MACE", "NEB", "ASE"],
    image: "https://images.unsplash.com/photo-1771015138249-7dbd8eab0546?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhcmslMjBjaGVtaXN0cnklMjBhZHNvcnB0aW9ufGVufDB8fDB8fHww",
    url: "#",
  },
  {
    title: "Residual Network Architecture",
    description:
      "Conducted an empirical evaluation of Residual Network architectures by implementing ResNet from first principles in NumPy and systematically benchmarking it against VGG, DenseNet, and EfficientNet across MNIST and medical imaging datasets, achieving up to 95% accuracy",
    tech: ["Python", "NumPy", "VGG", "DenseNet", "EfficientNet", "Deep Learning", "Medical Imaging"],
    image: "https://cdn.prod.website-files.com/6409ffaf9710757e4978ca9c/65fc0920ea85400f355f2904_Cover.jpg",
    url: "https://drive.google.com/file/d/1YInqHmBNzFmAsExuSTsQ6J8DeCVl37Ai/view?usp=sharing",
  },
  {
    title: "JalViks Dashboard",
    description:
      "Built a full-stack climate service platform for irrigation coordination between farmers and state governments, implementing a React-based frontend and Node.js–Express backend with MySQL-backed authentication and automated user email notifications.",
    tech: ["Figma", "React.js", "Node.js", "Express.js", "MySQL", "XAMPP", "Tailwind CSS", "Bootstrap"],
    image: jv,
    url: "https://www.jalviks.com/",
  },
];

/* ─── Mobile accordion item ─── */
const MobileAccordionItem = ({ project, index, isOpen, onToggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.4, delay: index * 0.06 }}
    style={{
      borderRadius: "1rem",
      overflow: "hidden",
      border: "1px solid #e9ecef",
      background: "#fff",
      boxShadow: isOpen ? "0 8px 32px rgba(240,174,201,0.18)" : "0 2px 8px rgba(0,0,0,0.06)",
      transition: "box-shadow 0.3s ease",
    }}
  >
    {/* ── Header row (always visible) ── */}
    <button
      onClick={onToggle}
      style={{
        width: "100%",
        background: "none",
        border: "none",
        padding: "1.1rem 1.25rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "0.6rem",
          overflow: "hidden",
          flexShrink: 0,
          background: "#f0f0f0",
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Title + index */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#f0aec9",
            display: "block",
            marginBottom: "0.2rem",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          style={{
            margin: 0,
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "#212529",
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: isOpen ? "normal" : "nowrap",
          }}
        >
          {project.title}
        </h3>
      </div>

      {/* Toggle icon */}
      <motion.div
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          flexShrink: 0,
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: isOpen ? "#f0aec9" : "#f8f9fa",
          border: "1px solid #e9ecef",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Plus size={14} color={isOpen ? "#fff" : "#aaa"} />
      </motion.div>
    </button>

    {/* ── Expandable body ── */}
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="body"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ overflow: "hidden" }}
        >
          {/* Full-width image banner */}
          <div style={{ width: "100%", aspectRatio: "16/8", overflow: "hidden" }}>
            <img
              src={project.image}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div style={{ padding: "1.25rem" }}>
            {/* Description */}
            <p
              style={{
                fontSize: "0.82rem",
                lineHeight: 1.65,
                color: "#555",
                marginBottom: "1rem",
                margin: "0 0 1rem 0",
              }}
            >
              {project.description}
            </p>

            {/* Tech tags */}
            {project.tech.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.1rem" }}>
                {project.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "0.2rem 0.65rem",
                      fontSize: "0.67rem",
                      borderRadius: "9999px",
                      backgroundColor: "#f8f9fa",
                      color: "#495057",
                      border: "1px solid #dee2e6",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Link button */}
            {project.url !== "#" && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  textDecoration: "none",
                  backgroundColor: "#f0aec9",
                  color: "#212529",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  padding: "0.55rem 1.1rem",
                  borderRadius: "9999px",
                }}
              >
                View Project <ExternalLink size={13} />
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

/* ─── Main section ─── */
const ProjectsSection = () => {
  const [active, setActive] = useState(null);           // desktop hover
  const [openIndex, setOpenIndex] = useState(null);     // mobile accordion

  const toggleAccordion = (i) =>
    setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      style={{
        padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 2rem)",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f8f9fa",
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* Background bubble */}
      <motion.div
        style={{
          position: "absolute",
          right: "10%",
          top: "15%",
          width: "20rem",
          height: "20rem",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(240,174,201,0.15) 0%, rgba(240,174,201,0) 70%)",
          pointerEvents: "none",
        }}
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        viewport={{ amount: 0.1 }}
      />

      <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "clamp(2rem, 4vw, 4rem)" }}
        >
          <h2 style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 700, color: "#212529", margin: 0 }}>
            Key Projects
          </h2>
          <div style={{ width: "6rem", height: "0.25rem", background: "#f0aec9", borderRadius: "9999px", marginTop: "1rem" }} />
        </motion.div>

        {/* ─── Desktop fish-eye accordion ─── */}
        <div
          className="projects-desktop-view"
          style={{
            display: "flex",
            gap: "1rem",
            height: "550px",
            width: "100%",
          }}
          onMouseLeave={() => setActive(null)}
        >
          {projects.map((project, i) => {
            const isActive = active === i;
            const hasActive = active !== null;

            return (
              <motion.div
                key={i}
                style={{
                  position: "relative",
                  borderRadius: "1.5rem",
                  overflow: "hidden",
                  cursor: "pointer",
                  height: "100%",
                  flex: isActive ? 3 : hasActive ? 0.8 : 1,
                  transition: "flex 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                onMouseEnter={() => setActive(i)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s ease",
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isActive
                      ? "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)"
                      : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
                  }}
                />

                {(isActive || !hasActive) && (
                  <span
                    style={{
                      position: "absolute",
                      top: "1.5rem",
                      left: "1.5rem",
                      fontSize: "3rem",
                      fontFamily: "monospace",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.15)",
                      userSelect: "none",
                      pointerEvents: "none",
                      zIndex: 5,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}

                <AnimatePresence mode="wait">
                  {!isActive && (
                    <motion.div
                      key="title-only"
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "2rem",
                        zIndex: 10,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3
                        style={{
                          fontFamily: "sans-serif",
                          fontWeight: 600,
                          color: "white",
                          fontSize: hasActive ? "1.25rem" : "1.45rem",
                          margin: 0,
                          writingMode: hasActive ? "vertical-rl" : "horizontal-tb",
                          textOrientation: "mixed",
                          transform: hasActive ? "rotate(180deg)" : "none",
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          maxWidth: hasActive ? "auto" : "90%",
                          lineHeight: 1.3,
                        }}
                      >
                        {project.title}
                      </h3>
                    </motion.div>
                  )}

                  {isActive && (
                    <motion.div
                      key="full-content"
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: "2.5rem",
                        zIndex: 10,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <motion.h3
                        style={{
                          fontSize: "2.5rem",
                          fontFamily: "sans-serif",
                          fontWeight: 700,
                          color: "white",
                          lineHeight: 1.2,
                          marginBottom: "1rem",
                          maxWidth: "90%",
                        }}
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {project.title}
                      </motion.h3>

                      <motion.p
                        style={{
                          color: "rgba(255,255,255,0.8)",
                          fontFamily: "sans-serif",
                          fontSize: "0.95rem",
                          lineHeight: 1.6,
                          marginBottom: "1.5rem",
                          maxWidth: "90%",
                        }}
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                      >
                        {project.description}
                      </motion.p>

                      <motion.div
                        style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            style={{
                              padding: "0.35rem 1rem",
                              fontSize: "0.8rem",
                              fontFamily: "monospace",
                              borderRadius: "9999px",
                              backgroundColor: "rgba(255,255,255,0.15)",
                              color: "white",
                              backdropFilter: "blur(4px)",
                              border: "1px solid rgba(255,255,255,0.2)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </motion.div>

                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          width: "fit-content",
                          textDecoration: "none",
                          backgroundColor: "#f0aec9",
                          padding: "0.75rem 1.5rem",
                          borderRadius: "9999px",
                          color: "#212529",
                          fontWeight: 500,
                          fontSize: "0.9rem",
                          cursor: "pointer",
                        }}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        whileHover={{ x: 4 }}
                      >
                        View Project
                        <ArrowUpRight size={16} />
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Mobile accordion ─── */}
        <div
          className="projects-mobile-view"
          style={{
            display: "none",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {projects.map((project, i) => (
            <MobileAccordionItem
              key={i}
              project={project}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggleAccordion(i)}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-desktop-view { display: none !important; }
          .projects-mobile-view  { display: flex !important; }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
