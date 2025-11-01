import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

