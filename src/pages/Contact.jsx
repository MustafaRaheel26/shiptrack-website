import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Clock, Globe, Award, Headphones } from 'lucide-react';
import SEO from '../components/SEO';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
    trackingNumber: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    // Simulate API call - replace with your actual backend endpoint
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
    
    // Reset form after 5 seconds to allow new submission
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
        trackingNumber: ''
      });
    }, 5000);
  };

  const supportCards = [
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your tracking needs",
      color: "bg-blue-50 text-primary-blue"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Fast Response",
      description: "Average response time under 2 hours",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Coverage",
      description: "Support for 1,200+ carriers worldwide",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Expert Team",
      description: "Logistics professionals ready to help",
      color: "bg-orange-50 text-orange-600"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO 
        title="Contact ShipTrack Support | 24/7 Customer Service"
        description="Need help with tracking your shipment? Contact our 24/7 customer support team via email, phone, or online form. Fast responses guaranteed."
        url="/contact"
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-blue to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-6">
            We're Here to <span className="text-blue-200">Help</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Have questions about a shipment? Need enterprise integration support? 
            Our team is available 24/7 to assist with your logistics needs.
          </p>
        </div>
      </section>

      {/* Support Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-10">
            {supportCards.map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.color}`}>
                  {card.icon}
                </div>
                <h3 className="font-black text-slate-900 mb-2">{card.title}</h3>
                <p className="text-sm text-slate-500">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info Side */}
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Get in Touch</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Whether you have a question about tracking, need technical support, 
                or want to discuss enterprise solutions — we're ready to help.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="p-3 bg-primary-blue rounded-xl text-white group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Email Us</h4>
                    <p className="text-slate-500 text-sm">support@shiptrack.io</p>
                    <p className="text-slate-400 text-xs mt-1">Response within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="p-3 bg-primary-blue rounded-xl text-white group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Call Support</h4>
                    <p className="text-slate-500 text-sm">+1 (800) 744-7482</p>
                    <p className="text-slate-400 text-xs mt-1">Mon-Fri: 9AM - 6PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="p-3 bg-primary-blue rounded-xl text-white group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Global Headquarters</h4>
                    <p className="text-slate-500 text-sm">One Logistics Plaza, Suite 100</p>
                    <p className="text-slate-500 text-sm">New York, NY 10001, USA</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-12 p-6 bg-slate-100 rounded-2xl">
                <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary-blue" />
                  Business Hours
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Monday - Friday</span>
                    <span className="font-medium text-slate-900">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Saturday</span>
                    <span className="font-medium text-slate-900">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sunday</span>
                    <span className="font-medium text-slate-900">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">Thank You!</h3>
                  <p className="text-slate-500 mb-2">Your message has been sent successfully.</p>
                  <p className="text-slate-400 text-sm">Our support team will get back to you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe" 
                      className={`w-full bg-slate-50 border-2 rounded-xl py-3.5 px-4 text-slate-900 outline-none transition-all focus:bg-white ${
                        errors.name ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-primary-blue'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com" 
                      className={`w-full bg-slate-50 border-2 rounded-xl py-3.5 px-4 text-slate-900 outline-none transition-all focus:bg-white ${
                        errors.email ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-primary-blue'
                      }`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                        Subject
                      </label>
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl py-3.5 px-4 text-slate-900 outline-none transition-all"
                      >
                        <option>General Inquiry</option>
                        <option>Technical Support</option>
                        <option>Tracking Issue</option>
                        <option>Carrier Discrepancy</option>
                        <option>Business Partnership</option>
                        <option>Enterprise Solution</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                        Tracking Number (Optional)
                      </label>
                      <input 
                        type="text" 
                        name="trackingNumber"
                        value={formData.trackingNumber}
                        onChange={handleChange}
                        placeholder="Enter tracking number" 
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl py-3.5 px-4 text-slate-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      name="message"
                      rows="5" 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you today? Please provide as much detail as possible..." 
                      className={`w-full bg-slate-50 border-2 rounded-xl py-3.5 px-4 text-slate-900 outline-none resize-none transition-all focus:bg-white ${
                        errors.message ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-primary-blue'
                      }`}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-blue hover:bg-blue-700 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-400 mt-4">
                    By submitting this form, you agree to our privacy policy. We'll never share your information.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-black text-slate-900 mb-4">Frequently Asked Questions</h3>
          <p className="text-slate-500 mb-8">Find quick answers to common questions about tracking and support.</p>
          <Link 
            to="/faq" 
            className="inline-flex items-center gap-2 text-primary-blue font-bold hover:gap-3 transition-all"
          >
            View All FAQs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}