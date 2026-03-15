import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    number: "01",
    period: "2023 — Present",
    role: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    description:
      "Led development of microservices architecture serving 2M+ users. Architected real-time data pipelines and mentored junior developers across 3 teams.",
    tech: ["React", "Node.js", "AWS", "PostgreSQL", "Docker"],
  },
  {
    number: "02",
    period: "2021 — 2023",
    role: "Full Stack Developer",
    company: "StartupLab",
    description:
      "Built and shipped 4 products from zero to production. Implemented CI/CD pipelines reducing deployment time by 80%.",
    tech: ["TypeScript", "Next.js", "Python", "MongoDB", "GraphQL"],
  },
  {
    number: "03",
    period: "2019 — 2021",
    role: "Frontend Developer",
    company: "DigitalWave Agency",
    description:
      "Crafted pixel-perfect interfaces for 20+ client projects. Introduced component-driven design systems adopted across the organization.",
    tech: ["React", "Vue.js", "SCSS", "Figma", "Storybook"],
  },
  {
    number: "04",
    period: "2018 — 2019",
    role: "Junior Developer",
    company: "CodeBase Studios",
    description:
      "Contributed to open-source projects and built internal tools. Developed REST APIs and responsive web applications from scratch.",
    tech: ["JavaScript", "Express", "MySQL", "HTML/CSS"],
  },
];

const cellStyles = [
  "md:col-span-7 md:row-span-2 min-h-[420px]",
  "md:col-span-5 min-h-[200px]",
  "md:col-span-5 min-h-[200px]",
  "md:col-span-12 min-h-[260px]",
];

const numberPositions = [
  "bottom-4 right-6 text-[10rem] md:text-[16rem]",
  "top-2 right-4 text-[8rem] md:text-[10rem]",
  "-bottom-4 -left-2 text-[9rem] md:text-[12rem]",
  "top-1/2 -translate-y-1/2 right-8 text-[10rem] md:text-[18rem]",
];

const ExperienceCard = ({ exp, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const isWide = index === 3;

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl bg-card border border-border overflow-hidden p-6 md:p-10 flex flex-col justify-end group cursor-default ${cellStyles[index]}`}
      initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -1 : 1 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.015, transition: { duration: 0.3 } }}
    >
      <span
        className={`absolute font-display font-bold text-foreground/[0.04] leading-none select-none pointer-events-none transition-all duration-500 group-hover:text-foreground/[0.08] ${numberPositions[index]}`}
      >
        {exp.number}
      </span>

      <motion.div
        className="absolute bubble-gradient rounded-full pointer-events-none"
        style={{
          width: 120 + index * 40,
          height: 120 + index * 40,
          top: index === 0 ? "10%" : index === 3 ? "20%" : "auto",
          bottom: index === 1 || index === 2 ? "10%" : "auto",
          right: index % 2 === 0 ? "-5%" : "auto",
          left: index % 2 !== 0 ? "-5%" : "auto",
          opacity: 0.25,
        }}
        animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 7 + index, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className={`relative z-10 ${isWide ? "max-w-3xl" : ""}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-body tracking-[0.3em] uppercase text-primary">
            {exp.number}
          </span>
          <span className="w-8 h-px bg-primary" />
          <span className="text-xs font-body text-muted-foreground tracking-wider">
            {exp.period}
          </span>
        </div>

        <h3
          className={`font-display font-bold text-foreground leading-[1.1] mb-1 ${
            index === 0
              ? "text-3xl md:text-5xl lg:text-6xl"
              : isWide
              ? "text-3xl md:text-5xl"
              : "text-2xl md:text-3xl lg:text-4xl"
          }`}
        >
          {exp.role}
        </h3>

        <p className="text-base md:text-lg font-display text-primary mb-3">
          @ {exp.company}
        </p>

        <p className="text-muted-foreground font-body text-xs md:text-sm leading-relaxed mb-4 max-w-md">
          {exp.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-[10px] font-body rounded-full bg-secondary text-secondary-foreground border border-border"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:"linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.04) 50%, transparent 60%)",
        }}
      />
    </motion.div>
  );
};

const ExperienceSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold text-foreground">
            Experience
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;