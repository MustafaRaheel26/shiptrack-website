import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Zap, Globe, BarChart3, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { blogPosts } from '../data/blogData';
import BlogCard from '../components/BlogCard';
import TrackingForm from '../components/TrackingForm';
import FAQ from '../components/FAQ';
import SEO from '../components/SEO';

export default function Home() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: t('home.features.global.title'),
      description: t('home.features.global.description')
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: t('home.features.instant.title'),
      description: t('home.features.instant.description')
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('home.features.security.title'),
      description: t('home.features.security.description')
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: t('home.features.analytics.title'),
      description: t('home.features.analytics.description')
    }
  ];

  return (
    <div className="overflow-x-hidden">
      <SEO 
        title="Track Your Shipment Anywhere | Global Package Tracking"
        description="Track packages from 1,200+ carriers worldwide. Get real-time updates, delivery estimates, and push notifications for all your shipments."
        url="/"
      />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-40 lg:pb-56 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 text-left">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block py-1 px-3 rounded bg-primary-blue text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8"
              >
                {t('home.hero.badge')}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8"
              >
                {t('home.hero.title')} <br /><span className="text-secondary-blue">{t('home.hero.titleSpan')}</span> <br />{t('home.hero.titleEnd')}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed mb-10 font-medium"
              >
                {t('home.hero.description')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="max-w-xl"
              >
                <TrackingForm variant="small" />
              </motion.div>
            </div>

            <div className="lg:col-span-5 hidden lg:block">
                <div className="relative">
                    <div className="absolute -inset-4 bg-primary-blue/5 blur-3xl rounded-full" />
                    <div className="relative bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100">
                        <div className="bg-primary-blue rounded-2xl p-6 text-white mb-6">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{t('trackingCard.trackingNumber')}</p>
                            <p className="text-xl font-black">ST-482930200</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-400">
                                <span>Status</span>
                                <span className="text-success">{t('trackingCard.inTransit')}</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary-blue w-2/3" />
                            </div>
                            <div className="pt-4 border-t border-slate-100 space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-2 h-2 rounded-full bg-primary-blue mt-1" />
                                    <div>
                                        <p className="text-sm font-black text-slate-900 leading-none">Sort Facility</p>
                                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">Memphis, TN</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-400/10 blur-[100px] rounded-full -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 blur-[120px] rounded-full -z-10" />
      </section>

      {/* Trust Marks */}
      <section className="py-12 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">{t('home.trust.title')}</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale">
            <div className="font-black text-2xl text-slate-900">FEDEX</div>
            <div className="font-black text-2xl text-slate-900">UPS</div>
            <div className="font-black text-2xl text-slate-900">DHL</div>
            <div className="font-black text-2xl text-slate-900">USPS</div>
            <div className="font-black text-2xl text-slate-900">CHINA POST</div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-primary-blue font-black uppercase text-xs tracking-widest block mb-4">{t('home.process.badge')}</span>
              <h2 className="text-4xl font-black text-slate-900 leading-tight mb-8">{t('home.process.title')}</h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="text-4xl font-black text-slate-100">01</div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{t('home.process.step1.title')}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{t('home.process.step1.text')}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="text-4xl font-black text-slate-100">02</div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{t('home.process.step2.title')}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{t('home.process.step2.text')}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="text-4xl font-black text-slate-100">03</div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{t('home.process.step3.title')}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{t('home.process.step3.text')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=800" 
                alt="Logistics background" 
                className="rounded-3xl shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary-blue text-white p-8 rounded-3xl z-20 shadow-xl hidden md:block">
                <p className="text-4xl font-black mb-1">99.9%</p>
                <p className="text-xs font-bold uppercase tracking-wider opacity-75">{t('home.process.stats')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group">
                <div className="p-3 bg-blue-50 text-primary-blue rounded-2xl w-fit mb-6 group-hover:bg-primary-blue group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article Placeholder Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 mb-16 flex justify-between items-end">
            <div>
                <span className="text-primary-blue font-black uppercase text-[10px] tracking-[0.2em] block mb-4">{t('home.blog.badge')}</span>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">{t('home.blog.title')}</h2>
            </div>
            <Link to="/blog" className="text-primary-blue font-black flex items-center gap-2 hover:gap-3 transition-all underline text-xs uppercase tracking-widest mb-2">
                {t('home.blog.viewAll')} <ArrowRight className="w-4 h-4" />
            </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
                <BlogCard key={post.id} post={post} />
            ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8 relative z-10">{t('home.cta.title')}</h2>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10">{t('home.cta.description')}</p>
            <div className="relative z-10">
                <TrackingForm variant="small" />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-blue/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>
    </div>
  );
}