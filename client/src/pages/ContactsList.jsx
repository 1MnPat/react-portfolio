import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { FiEdit, FiTrash2, FiPlus, FiMail } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const ContactsList = () => {
  const { isAdmin } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await api.get("/contacts");
      setContacts(data);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch contacts"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      setDeletingId(id);
      await api.delete(`/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
    } catch (err) {
      alert(
        err.response?.data?.message || err.message || "Failed to delete contact"
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
          <p className="muted">Loading contacts...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-6">
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h1>Contacts</h1>
            <p className="muted" style={{ marginTop: "0.5rem" }}>
              {isAdmin ? "Manage your contact list" : "View contact list"}
            </p>
          </div>
          {isAdmin && (
            <Link to="/contacts/new" className="button">
              <FiPlus style={{ marginRight: "0.5rem" }} /> Add Contact
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

        {contacts.length === 0 ? (
          <div
            className="card"
            style={{ textAlign: "center", padding: "4rem" }}
          >
            <p className="muted" style={{ fontSize: "1.1rem" }}>
              No contacts found.
            </p>
            {isAdmin && (
              <Link
                to="/contacts/new"
                className="button"
                style={{ marginTop: "1rem" }}
              >
                <FiPlus style={{ marginRight: "0.5rem" }} /> Add Your First
                Contact
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-2">
            {contacts.map((contact) => (
              <div key={contact._id} className="card">
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
                      <h3 style={{ marginBottom: "0.5rem" }}>
                        {contact.firstname} {contact.lastname}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          color: "var(--text-secondary)",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <FiMail size={16} />
                        <span>{contact.email}</span>
                      </div>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--muted)",
                          margin: 0,
                        }}
                      >
                        Created: {formatDate(contact.createdAt)}
                      </p>
                    </div>
                    {isAdmin && (
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() =>
                            navigate(`/contacts/edit/${contact._id}`)
                          }
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
                          onClick={() => handleDelete(contact._id)}
                          disabled={deletingId === contact._id}
                          style={{
                            background: "rgba(239, 68, 68, 0.1)",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            color: "#ef4444",
                            padding: "0.5rem",
                            borderRadius: "8px",
                            cursor:
                              deletingId === contact._id
                                ? "not-allowed"
                                : "pointer",
                            opacity: deletingId === contact._id ? 0.5 : 1,
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

export default ContactsList;
