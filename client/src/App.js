import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
// CRUD components
import ContactsList from './pages/ContactsList';
import ContactForm from './pages/ContactForm';
import ContactEdit from './pages/ContactEdit';
import ProjectsList from './pages/ProjectsList';
import ProjectFormNew from './pages/ProjectFormNew';
import ProjectEdit from './pages/ProjectEdit';
import QualificationsList from './pages/QualificationsList';
import QualificationFormNew from './pages/QualificationFormNew';
import QualificationEdit from './pages/QualificationEdit';
import ProtectedRoute from './components/ProtectedRoute';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

function App() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="app-root">
            <Navbar />
            <main className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    {/* Authentication Routes */}
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    {/* Contacts CRUD Routes */}
                    <Route path="/contacts" element={<ContactsList />} />
                    <Route path="/contacts/new" element={<ProtectedRoute adminOnly={true}><ContactForm /></ProtectedRoute>} />
                    <Route path="/contacts/edit/:id" element={<ProtectedRoute adminOnly={true}><ContactEdit /></ProtectedRoute>} />
                    {/* Projects CRUD Routes */}
                    <Route path="/projects-list" element={<ProjectsList />} />
                    <Route path="/projects/new" element={<ProtectedRoute adminOnly={true}><ProjectFormNew /></ProtectedRoute>} />
                    <Route path="/projects/edit/:id" element={<ProtectedRoute adminOnly={true}><ProjectEdit /></ProtectedRoute>} />
                    {/* Qualifications CRUD Routes */}
                    <Route path="/qualifications" element={<QualificationsList />} />
                    <Route path="/qualifications/new" element={<ProtectedRoute adminOnly={true}><QualificationFormNew /></ProtectedRoute>} />
                    <Route path="/qualifications/edit/:id" element={<ProtectedRoute adminOnly={true}><QualificationEdit /></ProtectedRoute>} />
                </Routes>
            </main>
            <footer className="footer">
                <div className="container">
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1.5rem"
                    }}>
                        <div style={{
                            display: "flex",
                            gap: "1.5rem",
                            alignItems: "center"
                        }}>
                            <a
                                href="https://github.com/1MnPat"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: "var(--text-secondary)",
                                    fontSize: "1.5rem",
                                    transition: "all 0.3s ease",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    background: "rgba(99, 102, 241, 0.1)",
                                    border: "1px solid rgba(99, 102, 241, 0.2)"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "var(--brand)";
                                    e.currentTarget.style.background = "rgba(99, 102, 241, 0.2)";
                                    e.currentTarget.style.transform = "translateY(-3px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "var(--text-secondary)";
                                    e.currentTarget.style.background = "rgba(99, 102, 241, 0.1)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                                aria-label="GitHub"
                            >
                                <FiGithub />
                            </a>
                            <a
                                href="https://linkedin.com/in/mohammednaeem-patel"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: "var(--text-secondary)",
                                    fontSize: "1.5rem",
                                    transition: "all 0.3s ease",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    background: "rgba(139, 92, 246, 0.1)",
                                    border: "1px solid rgba(139, 92, 246, 0.2)"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "var(--brand-2)";
                                    e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)";
                                    e.currentTarget.style.transform = "translateY(-3px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "var(--text-secondary)";
                                    e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                                aria-label="LinkedIn"
                            >
                                <FiLinkedin />
                            </a>
                            <a
                                href="mailto:mpat1071@my.centennialcollege.ca"
                                style={{
                                    color: "var(--text-secondary)",
                                    fontSize: "1.5rem",
                                    transition: "all 0.3s ease",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    background: "rgba(6, 182, 212, 0.1)",
                                    border: "1px solid rgba(6, 182, 212, 0.2)"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = "var(--brand-3)";
                                    e.currentTarget.style.background = "rgba(6, 182, 212, 0.2)";
                                    e.currentTarget.style.transform = "translateY(-3px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = "var(--text-secondary)";
                                    e.currentTarget.style.background = "rgba(6, 182, 212, 0.1)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                                aria-label="Email"
                            >
                                <FiMail />
                            </a>
                        </div>
                        <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.9rem" }}>
                            &copy; {currentYear} Mohammednaeem Patel • All Rights Reserved
                        </p>
                        <p style={{ margin: 0, color: "var(--muted)", fontSize: "0.85rem" }}>
                            Built with React & ❤️
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;



