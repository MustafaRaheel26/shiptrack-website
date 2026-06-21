import React, { useState } from "react";
import SEO from "../components/SEO";

export default function DeleteAccount() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO
        title="Delete Your Account | ShipTrack"
        description="Submit your email address to request account deletion. We'll process your request within 48 hours."
        url="/delete-account"
      />

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-2xl rounded-[2rem] border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="px-8 py-12 md:px-12 md:py-16">
                <span className="inline-block py-1 px-3 rounded-full bg-primary-blue/10 text-primary-blue text-xs font-black uppercase tracking-[0.22em] mb-6">
                  Account Support
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">
                  Delete Your Account
                </h1>
                <p className="text-base text-slate-600 max-w-2xl leading-8 mb-8">
                  We're sorry to see you go! If you'd like to permanently delete
                  your account and all associated data, please submit your email
                  address below.
                </p>

                <div className="space-y-6">
                  <div className="rounded-3xl bg-slate-50 p-6 border border-slate-100">
                    <p className="text-slate-700 leading-relaxed mb-4">
                      We will process your request within 48 hours. You will
                      receive a confirmation email once your account has been
                      deleted.
                    </p>
                    <p className="text-sm text-slate-500">
                      Please use the email address associated with your account.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-slate-900 text-white p-6 border border-slate-800">
                    <p className="text-sm leading-relaxed">
                      Questions? Contact us at{" "}
                      <a
                        href="mailto:support@shiptrack.io"
                        className="text-primary-blue underline"
                      >
                        support@shiptrack.io
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 px-8 py-12 md:px-12 md:py-16">
                <div className="max-w-xl mx-auto">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold text-slate-900 mb-3"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10 outline-none transition"
                      />
                      {error && (
                        <p className="mt-3 text-sm text-red-600">{error}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-full bg-primary-blue px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-lg shadow-primary-blue/10 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-primary-blue/20"
                    >
                      Request Deletion
                    </button>

                    {submitted && (
                      <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
                        Your deletion request has been submitted. We will
                        process it within 48 hours and send a confirmation
                        email.
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
