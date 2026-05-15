import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, SquareTerminal, Github, Linkedin, Code, Bug, Gitlab, Globe, GitPullRequestArrow } from "lucide-react";

const contactKeys = [
  { id: "email",   label: "EM", icon: Mail,               value: "mndalwee@gmail.com",                                           action: "MAIL",     row: 1, col: 1 },
  { id: "github",  label: "GH", icon: Github,             value: "https://github.com/MandyMI35",                                 action: "OPEN",     row: 1, col: 2 },
  { id: "linkedin",label: "LI", icon: Linkedin,           value: "https://www.linkedin.com/in/mandakini-dalwee-bab162293/",     action: "OPEN",     row: 1, col: 3 },
  { id: "twitter", label: "",   icon: Code,               value: "Refactoring: because I was wrong",                            action: "",     row: 2, col: 1 },
  { id: "phone",   label: "",   icon: Bug,                value: "It's a feature, not a bug",                                   action: "",     row: 2, col: 2 },
  { id: "gl",      label: "GL", icon: Gitlab,             value: "https://gitlab.com/Mandakini_525",                            action: "OPEN",     row: 2, col: 3 },
  { id: "website", label: "",   icon: Globe,              value: "Works on my machine",                                         action: "",     row: 3, col: 1 },
  { id: "resume",  label: "",   icon: GitPullRequestArrow,value: "i have no idea why",                                          action: "", row: 3, col: 2 },
  { id: "contact", label: "",   icon: SquareTerminal,     value: "coffee+dark circle = code",                                   action: "",     row: 3, col: 3 },
];

const ContactSection = () => {
  const [activeKey, setActiveKey]     = useState(null);
  const [pressedKey, setPressedKey]   = useState(null);
  const [displayText, setDisplayText] = useState("READY_");

  useEffect(() => {
    if (activeKey) {
      const key = contactKeys.find((k) => k.id === activeKey);
      setDisplayText(`> ${key.label}: ${key.value}`);
    } else {
      setDisplayText("READY_");
    }
  }, [activeKey]);

  const handleKeyPress = (id) => {
    setPressedKey(id);
    setTimeout(() => setPressedKey(null), 150);
    const key = contactKeys.find((k) => k.id === id);
    setDisplayText(`> ${key.action}_ ${key.value}`);
    switch (key.id) {
      case "email":    navigator.clipboard.writeText(key.value); break;
      case "github":   window.open("https://github.com/MandyMI35", "_blank"); break;
      case "linkedin": window.open("https://www.linkedin.com/in/mandakini-dalwee-bab162293/", "_blank"); break;
      case "phone":    navigator.clipboard.writeText(key.value); break;
      case "gl":       window.open("https://gitlab.com/Mandakini_525", "_blank"); break;
      case "resume":   window.open("/resume.pdf", "_blank"); break;
      case "contact":  window.location.href = "mailto:mndalwee@gmail.com"; break;
      default: break;
    }
  };

  return (
    <section
      style={{
        padding: "4rem clamp(1rem, 4vw, 2rem)",
        minHeight: "80vh",
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(34,197,94,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,197,94,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", width: "100%", position: "relative", zIndex: 10 }}>

        {/* CRT + speaker row */}
        <div
          className="crt-speaker-row"
          style={{
            display: "flex",
            gap: "2rem",
            marginBottom: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <CRTScreen displayText={displayText} />
          <SpeakerGrille />
        </div>

        {/* Keyboard section */}
        <div style={{ marginBottom: "2rem" }}>
          {/* Function row */}
          <div
            className="keyboard-row-gap"
            style={{ display: "flex", gap: "0.6rem", marginBottom: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            {["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"].map((key) => (
              <FunctionKey key={key} label={key} />
            ))}
          </div>

          {/* Main keys */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", alignItems: "center" }}>
            {[1, 2, 3].map((row) => (
              <div key={row} className="keyboard-row-gap" style={{ display: "flex", gap: "0.8rem" }}>
                {contactKeys.filter((k) => k.row === row).map((key) => (
                  <KeyboardKey
                    key={key.id}
                    label={key.label}
                    icon={key.icon}
                    isActive={activeKey === key.id}
                    isPressed={pressedKey === key.id}
                    onMouseEnter={() => setActiveKey(key.id)}
                    onMouseLeave={() => setActiveKey(null)}
                    onClick={() => handleKeyPress(key.id)}
                  />
                ))}
              </div>
            ))}

            {/* Spacebar */}
            <div style={{ marginTop: "0.75rem", width: "100%", display: "flex", justifyContent: "center" }}>
              <motion.div
                className="spacebar"
                style={{
                  width: "60%",
                  height: "50px",
                  background: "linear-gradient(145deg, #3a3a3a, #2a2a2a)",
                  borderRadius: "25px",
                  boxShadow: "0 6px 0 #1a1a1a, inset 0 1px 4px rgba(255,255,255,0.1)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#22c55e",
                  fontFamily: "monospace",
                  fontSize: "1.1rem",
                  letterSpacing: "4px",
                  border: "1px solid #4a4a4a",
                }}
                whileHover={{ y: -2, boxShadow: "0 8px 0 #1a1a1a" }}
                whileTap={{ y: 6, boxShadow: "0 2px 0 #1a1a1a" }}
                onClick={() => (window.location.href = "mailto:mndalwee@gmail.com")}
              >
                SPACE
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom panel */}
        <div
          style={{
            padding: "0.75rem 1.5rem",
            background: "rgba(20,20,20,0.8)",
            borderRadius: "50px",
            border: "1px solid #22c55e",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
            {["HOME", "WORKS", "ABOUT", "CONTACT"].map((item) => (
              <motion.span
                key={item}
                style={{
                  color: "#22c55e",
                  fontSize: "0.85rem",
                  fontFamily: "monospace",
                  cursor: "pointer",
                  opacity: 0.7,
                }}
                whileHover={{ opacity: 1, scale: 1.1 }}
              >
                {item}
              </motion.span>
            ))}
          </div>
          <div>
            <motion.span
              style={{
                color: "#22c55e",
                fontSize: "0.85rem",
                fontFamily: "monospace",
                cursor: "pointer",
                opacity: 0.7,
              }}
              whileHover={{ opacity: 1, scale: 1.1 }}
            >
              XOXO &lt;3
            </motion.span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes crt-flicker {
          0%   { opacity: 0.97; }
          10%  { opacity: 1;    }
          20%  { opacity: 0.98; }
          30%  { opacity: 1;    }
          100% { opacity: 0.99; }
        }
        @keyframes pulse-glow {
          0%   { filter: drop-shadow(0 0 2px #22c55e); }
          50%  { filter: drop-shadow(0 0 8px #22c55e); }
          100% { filter: drop-shadow(0 0 2px #22c55e); }
        }

        /* ── Responsive keyboard shrink ── */
        @media (max-width: 640px) {
          .keyboard-key       { width: 76px  !important; height: 68px !important; }
          .keyboard-key-top   { height: 44px !important; }
          .keyboard-key-base  { height: 44px !important; }
          .function-key       { width: 26px  !important; height: 22px !important; }
          .keyboard-row-gap   { gap: 0.45rem !important; }
          .spacebar           { width: 80% !important; }
          .crt-speaker-row    { flex-direction: column !important; align-items: center !important; }
        }

        @media (max-width: 420px) {
          .keyboard-key       { width: 62px  !important; height: 56px !important; }
          .keyboard-key-top   { height: 36px !important; }
          .keyboard-key-base  { height: 36px !important; }
          .keyboard-key-icon  { display: none !important; }
          .function-key       { width: 20px  !important; height: 18px !important; font-size: 7px !important; }
          .keyboard-row-gap   { gap: 0.3rem !important; }
        }
      `}</style>
    </section>
  );
};

/* ── CRT Screen ── */
const CRTScreen = ({ displayText }) => (
  <div style={{ position: "relative", flexShrink: 0 }}>
    <div
      style={{
        width: "clamp(140px, 20vw, 200px)",
        height: "clamp(140px, 20vw, 200px)",
        borderRadius: "50%",
        background: "linear-gradient(145deg, #4a4a4a, #2a2a2a)",
        boxShadow: "4px 4px 16px rgba(0,0,0,0.5), -2px -2px 8px rgba(80,80,80,0.2), inset 0 1px 1px rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "88%",
          height: "88%",
          borderRadius: "50%",
          background: "linear-gradient(145deg, #383838, #222)",
          boxShadow: "inset 2px 2px 8px rgba(0,0,0,0.5), inset -1px -1px 4px rgba(80,80,80,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "92%",
            height: "92%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 45% 40%, #1a3d2a, #0d2818 50%, #061208)",
            boxShadow: "inset 0 0 40px rgba(0,0,0,0.6), 0 0 20px rgba(34,197,94,0.06)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Scanlines */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 1.5px, rgba(34,197,94,0.04) 1.5px, rgba(34,197,94,0.04) 3px)",
              animation: "crt-flicker 4s infinite",
              pointerEvents: "none",
            }}
          />
          {/* Crosshair */}
          <svg viewBox="0 0 100 100" style={{ width: "clamp(64px,10vw,96px)", height: "clamp(64px,10vw,96px)", animation: "pulse-glow 2.5s infinite" }}>
            <line x1="50" y1="5" x2="50" y2="95" stroke="#22c55e" strokeWidth="0.7" opacity="0.45" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="#22c55e" strokeWidth="0.7" opacity="0.45" />
            <rect x="20" y="20" width="60" height="60" stroke="#22c55e" strokeWidth="1" fill="none" opacity="0.6" />
            <rect x="35" y="35" width="30" height="30" stroke="#22c55e" strokeWidth="0.5" fill="none" opacity="0.3" />
          </svg>
          {/* Text */}
          <motion.div
            key={displayText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: "absolute",
              bottom: "18px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "110px",
              textAlign: "center",
              fontFamily: "monospace",
              fontSize: "8px",
              lineHeight: "1.5",
              letterSpacing: "0.5px",
              color: "#22c55e",
              textShadow: "0 0 8px rgba(34,197,94,0.7)",
              wordBreak: "break-all",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {displayText}
          </motion.div>
          {/* Corner screws */}
          {[{ top: "6%", left: "6%" }, { top: "6%", right: "6%" }, { bottom: "6%", left: "6%" }, { bottom: "6%", right: "6%" }].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "linear-gradient(145deg, #555, #333)",
                boxShadow: "inset 1px 1px 2px rgba(255,255,255,0.15), inset -1px -1px 2px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.4)",
                ...pos,
              }}
            >
              <div style={{ position: "absolute", inset: "3px", borderRadius: "50%", background: "conic-gradient(from 30deg, #555, #444, #666, #555)" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ── Speaker Grille ── */
const SpeakerGrille = () => (
  <div
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "10px",
      padding: "0 12px",
      minWidth: "120px",
      maxWidth: "300px",
      width: "100%",
    }}
  >
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        style={{
          width: "100%",
          height: "4px",
          borderRadius: "2px",
          background: "linear-gradient(180deg, #1a1a1a 0%, #111 40%, #1a1a1a 100%)",
          boxShadow: "0 1px 0 rgba(60,60,60,0.3), inset 0 1px 2px rgba(0,0,0,0.8)",
        }}
      />
    ))}
  </div>
);

/* ── Function Key ── */
const FunctionKey = ({ label }) => (
  <motion.div
    className="function-key"
    style={{
      width: "40px",
      height: "30px",
      background: "linear-gradient(145deg, #3a3a3a, #2a2a2a)",
      borderRadius: "8px",
      boxShadow: "0 4px 0 #1a1a1a, inset 0 1px 2px rgba(255,255,255,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      border: "1px solid #4a4a4a",
    }}
    whileHover={{ y: -2 }}
    whileTap={{ y: 4 }}
  >
    <span style={{ color: "#22c55e", fontSize: "10px", fontFamily: "monospace", fontWeight: "bold" }}>{label}</span>
  </motion.div>
);

/* ── Keyboard Key ── */
const KeyboardKey = ({ label, icon: Icon, isActive, isPressed, onMouseEnter, onMouseLeave, onClick }) => {
  const depth = 8;
  return (
    <motion.button
      className="keyboard-key"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        position: "relative",
        width: "120px",
        height: "90px",
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
      whileHover={{ y: 5 }}
      whileTap={{ y: depth }}
      animate={{ y: isPressed ? depth : 0 }}
      transition={{ type: "spring", stiffness: 600, damping: 25 }}
    >
      {/* Base */}
      <div
        className="keyboard-key-base"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: "linear-gradient(145deg, #4a4a4a, #2a2a2a)",
          borderRadius: "12px",
          boxShadow: "0 4px 0 #1a1a1a",
        }}
      />
      {/* Top */}
      <div
        className="keyboard-key-top"
        style={{
          position: "absolute",
          top: 0,
          left: 5,
          right: 5,
          height: "58px",
          background: isActive
            ? "linear-gradient(145deg, #5a5a5a, #3a3a3a)"
            : "linear-gradient(145deg, #3a3a3a, #2a2a2a)",
          borderRadius: "10px",
          boxShadow: `
            inset 0 -2px 4px rgba(0,0,0,0.3),
            inset 0 2px 4px rgba(255,255,255,0.1),
            0 2px 0 #1a1a1a
          `,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          border: "1px solid #4a4a4a",
        }}
      >
        <span className="keyboard-key-icon">
          {Icon && <Icon size={28} color={isActive ? "#22c55e" : "#808080"} />}
        </span>
        <span style={{ color: isActive ? "#22c55e" : "#808080", fontSize: "10px", fontFamily: "monospace", fontWeight: "bold" }}>
          {label}
        </span>
      </div>
      {isActive && (
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 8px #22c55e",
          }}
        />
      )}
    </motion.button>
  );
};

export default ContactSection;
