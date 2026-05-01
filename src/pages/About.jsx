import React from 'react';
import { Shield, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="bg-white">
      <SEO 
        title="About ShipTrack | Global Logistics Platform"
        description="Learn about ShipTrack - simplifying global logistics with real-time tracking from 1,200+ carriers worldwide."
        url="/about"
      />
      
      <section className="py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-primary-blue font-black uppercase text-sm tracking-widest block mb-4">{t('about.mission.badge')}</span>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
            {t('about.mission.title')} <span className="text-primary-blue">{t('about.mission.titleSpan')}</span> {t('about.mission.titleEnd')}
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-6">{t('about.story.title')}</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {t('about.story.text1')}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {t('about.story.text2')}
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

      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-black mb-4">{t('about.values.title')}</h2>
          <p className="text-slate-400 font-medium">{t('about.values.subtitle')}</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-primary-blue rounded-3xl mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-3">{t('about.values.trust.title')}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{t('about.values.trust.text')}</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-primary-blue rounded-3xl mb-6">
              <Zap className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-3">{t('about.values.speed.title')}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{t('about.values.speed.text')}</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="p-4 bg-primary-blue rounded-3xl mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold mb-3">{t('about.values.precision.title')}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{t('about.values.precision.text')}</p>
          </div>
        </div>
      </section>

      <section className="py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-12 md:gap-32 text-center font-black">
          <div>
            <p className="text-5xl text-primary-blue mb-2">1.2k+</p>
            <p className="text-xs uppercase tracking-widest text-slate-400">{t('about.stats.couriers')}</p>
          </div>
          <div>
            <p className="text-5xl text-primary-blue mb-2">250M</p>
            <p className="text-xs uppercase tracking-widest text-slate-400">{t('about.stats.shipments')}</p>
          </div>
          <div>
            <p className="text-5xl text-primary-blue mb-2">220+</p>
            <p className="text-xs uppercase tracking-widest text-slate-400">{t('about.stats.countries')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Zap({ className }) {
    return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
}