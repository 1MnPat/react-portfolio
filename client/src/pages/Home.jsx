import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCode, FiCpu, FiDatabase } from "react-icons/fi";

const Home = () => (
  <section className="hero container">
    <h1>Mohammednaeem Patel</h1>
    <p className="tagline">
      Full-Stack Developer • AI Enthusiast • Problem Solver
    </p>
    <p className="mission">
      I craft elegant web solutions and intelligent systems that solve
      real-world problems. Passionate about building scalable applications,
      leveraging AI technologies, and creating seamless user experiences that
      make a difference.
    </p>
    <p style={{
      marginTop: "1.5rem",
      fontSize: "1.1rem",
      color: "var(--text-secondary)",
      lineHeight: "1.8",
      maxWidth: "800px",
      margin: "1.5rem auto 0"
    }}>
      With a strong foundation in modern web technologies and a passion for continuous learning, 
      I specialize in building full-stack applications using the MERN stack. My expertise extends 
      to implementing robust authentication systems, creating responsive user interfaces, and 
      developing RESTful APIs that power seamless user experiences. I'm always exploring new 
      technologies and best practices to deliver high-quality, maintainable code.
    </p>
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <Link to="/about" className="button">
        Learn More About Me{" "}
        <FiArrowRight style={{ marginLeft: "8px", display: "inline" }} />
      </Link>
      <Link
        to="/projects"
        className="button"
        style={{
          background: "transparent",
          border: "2px solid var(--brand)",
          boxShadow: "none",
        }}
      >
        View My Work
      </Link>
    </div>
    <div
      style={{
        marginTop: "4rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
        width: "100%",
        maxWidth: "800px",
      }}
    >
      <div
        className="fade-in-up"
        style={{
          textAlign: "center",
          padding: "1.5rem",
          background: "rgba(99, 102, 241, 0.05)",
          borderRadius: "16px",
          border: "1px solid rgba(99, 102, 241, 0.2)",
        }}
      >
        <FiCode
          size={32}
          style={{ color: "var(--brand)", marginBottom: "0.5rem" }}
        />
        <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          Full-Stack
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          MERN Stack Development
        </p>
      </div>
      <div
        className="fade-in-up"
        style={{
          textAlign: "center",
          padding: "1.5rem",
          background: "rgba(139, 92, 246, 0.05)",
          borderRadius: "16px",
          border: "1px solid rgba(139, 92, 246, 0.2)",
          animationDelay: "0.1s",
        }}
      >
        <FiCpu
          size={32}
          style={{ color: "var(--brand-2)", marginBottom: "0.5rem" }}
        />
        <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>AI & ML</h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          LangChain & LLMs
        </p>
      </div>
      <div
        className="fade-in-up"
        style={{
          textAlign: "center",
          padding: "1.5rem",
          background: "rgba(6, 182, 212, 0.05)",
          borderRadius: "16px",
          border: "1px solid rgba(6, 182, 212, 0.2)",
          animationDelay: "0.2s",
        }}
      >
        <FiDatabase
          size={32}
          style={{ color: "var(--brand-3)", marginBottom: "0.5rem" }}
        />
        <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Database</h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          SQL & NoSQL
        </p>
      </div>
    </div>
  </section>
);

export default Home;

