import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Contact = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: send to backend / email service
    setSubmitted(true);

    // redirect after a short delay
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <section className="container py-6">
      <h1>Contact Me</h1>
      <p className="muted">I'd love to hear about your project. Get in touch!</p>

      <div className="grid grid-2 mt-4">
        {/* Contact Info */}
        <div className="card">
          <div className="card-body">
            <h3>Contact Info</h3>
            <p><strong>Email:</strong> mpat1071@my.centennialcollege.ca</p>
            <p><strong>Location:</strong> Toronto, Canada / Remote</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="card" onSubmit={onSubmit}>
          <div className="card-body">
            <h3>Send a Message</h3>
            {!submitted ? (
              <>
                <div className="form-row">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" value={form.name} onChange={onChange} required placeholder="Your name" />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={onChange} required placeholder="you@example.com" />
                </div>
                <div className="form-row">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="Optional" />
                </div>
                <div className="form-row">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="4" value={form.message} onChange={onChange} required placeholder="Tell me about your goals..." />
                </div>
                <button type="submit" className="button">Submit</button>
              </>
            ) : (
              <p className="success-msg">✅ Thanks for reaching out! Redirecting...</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
