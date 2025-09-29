import React from 'react';
import { FiCode, FiCpu, FiDatabase, FiGlobe } from 'react-icons/fi';

// Service card
const ServiceItem = ({ icon: Icon, title, desc }) => (
  <div className="card service">
    <div className="service-icon"><Icon size={28} /></div>
    <div className="card-body">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  </div>
);

const Services = () => (
  <section className="container py-6">
    <h1>Services</h1>
    <div className="grid grid-2 mt-4">
      <ServiceItem 
        icon={FiCode} 
        title="Full-Stack Development" 
        desc="Building modern web applications with React, Node.js, and the MERN stack." 
      />
      <ServiceItem 
        icon={FiCpu} 
        title="AI & Automation" 
        desc="Creating AI-powered tools and research assistants using LangChain, LLMs, and Python." 
      />
      <ServiceItem 
        icon={FiDatabase} 
        title="APIs & Databases" 
        desc="Designing and integrating APIs with SQL/NoSQL databases and vector search engines." 
      />
      <ServiceItem 
        icon={FiGlobe} 
        title="Responsive & Scalable Apps" 
        desc="Delivering fast, mobile-friendly, and scalable solutions for real-world use cases." 
      />
    </div>
  </section>
);

export default Services;
