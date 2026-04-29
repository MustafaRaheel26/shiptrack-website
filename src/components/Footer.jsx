import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe, Twitter, Facebook, Linkedin } from 'lucide-react';
import logo from '../assets/images/logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
              Empowering global logistics with precise tracking and real-time shipment insights. Track your packages anywhere, anytime.
            </p>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/track" className="hover:text-white transition-colors">Track Shipment</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Logistics Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors text-slate-500 pointer-events-none">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition-colors text-slate-500 pointer-events-none">Cookie Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@shiptrack.io</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (800) LOGISTICS</span>
              </li>
              <li className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Global Coverage</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs">
          <p>&copy; {currentYear} ShipTrack. All rights reserved. Professional Logistics Software.</p>
        </div>
      </div>
    </footer>
  );
}