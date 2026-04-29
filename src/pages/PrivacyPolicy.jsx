import React from 'react';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  const lastUpdated = "April 28, 2026";

  return (
    <div className="bg-white py-24">
      <SEO 
        title="Privacy Policy | ShipTrack"
        description="Read our privacy policy to understand how ShipTrack protects your data and ensures secure tracking."
        url="/privacy"
      />
      
      <div className="max-w-4xl mx-auto px-4">
        <span className="text-primary-blue font-black uppercase text-xs tracking-widest block mb-4 text-center">Compliance</span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight text-center mb-12">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-500 italic mb-8 border-l-4 border-primary-blue pl-6 py-2">
            Last updated: {lastUpdated}. Your privacy is critical to us. We build our platform with the strictest security protocols to protect your shipment data.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">1. Information We Collect</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              When you use ShipTrack, we collect minimum necessary data to provide our tracking services. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Tracking numbers provided by you.</li>
              <li>Public tracking data provided by couriers.</li>
              <li>IP address and browser metadata for security and analytics.</li>
              <li>Contact information from support requests.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">2. How We Use Data</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              We use the collected information solely to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Aggregate tracking status across 1,200+ carriers.</li>
              <li>Improve our carrier auto-detection algorithms.</li>
              <li>Maintain platform security and prevent fraudulent misuse.</li>
              <li>Respond to your customer support inquiries.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">3. Data Sharing</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              ShipTrack does not sell your personal data. We only share data with third-party carriers (to fetch tracking status) or legal entities when required by law.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">4. Security</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              We implement industry-standard encryption for data at rest and in transit. Your tracking history is stored securely using cloud-native security practices.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">5. Contact Us</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              For any privacy-related questions, please contact our Data Protection Officer at <strong>privacy@shiptrack.io</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}