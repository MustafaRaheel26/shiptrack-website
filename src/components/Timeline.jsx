import React from 'react';
import { Clock, MapPin, Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Timeline({ events }) {
  const { t } = useTranslation();

  const getEventIcon = (statusMilestone, isLatest) => {
    const milestone = statusMilestone?.toLowerCase() || '';
    
    if (milestone === 'delivered') {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    if (milestone === 'out_for_delivery') {
      return <Truck className="w-4 h-4 text-amber-500" />;
    }
    if (milestone === 'info_received') {
      return <Package className="w-4 h-4 text-blue-500" />;
    }
    if (milestone === 'in_transit') {
      return <Truck className="w-4 h-4 text-blue-500" />;
    }
    return <Clock className="w-4 h-4 text-slate-400" />;
  };

  if (!events || events.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-8">
        <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8 flex items-center gap-2">
          {t('timeline.title')}
          <span className="text-xs font-bold uppercase tracking-widest bg-slate-100 text-slate-500 py-1 px-3 rounded-full">
            0 {t('timeline.updates')}
          </span>
        </h3>
        <div className="text-center py-12">
          <p className="text-slate-500">{t('timeline.noEvents')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-8">
      <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8 flex items-center gap-2">
        {t('timeline.title')}
        <span className="text-xs font-bold uppercase tracking-widest bg-slate-100 text-slate-500 py-1 px-3 rounded-full">
          {events.length} {t('timeline.updates')}
        </span>
      </h3>

      <div className="relative space-y-8">
        <div className="absolute left-[19px] top-3 bottom-6 w-0.5 bg-slate-200" />

        {events.map((event, index) => {
          const isLatest = index === events.length - 1;
          
          return (
            <div key={event.id} className="relative pl-12">
              <div 
                className={`absolute left-0 top-0 w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center z-10 ${
                  isLatest ? 'bg-primary-blue' : 'bg-slate-100'
                }`}
              >
                {isLatest ? (
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                ) : (
                  getEventIcon(event.statusMilestone, isLatest)
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-6">
                <div className="min-w-[160px]">
                  <p className={`text-sm font-bold ${isLatest ? 'text-primary-blue' : 'text-slate-600'}`}>
                    {event.time}
                  </p>
                  {event.location && event.location !== 'Unknown' && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h4 className={`font-bold text-base mb-1 ${isLatest ? 'text-slate-900' : 'text-slate-700'}`}>
                    {event.heading}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}