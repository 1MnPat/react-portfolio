import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import curioImg from "../assets/project1.png";
import spotifyImg from "../assets/project2.png";
import localAIImg from "../assets/project3.png";

const projects = [
  {
    id: 1,
    title: "Curio",
    image: curioImg,
    description:
      "AI-powered research assistant combining Wikipedia and DuckDuckGo with LangChain for structured results. Implements Pydantic models and supports advanced LLMs (OpenAI GPT-5, Anthropic Claude).",
    role: "Developer",
    github: "https://github.com/1MnPat/Curio",
    tech: ["Python", "LangChain", "LLMs", "Pydantic"],
  },
  {
    id: 2,
    title: "Spotify Clone",
    image: spotifyImg,
    description:
      "Full-stack web application replicating Spotify's core features, including music playback, playlists, and user authentication.",
    role: "Developer",
    github: "https://github.com/1MnPat/Spotify-Clone",
    tech: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: 3,
    title: "Local AI Agent",
    image: localAIImg,
    description:
      "Local AI assistant built with Python, Ollama, LangChain, and ChromaDB for vector search, capable of responding to queries offline.",
    role: "Developer",
    github: "https://github.com/1MnPat/LocalAIAgent",
    tech: ["Python", "Ollama", "LangChain", "ChromaDB"],
  },
];

const Projects = () => (
  <section className="container py-6">
    <div className="projects-header">
      <h1>My Projects</h1>
      <p className="muted">A showcase of my recent work and contributions</p>
    </div>
    <div className="grid grid-3 mt-4">
      {projects.map(({ id, title, image, description, role, github, tech }) => (
        <article key={id} className="card project-card">
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img src={image} alt={title} className="card-img" />
            <div
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                padding: "0.5rem",
                background: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(10px)",
                borderBottomLeftRadius: "12px",
              }}
            >
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "white",
                  fontSize: "1.25rem",
                  display: "inline-block",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.2)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <FiGithub />
              </a>
            </div>
          </div>
          <div className="card-body">
            <h3>{title}</h3>
            <p>{description}</p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              {tech.map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    background: "rgba(99, 102, 241, 0.1)",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    color: "var(--brand-3)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="role">
              <strong>Role:</strong> {role}
            </p>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
              style={{
                marginTop: "1rem",
                width: "100%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <FiGithub /> View on GitHub <FiExternalLink />
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Projects;

