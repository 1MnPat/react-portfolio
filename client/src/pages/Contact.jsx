import React, { useState } from "react";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";
import api from "../utils/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await api.post("/contacts", {
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
        email: formData.email.trim(),
      });

      setSubmitted(true);
      resetForm();

      // Reset success state after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        error.message ||
        "Failed to send message. Please try again.";
      setErrors({
        submit: errorMessage,
      });
    } finally {
      setLoading(false);
    }
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

        <form className="card contact-form" onSubmit={handleSubmit}>
          <div className="card-body">
            <h3 style={{ marginBottom: "1.5rem" }}>Send a Message</h3>

            {errors.submit && (
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#ef4444",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  marginBottom: "1.5rem",
                  fontSize: "0.9rem",
                }}
              >
                {errors.submit}
              </div>
            )}

            {submitted && (
              <div
                style={{
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  color: "#10b981",
                  padding: "0.75rem 1rem",
                  borderRadius: "8px",
                  marginBottom: "1.5rem",
                  fontSize: "0.9rem",
                }}
              >
                Thanks for reaching out! I'll get back to you soon.
              </div>
            )}

            {!submitted ? (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div className="form-row">
                    <label htmlFor="firstname">
                      First Name <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      value={formData.firstname}
                      onChange={handleChange}
                      required
                      placeholder="John"
                      disabled={loading}
                    />
                    {errors.firstname && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.85rem",
                          marginTop: "0.25rem",
                        }}
                      >
                        {errors.firstname}
                      </span>
                    )}
                  </div>

                  <div className="form-row">
                    <label htmlFor="lastname">
                      Last Name <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      value={formData.lastname}
                      onChange={handleChange}
                      required
                      placeholder="Doe"
                      disabled={loading}
                    />
                    {errors.lastname && (
                      <span
                        style={{
                          color: "#ef4444",
                          fontSize: "0.85rem",
                          marginTop: "0.25rem",
                        }}
                      >
                        {errors.lastname}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <label htmlFor="email">
                    Email <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    disabled={loading}
                  />
                  {errors.email && (
                    <span
                      style={{
                        color: "#ef4444",
                        fontSize: "0.85rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {errors.email}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="button"
                  disabled={loading}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    marginTop: "1rem",
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  <FiSend /> {loading ? "Sending..." : "Send Message"}
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
                  I'll get back to you soon.
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
