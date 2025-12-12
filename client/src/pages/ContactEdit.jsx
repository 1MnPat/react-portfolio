import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

const ContactEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchContact();
  }, [id]);

  const fetchContact = async () => {
    try {
      setFetching(true);
      const data = await api.get(`/contacts/${id}`);
      setFormData({
        firstname: data.firstname || "",
        lastname: data.lastname || "",
        email: data.email || "",
      });
    } catch (err) {
      setErrors({
        submit:
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch contact",
      });
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await api.put(`/contacts/${id}`, {
        firstname: formData.firstname.trim(),
        lastname: formData.lastname.trim(),
        email: formData.email.trim(),
      });

      navigate("/contacts");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        error.message ||
        "Failed to update contact. Please try again.";
      setErrors({
        submit: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <section className="container py-6">
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <p className="muted">Loading contact...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-6">
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1>Edit Contact</h1>
          <p className="muted" style={{ marginTop: "0.5rem" }}>
            Update contact information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card">
          <div className="card-body">
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

            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              <button
                type="button"
                onClick={() => navigate("/contacts")}
                style={{
                  background: "transparent",
                  border: "2px solid var(--border)",
                  color: "var(--text)",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  flex: 1,
                }}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="button"
                disabled={loading}
                style={{
                  flex: 1,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Updating..." : "Update Contact"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactEdit;




