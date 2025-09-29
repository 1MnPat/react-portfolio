import React from "react";
import curioImg from "../assets/project1.png";
import spotifyImg from "../assets/project2.png";
import localAIImg from "../assets/project3.png";

const projects = [
  {
    id: 1,
    title: "Curio",
    image: curioImg,
    description: "AI-powered research assistant combining Wikipedia and DuckDuckGo with LangChain for structured results. Implements Pydantic models and supports advanced LLMs (OpenAI GPT-5, Anthropic Claude).",
    role: "Developer",
    github: "https://github.com/1MnPat/Curio"
  },
  {
    id: 2,
    title: "Spotify Clone",
    image: spotifyImg,
    description: "Full-stack web application replicating Spotify's core features, including music playback, playlists, and user authentication.",
    role: "Developer",
    github: "https://github.com/1MnPat/Spotify-Clone"
  },
  {
    id: 3,
    title: "Local AI Agent",
    image: localAIImg,
    description: "Local AI assistant built with Python, Ollama, LangChain, and ChromaDB for vector search, capable of responding to queries offline.",
    role: "Developer",
    github: "https://github.com/1MnPat/LocalAIAgent"
  }
];

const Projects = () => (
  <section className="container py-6">
    <h1>Projects</h1>
    <div className="grid grid-3 mt-4">
      {projects.map(({ id, title, image, description, role, github }) => (
        <article key={id} className="card">
          <img src={image} alt={title} className="card-img" />
          <div className="card-body">
            <h3>{title}</h3>
            <p>{description}</p>
            <p><strong>Role:</strong> {role}</p>
            <a href={github} target="_blank" rel="noopener noreferrer" className="button" style={{ marginTop: "0.5rem" }}>
              GitHub Repo
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Projects;