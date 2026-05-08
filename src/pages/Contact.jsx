import React, { useState, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Globe,
  Award,
  Headphones,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import SEO from "../components/SEO";

export default function Contact() {
  const formRef = useRef();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
    trackingNumber: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [emailError, setEmailError] = useState("");

  // ============================================
  // REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
  // ============================================
  const EMAILJS_PUBLIC_KEY = "EKF4-ll33k7q-pW3m";
  const EMAILJS_SERVICE_ID = "service_fil2ume";
  const EMAILJS_TEMPLATE_ID = "template_5bzybio";
  // ============================================

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contact.form.nameRequired');
    if (!formData.email.trim()) newErrors.email = t('contact.form.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = t('contact.form.emailInvalid');
    if (!formData.message.trim()) newErrors.message = t('contact.form.messageRequired');
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
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
    setEmailError("");

    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        tracking_number: formData.trackingNumber || "Not provided",
        to_name: "ShipTrack Support",
      };

      console.log("Sending email with params:", templateParams);

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
      );

      setLoading(false);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          subject: "General Inquiry",
          message: "",
          trackingNumber: "",
        });
      }, 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setLoading(false);
      setEmailError(t('contact.form.error'));
    }
  };

  const supportCards = [
    {
      icon: <Headphones className="w-6 h-6" />,
      title: t('contact.cards.support'),
      description: t('contact.cards.supportDesc'),
      color: "bg-blue-50 text-primary-blue",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t('contact.cards.response'),
      description: t('contact.cards.responseDesc'),
      color: "bg-green-50 text-green-600",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: t('contact.cards.global'),
      description: t('contact.cards.globalDesc'),
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t('contact.cards.expert'),
      description: t('contact.cards.expertDesc'),
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO
        title={t('contact.hero.title') + " | ShipTrack"}
        description={t('contact.hero.description')}
        url="/contact"
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-blue to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
            {t('contact.hero.badge')}
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-6">
            {t('contact.hero.title')} <span className="text-blue-200">{t('contact.hero.titleSpan')}</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            {t('contact.hero.description')}
          </p>
        </div>
      </section>

      {/* Support Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-10">
            {supportCards.map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.color}`}
                >
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
              <h2 className="text-3xl font-black text-slate-900 mb-6">
                {t('contact.form.title')}
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                {t('contact.form.description')}
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="p-3 bg-primary-blue rounded-xl text-white group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{t('contact.form.email')}</h4>
                    <p className="text-slate-500 text-sm">support@shiptrack.io</p>
                    <p className="text-slate-400 text-xs mt-1">{t('contact.form.emailResponse')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="p-3 bg-primary-blue rounded-xl text-white group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{t('contact.form.call')}</h4>
                    <p className="text-slate-500 text-sm">+1 (800) 744-7482</p>
                    <p className="text-slate-400 text-xs mt-1">{t('contact.form.hours')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="p-3 bg-primary-blue rounded-xl text-white group-hover:scale-110 transition-transform">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{t('contact.form.address')}</h4>
                    <p className="text-slate-500 text-sm">One Logistics Plaza, Suite 100</p>
                    <p className="text-slate-500 text-sm">New York, NY 10001, USA</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-12 p-6 bg-slate-100 rounded-2xl">
                <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary-blue" />
                  {t('contact.form.businessHours')}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('contact.form.monday')}</span>
                    <span className="font-medium text-slate-900">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('contact.form.saturday')}</span>
                    <span className="font-medium text-slate-900">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('contact.form.sunday')}</span>
                    <span className="font-medium text-slate-900">{t('contact.form.closed')}</span>
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
                  <h3 className="text-2xl font-black text-slate-900 mb-3">
                    {t('contact.form.success')}
                  </h3>
                  <p className="text-slate-500 mb-2">
                    {t('contact.form.successDesc')}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {t('contact.form.successDesc2')}
                  </p>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {emailError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <p className="text-red-600 text-sm">{emailError}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                      {t('contact.form.name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.form.namePlaceholder')}
                      className={`w-full bg-slate-50 border-2 rounded-xl py-3.5 px-4 text-slate-900 outline-none transition-all focus:bg-white ${
                        errors.name
                          ? "border-red-400 focus:border-red-500"
                          : "border-transparent focus:border-primary-blue"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                      {t('contact.form.emailLabel')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.form.emailPlaceholder')}
                      className={`w-full bg-slate-50 border-2 rounded-xl py-3.5 px-4 text-slate-900 outline-none transition-all focus:bg-white ${
                        errors.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-transparent focus:border-primary-blue"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                        {t('contact.form.subject')}
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
                        {t('contact.form.trackingOptional')}
                      </label>
                      <input
                        type="text"
                        name="trackingNumber"
                        value={formData.trackingNumber}
                        onChange={handleChange}
                        placeholder={t('contact.form.trackingPlaceholder')}
                        className="w-full bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl py-3.5 px-4 text-slate-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                      {t('contact.form.message')} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('contact.form.messagePlaceholder')}
                      className={`w-full bg-slate-50 border-2 rounded-xl py-3.5 px-4 text-slate-900 outline-none resize-none transition-all focus:bg-white ${
                        errors.message
                          ? "border-red-400 focus:border-red-500"
                          : "border-transparent focus:border-primary-blue"
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-blue hover:bg-blue-700 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <>
                        {t('contact.form.send')}
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-400 mt-4">
                    {t('contact.form.privacy')}
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
          <h3 className="text-2xl font-black text-slate-900 mb-4">
            {t('contact.faq.title')}
          </h3>
          <p className="text-slate-500 mb-8">
            {t('contact.faq.description')}
          </p>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-primary-blue font-bold hover:gap-3 transition-all"
          >
            {t('contact.faq.viewAll')}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}