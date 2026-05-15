import { useState, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";

import hatsImage from "../assets/firefly.png";
import stepsImage from "../assets/jalviks4.png";
import howToImage from "../assets/png.png";
import travelImage from "../assets/ts.png";

gsap.registerPlugin(ScrollTrigger);

export function Page2() {
  const containerRef = useRef(null);
  const middleTextRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(middleTextRef.current, {
        scale: 1,
        opacity: 1,
        willChange: "transform",
        force3D: true,
        transformOrigin: "center center",
      });

      gsap.set(".extraBox", { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".experience-section",
          start: "top top",
          end: "+=1200",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(middleTextRef.current, {
        scale: 12,
        opacity: 0,
        ease: "power1.inOut",
        duration: 1,
      })
        .to(".extraBox", { opacity: 1, duration: 0.3, ease: "power1.inOut" }, 0.1)
        .to(".extraBox", { opacity: 0, duration: 0.3, ease: "power1.inOut" });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ background: "white", color: "black" }}>
      <div
        className="experience-section"
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="extraBox"
          style={{
            position: "absolute",
            inset: 0,
            background: "#f0aec9",
            zIndex: 5,
            pointerEvents: "none",
          }}
        />

        <h1
          ref={middleTextRef}
          style={{
            fontSize: "clamp(1.8rem, 5vw, 6rem)",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            whiteSpace: "normal",
            wordBreak: "break-word",
            zIndex: 2,
            textAlign: "center",
            padding: "0 1.5rem",
            lineHeight: 1.15,
            maxWidth: "100%",
          }}
        >
          PROFESSIONAL EXPERIENCE
        </h1>
      </div>

      <section id="page2">
        <ExperienceSampleSection />
      </section>
    </div>
  );
}

/* ================= EXPERIENCE SAMPLE UI ================= */

const experiencesSample = [
  {
    number: "01",
    period: "December 2024 - June 2025",
    role: "SDE Intern",
    company: "Terrastack",
    description:
      "Enhanced the PCI Dashboard for Ratnagiri Zilla Parishad by building a Flask-based backend integrated with PostgreSQL, enabling automated reporting and interactive data visualizations. Deployed and managed the production stack on AWS EC2 using nginx and gunicorn. Built an on-field Android georeferencing app and maintained geospatial pipelines for cadastral land records.",
    tech: [
      "Python", "Flask", "PostgreSQL", "PostGIS", "FastAPI",
      "Flutter", "AWS", "nginx", "gunicorn", "Firebase",
    ],
  },
  {
    number: "02",
    period: "Jul 2024 - Sep 2024",
    role: "Full Stack Web Developer",
    company: "JalViks",
    description:
      "Developed a web platform connecting farmers and state governments to support irrigation management and climate-driven decision making. Built the full-stack application using React and Express, handling authentication, routing, and user workflows.",
    tech: ["React.js", "Express.js", "MySQL", "Tailwind CSS", "Bootstrap", "Figma", "XAMPP"],
  },
  {
    number: "03",
    period: "May - July 2026",
    role: "IT Intern",
    company: "P&G",
    description:
      "Selected among the top 13 students nationwide to attend P&G's Information Technology Spotlight program, where I worked on AI-driven approaches to improve the efficiency and targeting of consumer promotions across modern trade channels",
    tech: [],
  },
  {
    number: "04",
    period: "Sep 2025 - Nov 2025",
    role: "Founder's Office - AI Intern",
    company: "Firefly",
    description:
      "Built AI-driven automation pipelines using multi-modal LLMs. Designed an end-to-end ML workflow with GroundingDINO, CLIP, and OpenCV, and deployed a Streamlit app backed by PyTorch for large-scale batch processing.",
    tech: ["Python", "Multi-modal LLMs", "Streamlit", "GroundingDINO", "CLIP", "OpenCV"],
  },
];

const ExperienceCardSample = ({ exp, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const gridColumn = index === 0 ? "span 7" : index === 3 ? "span 12" : "span 5";
  const gridRow = index === 0 ? "span 2" : "auto";
  const minHeight = index === 0 ? "420px" : index === 3 ? "200px" : "200px";
  const titleSize = index === 0 ? "clamp(1.6rem, 3vw, 3rem)" : index === 3 ? "clamp(1.4rem, 2.5vw, 3rem)" : "clamp(1.1rem, 1.8vw, 1.5rem)";
  const padding = index === 0 ? "clamp(1.2rem, 2.5vw, 2.5rem)" : "clamp(1rem, 2vw, 1.5rem)";

  return (
    <motion.div
      ref={ref}
      className="experience-bento-card"
      style={{
        position: "relative",
        borderRadius: "1rem",
        backgroundColor: "#f8f9fa",
        border: "1px solid #e9ecef",
        overflow: "hidden",
        padding,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        cursor: "default",
        minHeight,
        gridColumn,
        gridRow,
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      whileHover={{ scale: 1.015 }}
    >
      {/* Ghost number */}
      <span
        style={{
          position: "absolute",
          fontFamily: "sans-serif",
          fontWeight: "bold",
          color: "rgba(0,0,0,0.04)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          fontSize:
            index === 0
              ? "clamp(6rem,12vw,16rem)"
              : index === 1
              ? "clamp(5rem,8vw,10rem)"
              : index === 2
              ? "clamp(5rem,9vw,12rem)"
              : "clamp(6rem,12vw,18rem)",
          bottom: index === 0 ? "1rem" : "auto",
          right:
            index === 0 || index === 1 || index === 2 || index === 3
              ? index === 3
                ? "2rem"
                : "1rem"
              : "auto",
          top:
            index === 1
              ? "0.5rem"
              : index === 2
              ? "0.5rem"
              : index === 3
              ? "50%"
              : "auto",
          left: "auto",
          transform: index === 3 ? "translateY(-50%)" : "none",
        }}
      >
        {exp.number}
      </span>

      <div style={{ position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#f0aec9" }}>
            {exp.number}
          </span>
          <span style={{ width: "2rem", height: "1px", backgroundColor: "#f0aec9" }} />
          <span style={{ fontSize: "0.75rem", color: "#6c757d", letterSpacing: "0.05em" }}>
            {exp.period}
          </span>
        </div>

        <h3 style={{ fontWeight: "bold", lineHeight: 1.1, marginBottom: "0.25rem", fontSize: titleSize }}>
          {exp.role}
        </h3>

        <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.75rem)", color: "#c93673", marginBottom: "0.75rem" }}>
          @ {exp.company}
        </p>

        <p style={{ color: "#6c757d", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "1rem", maxWidth: "28rem" }}>
          {exp.description}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {exp.tech.map((t) => (
            <span
              key={t}
              style={{
                padding: "0.25rem 0.75rem",
                fontSize: "0.625rem",
                borderRadius: "9999px",
                backgroundColor: "#e9ecef",
                color: "#495057",
                border: "1px solid #dee2e6",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSampleSection = () => {
  return (
    <section style={{ padding: "clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 2rem)", background: "white" }}>
      <div style={{ maxWidth: "85vw", margin: "0 auto" }}>
        <div
          className="experience-bento-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "1rem",
          }}
        >
          {experiencesSample.map((exp, i) => (
            <ExperienceCardSample key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .experience-bento-grid {
            grid-template-columns: 1fr !important;
          }
          .experience-bento-card {
            grid-column: span 1 !important;
            grid-row: auto !important;
            min-height: 260px !important;
          }
        }
      `}</style>
    </section>
  );
};