import React from 'react';
import { Package, Globe, Shield, Target, Users } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <div className="bg-white">
      <SEO 
        title="About ShipTrack | Global Logistics Platform"
        description="Learn about ShipTrack - simplifying global logistics with real-time tracking from 1,200+ carriers worldwide."
        url="/about"
      />
      
      {/* Header */}
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-primary-blue font-black uppercase text-sm tracking-widest block mb-4">Our Mission</span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
            Simplifying Global <span className="text-primary-blue">Logistics</span> for Everyone.
          </h1>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-6">Transparent Tracking in a Complex World</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Founded in 2024, ShipTrack was born out of a simple frustration: tracking packages across multiple countries and carriers was fragmented, slow, and often inaccurate.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our team of logistics experts and engineers built a platform that harmonizes tracking data from 1,200+ carriers into a single, clean, and real-time dashboard. Whether you're an individual waiting for a gift or a business managing thousands of orders, ShipTrack gives you the clarity you need.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" 
              alt="Logistics team" 
              className="rounded-[2.5rem] shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Our Core Values</h2>
          <p className="text-slate-400 font-medium">The principles that drive our innovation.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Trust Over Everything",
              text: "We provide verified tracking events directly from the source, ensuring you always have the truth."
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Speed is a Feature",
              text: "Our API and UI are optimized for instant results. No waiting, no loading spinners, just data."
            },
            {
              icon: <Target className="w-8 h-8" />,
              title: "Precision in Detail",
              text: "From city-level location tracking to local time estimation, we sweat the small stuff."
            }
          ].map((v, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="p-4 bg-primary-blue rounded-3xl mb-6">
                {v.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{v.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-12 md:gap-32 text-center font-black">
          <div>
            <p className="text-5xl text-primary-blue mb-2">1.2k+</p>
            <p className="text-xs uppercase tracking-widest text-slate-400">Couriers Supported</p>
          </div>
          <div>
            <p className="text-5xl text-primary-blue mb-2">250M</p>
            <p className="text-xs uppercase tracking-widest text-slate-400">Shipments Tracked</p>
          </div>
          <div>
            <p className="text-5xl text-primary-blue mb-2">220+</p>
            <p className="text-xs uppercase tracking-widest text-slate-400">Countries Served</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Zap({ className }) {
    return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
}