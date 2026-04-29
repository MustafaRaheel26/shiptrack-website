import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';

export default function TrackingForm({ variant = 'large' }) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    
    setIsLoading(true);
    // Simulate initial loading
    setTimeout(() => {
      navigate(`/track?number=${trackingNumber}`);
      setIsLoading(false);
    }, 500);
  };

  const isLarge = variant === 'large';

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className={`flex flex-col sm:flex-row gap-2 p-2 bg-white rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-100`}>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Enter tracking number (e.g., ST123456789)"
            className={`w-full border-none focus:ring-0 rounded-2xl py-5 px-8 text-slate-800 font-bold placeholder:text-slate-400 placeholder:font-medium transition-all outline-none bg-transparent`}
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !trackingNumber.trim()}
          className={`bg-primary-blue hover:bg-blue-800 text-white font-black py-5 px-10 rounded-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl shadow-primary-blue/20 uppercase tracking-widest text-xs h-full`}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Track Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </div>
      {isLarge && (
        <p className="text-center mt-4 text-sm text-slate-500 font-medium tracking-wide flex justify-center items-center gap-4">
          <span className="flex items-center gap-1 opacity-75">Auto-detection Carrier</span>
          <span className="opacity-25 md:inline">|</span>
          <span className="flex items-center gap-1 opacity-75">1,200+ Couriers</span>
        </p>
      )}
    </form>
  );
}
