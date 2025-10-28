import React from "react";
import {
  FiCode,
  FiCpu,
  FiDatabase,
  FiGlobe,
  FiLayers,
  FiZap,
} from "react-icons/fi";

// Service card
const ServiceItem = ({ icon: Icon, title, desc }) => (
  <div className="card service">
    <div className="service-icon">
      <Icon size={32} />
    </div>
    <div className="card-body">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  </div>
);

const Services = () => (
  <section className="container py-6">
    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
      <h1>What I Offer</h1>
      <p className="muted" style={{ fontSize: "1.1rem", marginTop: "1rem" }}>
        Comprehensive development services to bring your ideas to life
      </p>
    </div>
    <div className="grid grid-2 mt-4">
      <ServiceItem
        icon={FiCode}
        title="Full-Stack Development"
        desc="Building modern, responsive web applications with React, Node.js, and the MERN stack. From concept to deployment, I create scalable solutions."
      />
      <ServiceItem
        icon={FiCpu}
        title="AI & Automation"
        desc="Creating intelligent AI-powered tools and research assistants using LangChain, LLMs, and Python. Automate workflows and enhance user experiences."
      />
      <ServiceItem
        icon={FiDatabase}
        title="APIs & Databases"
        desc="Designing and integrating robust REST APIs with SQL/NoSQL databases and vector search engines. Ensuring data integrity and performance."
      />
      <ServiceItem
        icon={FiGlobe}
        title="Responsive & Scalable Apps"
        desc="Delivering fast, mobile-friendly, and scalable web solutions optimized for real-world use cases and growing user bases."
      />
      <ServiceItem
        icon={FiLayers}
        title="UI/UX Design"
        desc="Creating intuitive and beautiful user interfaces with modern design principles, focusing on accessibility and user experience."
      />
      <ServiceItem
        icon={FiZap}
        title="Performance Optimization"
        desc="Optimizing applications for speed and efficiency, reducing load times, and improving overall user experience through best practices."
      />
    </div>
  </section>
);

export default Services;
