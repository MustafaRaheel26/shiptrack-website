import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Loader2, Search, ArrowLeft, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { trackingService } from '../services/trackingService';
import TrackingResultCard from '../components/TrackingResultCard';
import Timeline from '../components/Timeline';
import TrackingForm from '../components/TrackingForm';
import SEO from '../components/SEO';

export default function TrackingResult() {
  const [searchParams] = useSearchParams();
  const trackingNumber = searchParams.get('number');
  const { t } = useTranslation();
  
  const [loading, setLoading] = useState(true);
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (trackingNumber) {
      handleTrack(trackingNumber);
    } else {
        setLoading(false);
    }
  }, [trackingNumber]);

  const handleTrack = async (number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await trackingService.getTrackingInfo(number);
      if (result.success) {
        setTrackingData(result.data);
      } else {
        setError(result.error);
        setTrackingData(null);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!trackingNumber) {
    return (
      <div className="min-h-[80vh] bg-slate-50 py-24 px-4 flex items-center justify-center">
        <SEO 
          title="Track Your Package"
          description="Enter your tracking number to get real-time updates from 1,200+ carriers worldwide."
          url="/track"
        />
        <div className="text-center max-w-xl mx-auto">
          <div className="w-20 h-20 bg-blue-100 text-primary-blue rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-100/50">
            <Search className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-6">{t('tracking.title')}</h1>
          <p className="text-slate-500 mb-10 text-lg">{t('tracking.description')}</p>
          <TrackingForm variant="small" />
          <Link to="/" className="mt-12 inline-flex items-center gap-2 text-primary-blue font-bold hover:underline group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {t('tracking.back')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <SEO 
        title={`Track ${trackingNumber} | Real-time Shipment Status`}
        description={`Track your shipment ${trackingNumber} with ${trackingData?.courier || 'carrier'}. Current status: ${trackingData?.status || 'in transit'}. Get real-time updates.`}
        url={`/track?number=${trackingNumber}`}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary-blue font-bold transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t('tracking.back')}
            </Link>
            <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('tracking.universal')}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <Loader2 className="w-12 h-12 animate-spin text-primary-blue mb-4" />
            <p className="font-bold uppercase tracking-widest text-xs">{t('tracking.connecting')}</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-100 shadow-xl max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-red-50 text-error rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3">{t('tracking.notFound')}</h2>
            <p className="text-slate-500 mb-8">{error}</p>
            <div className="space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t('tracking.tryAgain')}</p>
                <TrackingForm variant="small" />
            </div>
          </div>
        ) : trackingData && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <TrackingResultCard data={trackingData} />
            <Timeline events={trackingData.events} />
            
            <div className="mt-12 p-8 bg-blue-900 rounded-3xl text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">{t('tracking.downloadApp')}</h3>
                    <p className="text-blue-200 text-sm mb-6 max-w-md">{t('tracking.downloadAppDesc')}</p>
                    <button className="bg-white text-blue-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                        {t('tracking.downloadApp')}
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}