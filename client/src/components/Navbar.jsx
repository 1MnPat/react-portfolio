import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => setOpen((o) => !o);
  const handleNavigate = () => setOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    handleNavigate();
  };

  return (
    <nav
      className="navbar"
      style={{
        background: scrolled
          ? "rgba(10, 14, 39, 0.95)"
          : "rgba(10, 14, 39, 0.8)",
        boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.3)" : "none",
      }}
    >
      <div className="container nav-container">
        <Link to="/" className="brand" onClick={handleNavigate}>
          <img src={logo} alt="Logo" className="brand-logo" />
          <span className="brand-name">Mohammednaeem Patel</span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={handleToggle}
        >
          <span
            className="bar"
            style={{
              transform: open ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span className="bar" style={{ opacity: open ? "0" : "1" }} />
          <span
            className="bar"
            style={{
              transform: open ? "rotate(-45deg) translate(7px, -6px)" : "none",
            }}
          />
        </button>

        <div className={`nav-links ${open ? "open" : ""}`}>
          <NavLink
            onClick={handleNavigate}
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            onClick={handleNavigate}
            to="/about"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            About
          </NavLink>
          <NavLink
            onClick={handleNavigate}
            to="/projects"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Projects
          </NavLink>
          <NavLink
            onClick={handleNavigate}
            to="/services"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Services
          </NavLink>
          <NavLink
            onClick={handleNavigate}
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Contact
          </NavLink>
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <>
                  <NavLink
                    onClick={handleNavigate}
                    to="/contacts"
                    className={({ isActive }) => (isActive ? "active" : undefined)}
                  >
                    Contacts
                  </NavLink>
                  <NavLink
                    onClick={handleNavigate}
                    to="/projects-list"
                    className={({ isActive }) => (isActive ? "active" : undefined)}
                  >
                    Projects
                  </NavLink>
                  <NavLink
                    onClick={handleNavigate}
                    to="/qualifications"
                    className={({ isActive }) => (isActive ? "active" : undefined)}
                  >
                    Education
                  </NavLink>
                  <div style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginLeft: "0.5rem",
                    paddingLeft: "0.5rem",
                    borderLeft: "1px solid rgba(255, 255, 255, 0.1)"
                  }}>
                    <Link
                      to="/projects/new"
                      onClick={handleNavigate}
                      style={{
                        background: "rgba(99, 102, 241, 0.1)",
                        border: "1px solid rgba(99, 102, 241, 0.3)",
                        color: "var(--brand)",
                        padding: "0.5rem 1rem",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                        whiteSpace: "nowrap"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(99, 102, 241, 0.2)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(99, 102, 241, 0.1)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      + Project
                    </Link>
                    <Link
                      to="/qualifications/new"
                      onClick={handleNavigate}
                      style={{
                        background: "rgba(139, 92, 246, 0.1)",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                        color: "var(--brand-2)",
                        padding: "0.5rem 1rem",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                        whiteSpace: "nowrap"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(139, 92, 246, 0.2)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(139, 92, 246, 0.1)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      + Education
                    </Link>
                  </div>
                </>
              )}
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "1rem",
                marginLeft: "1rem",
                paddingLeft: "1rem",
                borderLeft: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <span style={{ 
                  color: "var(--text-secondary)", 
                  fontSize: "0.9rem" 
                }}>
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    color: "#ef4444",
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink
                onClick={handleNavigate}
                to="/signin"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Sign In
              </NavLink>
              <NavLink
                onClick={handleNavigate}
                to="/signup"
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

