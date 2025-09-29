import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

// Navbar with custom logo and responsive links
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((o) => !o);
  const handleNavigate = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="brand" onClick={handleNavigate}>
          <img src={logo} alt="Logo" className="brand-logo" />
          <span className="brand-name">Mohammednaeem Patel</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={handleToggle}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        {/* Nav links */}
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
            About Me
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
            Contact Me
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
