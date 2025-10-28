import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";

const Contact = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: send to backend / email service
    setSubmitted(true);

    // redirect after a short delay
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <section className="container py-6">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p className="muted" style={{ fontSize: "1.1rem", marginTop: "1rem" }}>
          I'd love to hear about your project. Let's create something amazing
          together!
        </p>
      </div>

      <div className="grid grid-2 mt-4" style={{ alignItems: "start" }}>
        {/* Contact Info */}
        <div className="card" style={{ height: "fit-content" }}>
          <div className="card-body">
            <h3 style={{ marginBottom: "1.5rem" }}>Contact Information</h3>
            <div className="contact-info">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                  padding: "1rem",
                  background: "rgba(99, 102, 241, 0.05)",
                  borderRadius: "12px",
                  border: "1px solid rgba(99, 102, 241, 0.2)",
                }}
              >
                <FiMail size={24} style={{ color: "var(--brand)" }} />
                <div>
                  <p
                    style={{ margin: 0, fontWeight: 600, color: "var(--text)" }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:mpat1071@my.centennialcollege.ca"
                    style={{
                      color: "var(--brand-3)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--brand)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--brand-3)")
                    }
                  >
                    mpat1071@my.centennialcollege.ca
                  </a>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem",
                  background: "rgba(139, 92, 246, 0.05)",
                  borderRadius: "12px",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                }}
              >
                <FiMapPin size={24} style={{ color: "var(--brand-2)" }} />
                <div>
                  <p
                    style={{ margin: 0, fontWeight: 600, color: "var(--text)" }}
                  >
                    Location
                  </p>
                  <p style={{ margin: 0, color: "var(--text-secondary)" }}>
                    Toronto, Canada
                  </p>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--text-secondary)",
                      fontSize: "0.9rem",
                    }}
                  >
                    Available for remote work
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="card contact-form" onSubmit={onSubmit}>
          <div className="card-body">
            <h3 style={{ marginBottom: "1.5rem" }}>Send a Message</h3>
            {!submitted ? (
              <>
                <div className="form-row">
                  <label htmlFor="name">Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="+1 (555) 000-0000 (Optional)"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={onChange}
                    required
                    placeholder="Tell me about your project goals, timeline, and how I can help..."
                  />
                </div>
                <button
                  type="submit"
                  className="button"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <FiSend /> Send Message
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <div
                  style={{
                    fontSize: "4rem",
                    marginBottom: "1rem",
                    animation: "fadeIn 0.5s ease",
                  }}
                >
                  ✅
                </div>
                <p className="success-msg" style={{ fontSize: "1.2rem" }}>
                  Thanks for reaching out!
                </p>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    marginTop: "0.5rem",
                  }}
                >
                  I'll get back to you soon. Redirecting...
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
