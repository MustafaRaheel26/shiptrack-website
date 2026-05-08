import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">{t('faq.title')}</h2>
          <p className="text-slate-500 font-medium italic">{t('faq.subtitle')}</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all">
            <button
              onClick={() => setOpenIndex(openIndex === 0 ? -1 : 0)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="font-bold text-slate-900 pr-4">{t('faq.q1')}</span>
              {openIndex === 0 ? (
                <ChevronUp className="w-5 h-5 text-primary-blue flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === 0 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 text-slate-500 leading-relaxed text-sm">
                {t('faq.a1')}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all">
            <button
              onClick={() => setOpenIndex(openIndex === 1 ? -1 : 1)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="font-bold text-slate-900 pr-4">{t('faq.q2')}</span>
              {openIndex === 1 ? (
                <ChevronUp className="w-5 h-5 text-primary-blue flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === 1 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 text-slate-500 leading-relaxed text-sm">
                {t('faq.a2')}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all">
            <button
              onClick={() => setOpenIndex(openIndex === 2 ? -1 : 2)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="font-bold text-slate-900 pr-4">{t('faq.q3')}</span>
              {openIndex === 2 ? (
                <ChevronUp className="w-5 h-5 text-primary-blue flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === 2 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 text-slate-500 leading-relaxed text-sm">
                {t('faq.a3')}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden transition-all">
            <button
              onClick={() => setOpenIndex(openIndex === 3 ? -1 : 3)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="font-bold text-slate-900 pr-4">{t('faq.q4')}</span>
              {openIndex === 3 ? (
                <ChevronUp className="w-5 h-5 text-primary-blue flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === 3 ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 text-slate-500 leading-relaxed text-sm">
                {t('faq.a4')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}