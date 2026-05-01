import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';  // ← ADD THIS
import logo from '../assets/images/logo.png';
import LanguageSwitcher from './LanguageSwitcher';  // ← ADD THIS

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();  // ← ADD THIS

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.track'), path: '/track' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.privacy'), path: '/privacy' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="ShipTrack" 
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold transition-colors uppercase tracking-widest ${
                  isActive(link.path)
                    ? 'text-primary-blue'
                    : 'text-slate-500 hover:text-primary-blue'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <LanguageSwitcher />  {/* ← ADD THIS */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />  {/* ← ADD THIS */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-primary-blue p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-blue-50 text-primary-blue'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-primary-blue'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}