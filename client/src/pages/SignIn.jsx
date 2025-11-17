import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../utils/api";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      const response = await authAPI.login(
        formData.email.trim(),
        formData.password
      );

      // Store token and user via context
      if (response.token && response.user) {
        login(response.user, response.token);
      }

      setSubmitted(true);
      setFormData({
        email: "",
        password: "",
      });

      // Redirect after successful login
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        error.message ||
        "Login failed. Please check your credentials.";
      setErrors({
        submit: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="container py-6">
        <div
          style={{ maxWidth: "450px", margin: "0 auto", textAlign: "center" }}
        >
          <div className="card">
            <div className="card-body">
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
              <p className="success-msg" style={{ fontSize: "1.2rem" }}>
                Signed in successfully!
              </p>
              <p
                style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}
              >
                Redirecting to dashboard...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-6">
      <div style={{ maxWidth: "450px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1>Sign In</h1>
          <p className="muted" style={{ marginTop: "0.5rem" }}>
            Welcome back! Please sign in to your account.
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

            <div className="form-row">
              <label htmlFor="password">
                Password <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                disabled={loading}
              />
              {errors.password && (
                <span
                  style={{
                    color: "#ef4444",
                    fontSize: "0.85rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {errors.password}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="button"
              disabled={loading}
              style={{
                width: "100%",
                marginTop: "1rem",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div
              style={{
                textAlign: "center",
                marginTop: "1.5rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border)",
              }}
            >
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: "var(--brand)",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
