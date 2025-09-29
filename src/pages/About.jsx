import React from 'react';
import headshot from '../assets/headshot.jpeg';

const About = () => (
  <section className="container py-6 about">
    {/* Left: Headshot */}
    <div className="about-media">
      <img 
        src={headshot} 
        alt="Headshot of Mohammednaeem Patel" 
        className="headshot" 
      />
    </div>

    {/* Right: Bio */}
    <div className="about-body">
      <h1>About Me</h1>
      <h2 className="muted">Mohammednaeem Patel</h2>
      <h3 className="role">Software Engineering Technology – AI Student</h3>

      <p>
        I am a passionate software engineering student with a strong foundation in 
        <strong> full-stack web development</strong> and a growing interest in 
        <strong> artificial intelligence and machine learning</strong>. 
        My experience spans working with modern technologies like 
        <strong> React, Node.js, Python, SQL, and cloud platforms</strong>. 
        I enjoy building clean, user-friendly interfaces and scalable backend systems, 
        always aiming to create solutions that improve everyday experiences.
      </p>

      <p>
        Beyond academics, I am focused on practical projects that sharpen my technical 
        and problem-solving skills. My goal is to contribute to innovative, impactful 
        technology that connects people and drives progress.
      </p>

      {/* Resume Button */}
      <a 
        className="button" 
        href="/resume.pdf" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        View Resume (PDF)
      </a>

      {/* Skills Section */}
      <section className="skills mt-6">
    <h3>Skills & Tools</h3>

    {/* Programming Languages */}
    <div className="skill-category">
      <h4>Programming Languages</h4>
      <ul className="skills-list">
        <li>🐍 Python</li>
        <li>📜 JavaScript</li>
        <li>🗄️ SQL</li>
        <li>☕ Java</li>
        <li>💻 C#</li>
        <li>🔧 C</li>
        <li>🐧 Linux/Unix</li>
      </ul>
    </div>

    {/* Frontend */}
    <div className="skill-category">
      <h4>Frontend Development</h4>
      <ul className="skills-list">
        <li>🌐 HTML</li>
        <li>🎨 CSS</li>
        <li>⚛️ React.js</li>
        <li>💠 Tailwind CSS</li>
      </ul>
    </div>

    {/* Backend */}
    <div className="skill-category">
      <h4>Backend Development</h4>
      <ul className="skills-list">
        <li>🟢 Node.js</li>
        <li>🚏 Express.js</li>
        <li>🛠️ MERN Stack</li>
      </ul>
    </div>

    {/* Databases */}
    <div className="skill-category">
      <h4>Databases</h4>
      <ul className="skills-list">
        <li>🛢️ MySQL</li>
        <li>🍃 MongoDB</li>
      </ul>
    </div>

    {/* Data Science & AI/ML */}
    <div className="skill-category">
      <h4>Data Science & AI/ML</h4>
      <ul className="skills-list">
        <li>📊 Pandas</li>
        <li>🔢 NumPy</li>
        <li>📈 Matplotlib</li>
        <li>🤖 Scikit-learn</li>
        <li>🔥 PyTorch</li>
        <li>🧠 LangChain</li>
        <li>⚡ Apache Spark</li>
      </ul>
    </div>

    {/* Tools & Platforms */}
    <div className="skill-category">
      <h4>Developer Tools & Platforms</h4>
      <ul className="skills-list">
        <li>🔗 Git / GitHub</li>
        <li>🖥️ Visual Studio</li>
        <li>💻 VS Code</li>
        <li>📦 Eclipse</li>
        <li>📮 Postman</li>
        <li>☁️ AWS</li>
        <li>📓 Jupyter Notebooks</li>
        <li>📌 Agile Methodologies</li>
      </ul>
    </div>
  </section>
    </div>
  </section>
);

export default About;
