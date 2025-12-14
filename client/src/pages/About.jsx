import React from "react";
import headshot from "../assets/headshot.jpeg";

const About = () => (
  <section className="container py-6 about">
    <div className="about-media">
      <img
        src={headshot}
        alt="Headshot of Mohammednaeem Patel"
        className="headshot"
      />
    </div>

    <div className="about-body">
      <h1>About Me</h1>
      <h2 className="muted">Mohammednaeem Patel</h2>
      <h3 className="role">Software Engineering Technology – AI Student</h3>

      <p>
        I am a passionate software engineering student with a strong foundation
        in
        <strong> full-stack web development</strong> and a growing interest in
        <strong> artificial intelligence and machine learning</strong>. My
        experience spans working with modern technologies like
        <strong> React, Node.js, Python, SQL, and cloud platforms</strong>. I
        enjoy building clean, user-friendly interfaces and scalable backend
        systems, always aiming to create solutions that improve everyday
        experiences.
      </p>

      <p>
        Beyond academics, I am focused on practical projects that sharpen my
        technical and problem-solving skills. My goal is to contribute to
        innovative, impactful technology that connects people and drives
        progress.
      </p>

      <p>
        I believe in the power of continuous integration and deployment (CI/CD) 
        to streamline development workflows and ensure code quality. This portfolio 
        application demonstrates modern development practices including automated 
        testing, version control with Git, and deployment pipelines. Through 
        implementing comprehensive unit tests with Jest and React Testing Library, 
        as well as end-to-end tests with Cypress, I ensure that every feature works 
        as expected before deployment.
      </p>

      <a
        className="button"
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginTop: "1rem", display: "inline-block" }}
      >
        View Resume (PDF)
      </a>

      <section className="skills mt-6">
        <h3
          style={{ marginBottom: "2rem", fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
        >
          Skills & Tools
        </h3>

        <div className="skill-category">
          <h4>Programming Languages</h4>
          <ul className="skills-list">
            <li>Python</li>
            <li>JavaScript</li>
            <li>SQL</li>
            <li>Java</li>
            <li>C#</li>
            <li>C</li>
            <li>Linux/Unix</li>
          </ul>
        </div>

        <div className="skill-category">
          <h4>Frontend Development</h4>
          <ul className="skills-list">
            <li>HTML</li>
            <li>CSS</li>
            <li>React.js</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>

        <div className="skill-category">
          <h4>Backend Development</h4>
          <ul className="skills-list">
            <li>Node.js</li>
            <li>Express.js</li>
            <li>MERN Stack</li>
          </ul>
        </div>

        <div className="skill-category">
          <h4>Databases</h4>
          <ul className="skills-list">
            <li>MySQL</li>
            <li>MongoDB</li>
          </ul>
        </div>

        <div className="skill-category">
          <h4>Data Science & AI/ML</h4>
          <ul className="skills-list">
            <li>Pandas</li>
            <li>NumPy</li>
            <li>Matplotlib</li>
            <li>Scikit-learn</li>
            <li>PyTorch</li>
            <li>LangChain</li>
            <li>Apache Spark</li>
          </ul>
        </div>

        <div className="skill-category">
          <h4>Developer Tools & Platforms</h4>
          <ul className="skills-list">
            <li>Git / GitHub</li>
            <li>Visual Studio</li>
            <li>VS Code</li>
            <li>Eclipse</li>
            <li>Postman</li>
            <li>AWS</li>
            <li>Jupyter Notebooks</li>
            <li>Agile Methodologies</li>
          </ul>
        </div>
      </section>
    </div>
  </section>
);

export default About;

