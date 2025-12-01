"use client";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-white via-[#f7e6e1]/10 to-white pt-20">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(184,142,114,0.1),transparent_50%)]"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-linear-to-r from-[#b88e72]/10 to-[#8b6d5a]/10 text-[#b88e72] rounded-full text-sm font-semibold border border-[#b88e72]/20 mb-6">
              GET IN TOUCH
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-linear-to-br from-[#3d2c29] via-[#b88e72] to-[#3d2c29] bg-clip-text text-transparent mb-6 leading-tight">
              We&apos;d Love to <span className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">Hear From You</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have a question, feedback, or just want to say hello? Our team is here to help and would love to connect with you.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Email Card */}
              <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                  <FontAwesomeIcon icon={faEnvelope} className="text-white text-xl" />
                </div>
                <h3 className="text-lg font-bold text-[#3d2c29] mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm mb-2">Drop us a line anytime</p>
                <a href="mailto:info@benedettoboutique.co.za" className="text-[#b88e72] hover:text-[#8b6d5a] transition-colors text-sm font-medium">
                  info@benedettoboutique.co.za
                </a>
              </div>

              {/* Phone Card */}
              <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-linear-to-br from-[#8b6d5a] to-[#6b5d4a] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                  <FontAwesomeIcon icon={faPhone} className="text-white text-xl" />
                </div>
                <h3 className="text-lg font-bold text-[#3d2c29] mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm mb-2">Mon-Fri 9am-6pm</p>
                <a href="tel:+27793055616" className="text-[#b88e72] hover:text-[#8b6d5a] transition-colors text-sm font-medium">
                  +27 79 305 5616
                </a>
              </div>

              {/* Location Card */}
              <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-linear-to-br from-[#b88e72] to-[#8b6d5a] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white text-xl" />
                </div>
                <h3 className="text-lg font-bold text-[#3d2c29] mb-2">Visit Us</h3>
                <p className="text-gray-600 text-sm mb-2">Come say hi!</p>
                <p className="text-[#b88e72] text-sm font-medium">
                  Johannesburg, South Africa
                </p>
              </div>

              {/* Hours Card */}
              <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 bg-linear-to-br from-[#8b6d5a] to-[#6b5d4a] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                  <FontAwesomeIcon icon={faClock} className="text-white text-xl" />
                </div>
                <h3 className="text-lg font-bold text-[#3d2c29] mb-2">Business Hours</h3>
                <p className="text-gray-600 text-sm mb-1">Mon-Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600 text-sm">Sat: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-3xl font-bold text-[#3d2c29] mb-2">
                  Send Us a <span className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">Message</span>
                </h2>
                <p className="text-gray-600 mb-8">Fill out the form below and we&apos;ll get back to you within 24 hours</p>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-700 text-sm font-medium">✓ Thank you! Your message has been sent successfully.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-[#3d2c29] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b88e72] focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#3d2c29] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b88e72] focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[#3d2c29] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b88e72] focus:border-transparent transition-all"
                        placeholder="+27 12 345 6789"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-[#3d2c29] mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b88e72] focus:border-transparent transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="order">Order Support</option>
                        <option value="product">Product Question</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#3d2c29] mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b88e72] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white rounded-xl font-semibold hover:from-[#8b6d5a] hover:to-[#b88e72] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Map & Additional Info */}
              <div className="space-y-8">
                {/* Map */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228652.73843769447!2d27.849608!3d-26.204103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c68f0406a51%3A0x238ac9d9b1d34041!2sJohannesburg%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    className="contact-map-iframe"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    title="B Boutique Location"
                  ></iframe>
                </div>

                {/* FAQ Quick Links */}
                <div className="bg-linear-to-br from-[#3d2c29] to-[#4d3c39] rounded-3xl p-8 shadow-xl">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Need Quick <span className="bg-linear-to-r from-[#b88e72] to-[#f7e6e1] bg-clip-text text-transparent">Answers?</span>
                  </h3>
                  <p className="text-[#f7e6e1]/80 mb-6">Check out our frequently asked questions for instant help</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#b88e72] mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-[#f7e6e1]/90 text-sm">Shipping & Delivery Information</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#b88e72] mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-[#f7e6e1]/90 text-sm">Returns & Exchanges Policy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#b88e72] mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-[#f7e6e1]/90 text-sm">Size Guide & Measurements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#b88e72] mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-[#f7e6e1]/90 text-sm">Payment & Security</span>
                    </li>
                  </ul>
                  <a
                    href="/faq"
                    className="inline-block px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold border border-white/30 hover:bg-white/20 transition-all duration-300"
                  >
                    View All FAQs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-[#f7e6e1]/30 via-white to-[#f7e6e1]/30"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3d2c29] mb-6">
              Prefer to <span className="bg-linear-to-r from-[#b88e72] to-[#8b6d5a] bg-clip-text text-transparent">Shop First?</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Explore our curated collection of premium fashion pieces and discover your perfect style.
            </p>
            <a
              href="/products"
              className="inline-block px-8 py-4 bg-linear-to-r from-[#b88e72] to-[#8b6d5a] text-white rounded-full font-semibold hover:from-[#8b6d5a] hover:to-[#b88e72] transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Browse Collection
              <span className="ml-2">→</span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
