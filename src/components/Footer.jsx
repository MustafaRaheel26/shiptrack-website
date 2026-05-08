import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe, Twitter, Facebook, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/images/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img 
                src={logo} 
                alt="ShipTrack" 
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/track" className="hover:text-white transition-colors">{t('nav.track')}</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">{t('nav.blog')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-white transition-colors">{t('nav.privacy')}</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors text-slate-500 pointer-events-none">{t('footer.terms')}</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition-colors text-slate-500 pointer-events-none">{t('footer.cookie')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@shiptrack.io</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (800) 744-7482</span>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>{t('footer.globalCoverage')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs">
          <p>&copy; {currentYear} ShipTrack. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}