import { useTypewriter, Cursor } from 'react-simple-typewriter'
import port from "../assets/port.jpg";

export function Underlay() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        background: "linear-gradient(-180deg, #f5fbff 0%, #e0f0ff 50%, #b8ddfc 100%)",
        backgroundSize: "400% 400%",
        zIndex: -1,
      }}
    />
  );
}

export function Overlay() {
  const [text] = useTypewriter({
    words: [
      "Pre final year UG student",
      "Full stack developer",
      "ML enthusiast",
      "Caffeine Addict",
      "Swimmer",
    ],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1000,
  });

  return (
    <>
      <div
        id="home"
        style={{
          position: "absolute",
          top: "40vh",
          left: "clamp(1.5rem, 10vw, 10vw)",
          right: "clamp(1.5rem, 5vw, 5vw)",
          color: "black",
          zIndex: 10,
          pointerEvents: "none",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(1.8rem, 7vw, 6.5rem)",
            fontWeight: 900,
            lineHeight: 1.05,
            wordBreak: "break-word",
          }}
        >
          MANDAKINI <br />DALWEE
        </h1>
        <h2
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
            marginTop: "1rem",
          }}
        >
          <span>{text}</span>
          <Cursor cursorStyle="|" />
        </h2>
      </div>
    </>
  );
}
