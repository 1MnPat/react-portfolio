import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <section className="hero container">
    <h1>Welcome to My Portfolio</h1>
    <p className="tagline">
      Full-Stack Developer | AI Enthusiast | Problem Solver
    </p>
    <p className="mission">
      My mission is to design and build user-friendly, efficient, and innovative 
      web applications that make technology accessible and impactful.
    </p>
    <Link to="/about" className="button">
      Know About Me
    </Link>
  </section>
);

export default Home;
