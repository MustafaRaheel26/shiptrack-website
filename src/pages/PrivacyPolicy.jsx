import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const lastUpdated = "April 28, 2026";

  return (
    <div className="bg-white py-24">
      <SEO 
        title={t('privacy.seo.title')}
        description={t('privacy.seo.description')}
        url="/privacy"
      />
      
      <div className="max-w-4xl mx-auto px-4">
        <span className="text-primary-blue font-black uppercase text-xs tracking-widest block mb-4 text-center">{t('privacy.badge')}</span>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight text-center mb-12">{t('privacy.title')}</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-slate-500 italic mb-8 border-l-4 border-primary-blue pl-6 py-2">
            {t('privacy.lastUpdated')} {lastUpdated}. {t('privacy.intro')}
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{t('privacy.section1.title')}</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              {t('privacy.section1.text')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>{t('privacy.section1.item1')}</li>
              <li>{t('privacy.section1.item2')}</li>
              <li>{t('privacy.section1.item3')}</li>
              <li>{t('privacy.section1.item4')}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{t('privacy.section2.title')}</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              {t('privacy.section2.text')}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>{t('privacy.section2.item1')}</li>
              <li>{t('privacy.section2.item2')}</li>
              <li>{t('privacy.section2.item3')}</li>
              <li>{t('privacy.section2.item4')}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{t('privacy.section3.title')}</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              {t('privacy.section3.text')}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{t('privacy.section4.title')}</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              {t('privacy.section4.text')}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{t('privacy.section5.title')}</h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              {t('privacy.section5.text')} <strong>privacy@shiptrack.io</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}