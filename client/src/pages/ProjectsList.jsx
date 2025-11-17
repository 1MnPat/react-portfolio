import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { FiEdit, FiTrash2, FiPlus, FiCalendar } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const ProjectsList = () => {
  const { isAdmin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await api.get("/projects");
      setProjects(data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch projects"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      setDeletingId(id);
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
    } catch (err) {
      alert(
        err.response?.data?.message || err.message || "Failed to delete project"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <section className="container py-6">
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <p className="muted">Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-6">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h1>Projects</h1>
            <p className="muted" style={{ marginTop: "0.5rem" }}>
              {isAdmin ? "Manage your projects" : "View projects"}
            </p>
          </div>
          {isAdmin && (
            <Link to="/projects/new" className="button">
              <FiPlus style={{ marginRight: "0.5rem" }} /> Add Project
            </Link>
          )}
        </div>

        {error && (
          <div
            className="card"
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#ef4444",
              padding: "1rem",
              marginBottom: "1.5rem",
            }}
          >
            {error}
          </div>
        )}

        {projects.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "4rem" }}>
            <p className="muted" style={{ fontSize: "1.1rem" }}>
              No projects found.
            </p>
            {isAdmin && (
              <Link to="/projects/new" className="button" style={{ marginTop: "1rem" }}>
                <FiPlus style={{ marginRight: "0.5rem" }} /> Add Your First Project
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-3">
            {projects.map((project) => (
              <div key={project._id} className="card">
                <div className="card-body">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "1rem",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3 style={{ marginBottom: "0.5rem" }}>{project.title}</h3>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.9rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {project.firstname} {project.lastname}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          color: "var(--text-secondary)",
                          fontSize: "0.85rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <FiCalendar size={14} />
                        <span>Completion: {formatDate(project.completion)}</span>
                      </div>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.9rem",
                          lineHeight: "1.5",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {project.description?.substring(0, 100)}
                        {project.description?.length > 100 ? "..." : ""}
                      </p>
                    </div>
                    {isAdmin && (
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => navigate(`/projects/edit/${project._id}`)}
                          style={{
                            background: "rgba(99, 102, 241, 0.1)",
                            border: "1px solid rgba(99, 102, 241, 0.3)",
                            color: "var(--brand)",
                            padding: "0.5rem",
                            borderRadius: "8px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          title="Edit"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          disabled={deletingId === project._id}
                          style={{
                            background: "rgba(239, 68, 68, 0.1)",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            color: "#ef4444",
                            padding: "0.5rem",
                            borderRadius: "8px",
                            cursor: deletingId === project._id ? "not-allowed" : "pointer",
                            opacity: deletingId === project._id ? 0.5 : 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsList;

