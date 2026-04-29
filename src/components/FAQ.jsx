import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqItems = [
  {
    question: "How do I track my shipment?",
    answer: "Simply enter your unique tracking number in the search bar on our homepage. We'll automatically detect the carrier and display the current status and location of your package."
  },
  {
    question: "Which couriers do you support?",
    answer: "We support over 1,200 global carriers, including FedEx, UPS, DHL, USPS, Royal Mail, China Post, and many local delivery services. Our system is designed for universal compatibility."
  },
  {
    question: "What should I do if my tracking number isn't working?",
    answer: "First, verify that the tracking number is entered correctly without spaces. If it's a new shipment, please wait 24-48 hours as some carriers delay status updates. If the problem persists, contact the sender or the carrier directly."
  },
  {
    question: "Is ShipTrack free to use?",
    answer: "Yes! ShipTrack is a free platform for individual users to track their shipments globally. We also offer enterprise solutions for e-commerce businesses needing advanced integration."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-500 font-medium italic">Everything you need to know about our tracking service.</p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-slate-900 pr-4">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary-blue flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-slate-500 leading-relaxed text-sm">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
