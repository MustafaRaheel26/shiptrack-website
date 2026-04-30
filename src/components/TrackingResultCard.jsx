import React from 'react';
import { Package, Truck, Calendar, MapPin, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function TrackingResultCard({ data }) {
  const getStatusColor = (code) => {
    switch (code) {
      case 'delivered': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'in_transit': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'out_for_delivery': return 'bg-amber-500/10 text-amber-600 border-amber-200';
      case 'exception': return 'bg-red-500/10 text-red-600 border-red-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getStatusIcon = (code) => {
    switch (code) {
      case 'delivered': return <CheckCircle className="w-5 h-5" />;
      case 'in_transit': return <Truck className="w-5 h-5" />;
      case 'out_for_delivery': return <Clock className="w-5 h-5" />;
      case 'exception': return <AlertCircle className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getStatusDisplayText = (statusCode) => {
    switch (statusCode) {
      case 'delivered': return 'DELIVERED';
      case 'in_transit': return 'IN TRANSIT';
      case 'out_for_delivery': return 'OUT FOR DELIVERY';
      case 'exception': return 'EXCEPTION';
      default: return 'PENDING';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden mb-8">
      {/* Header */}
      <div className="p-8 bg-primary-blue text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Tracking Number</p>
            <div className={`px-2 py-0.5 rounded bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5`}>
              {getStatusIcon(data.statusCode)}
              <span>{getStatusDisplayText(data.statusCode)}</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-none">{data.trackingNumber}</h2>
        </div>

        <div className="flex flex-col md:items-end">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 mb-1">Carrier Detection</p>
          <div className="flex items-center gap-2 text-xl font-black">
            {data.courier}
          </div>
        </div>
      </div>

      {/* Current Status Section */}
      <div className="px-8 pt-6 pb-2">
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Current Status</p>
          <p className="text-slate-800 font-medium leading-relaxed">{data.status}</p>
        </div>
      </div>

      {/* Details Grid - ORIGIN and DESTINATION are now CORRECT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Origin</p>
          <p className="text-lg font-black text-slate-900 leading-tight">{data.destination}</p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Destination</p>
          <p className="text-lg font-black text-slate-900 leading-tight">{data.origin}</p>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Est. Delivery</p>
          <p className="text-lg font-black text-slate-900 leading-tight flex items-center gap-2">
            {data.estimatedDelivery}
            <Calendar className="w-4 h-4 text-primary-blue" />
          </p>
        </div>
      </div>
    </div>
  );
}