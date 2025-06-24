import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
  IoTimeOutline,
  IoSendOutline,
  IoCheckmarkCircleOutline,
  IoAlertCircleOutline
} from 'react-icons/io5';
import Button from '../Button/Button';
import './Contact.css';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Send contact form data to backend
      const response = await fetch(`${import.meta.env.VITE_APP_SERVER_URI}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
        credentials: 'include', // Important for cookies
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed with status ${response.status}`);
      }

      setFormSubmitted(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setError('Failed to submit form. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <IoLocationOutline size={24} />,
      title: "Our Location",
      details: ["Office number 7, 1st floor, Maryam Business Center, Rawalpindi, 44300, Denpasar", "Bali, Indonesia 80123"]
    },
    {
      icon: <IoCallOutline size={24} />,
      title: "Phone Number",
      details: ["+92 3322173140"]
    },
    {
      icon: <IoMailOutline size={24} />,
      title: "Email Address",
      details: ["info@balitech.org"]
    },
    {
      icon: <IoTimeOutline size={24} />,
      title: "Working Hours",
      details: ["24/7 Customer Support", "Office: Mon-Fri 06:00pm-04:00am"]
    }
  ];

  return (
    <section id="contact" className="contact-section py-20 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 contact-bg-pattern"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#080d1b] via-[#0d1b38]/95 to-[#080d1b] z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-orange uppercase text-sm tracking-[6px] mb-2"
          >
            Get In Touch
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Contact <span className="contact-gradient-text">Us</span>
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-orange mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          ></motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg text-white/70 max-w-3xl mx-auto"
          >
            Have questions about our BPO services? Ready to elevate your customer experience?
            Reach out to us today.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="contact-form-container"
          >
            <div className="contact-form-inner">
              <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>

              {formSubmitted ? (
                <div className="form-success">
                  <div className="success-icon">
                    <IoCheckmarkCircleOutline size={64} />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
                  <p className="text-white/80">
                    Your message has been sent successfully. We'll get back to you as soon as possible.
                  </p>
                  <button
                    className="mt-6 text-orange hover:underline"
                    onClick={() => setFormSubmitted(false)}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-input"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        placeholder="johndoe@example.com"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-input"
                        placeholder="+1 123 456 7890"
                        value={formState.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject" className="form-label">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-input"
                        placeholder="How can we help you?"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group mb-6">
                    <label htmlFor="message" className="form-label">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      className="form-input"
                      placeholder="Tell us about your requirements..."
                      value={formState.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {error && (
                    <div className="mb-6 p-3 bg-red-900/20 border border-red-800 rounded-lg flex items-start gap-2">
                      <IoAlertCircleOutline size={20} className="text-red-400 mt-0.5" />
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    variant="primary"
                    type="submit"
                    showIcon
                    icon={IoSendOutline}
                    disabled={submitting}
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="contact-info-container">
              <h3 className="text-2xl font-semibold mb-8">Contact Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="contact-info-card"
                  >
                    <div className="contact-info-icon">
                      {info.icon}
                    </div>
                    <h4 className="contact-info-title">{info.title}</h4>
                    <div className="contact-info-details">
                      {info.details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
