import React, { useState } from "react";
import api from "../api/axiosInstance";
import "../styles/contact.css";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (!formData.full_name || !formData.email || !formData.message) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/accounts/contact/", formData);
      setSuccess(response.data.message || "Message sent successfully!");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        message: "",
      });
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Header */}
      <section className="contact-header">
        <h1>Get in touch</h1>
        <p>
          On the other hand, we denounce with righteous indignation and dislike
          men who are so beguiled and demoralized by the charms of pleasure of
          the moment, so blinded by desire, that they cannot foresee the pain and
          trouble.
        </p>
      </section>

      {/* Main Content */}
      <section className="contact-content">
        <div className="contact-form-container">
          <div className="contact-form">
            <h2>Send a message</h2>

            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="full_name">Full Name</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  placeholder="Full Name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Request"}
              </button>
            </form>
          </div>

          {/* Office Info */}
          <div className="office-info">
            <h2>Office Address</h2>
            <div className="info-item">
              <p className="label">1521 San Pedro St, Los Angeles, CA 90015</p>
            </div>

            <div className="info-item">
              <p className="label">(323) 456-7890</p>
            </div>

            <div className="info-item">
              <p className="label">info@mail.com</p>
            </div>

            <h3>Social</h3>
            <div className="social-links">
              <a href="#" title="Facebook">f</a>
              <a href="#" title="Twitter">𝕏</a>
              <a href="#" title="Instagram">📷</a>
              <a href="#" title="LinkedIn">in</a>
              <a href="#" title="RSS">📡</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="contact-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Relasto</h4>
            <p>58 Beverly Hill Ave, Brooklyn Town, New York, NY 6234, USA.</p>
            <p className="phone">+1(231) 456-7890</p>
            <div className="social-icons">
              <a href="#">f</a>
              <a href="#">𝕏</a>
              <a href="#">📷</a>
              <a href="#">📧</a>
              <a href="#">🔗</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li><a href="#">Home v1</a></li>
              <li><a href="#">Home v2</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Search</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Information</h4>
            <ul>
              <li><a href="#">Listings v2</a></li>
              <li><a href="#">Listing v2</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">License</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Documentation</h4>
            <ul>
              <li><a href="#">Agent List</a></li>
              <li><a href="#">Agent Profile</a></li>
              <li><a href="#">Log in</a></li>
              <li><a href="#">Reset Password</a></li>
              <li><a href="#">Create Account</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Others</h4>
            <ul>
              <li><a href="#">Enter OTP</a></li>
              <li><a href="#">New Listing</a></li>
              <li><a href="#">License</a></li>
              <li><a href="#">Reset Password</a></li>
              <li><a href="#">Create Account</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025. All rights reserved</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;