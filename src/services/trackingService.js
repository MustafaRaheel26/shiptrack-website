/**
 * Tracking Service - ShipTrack Frontend
 * Uses CORS proxy to bypass SSL issues
 */

// Use a public CORS proxy (free, no registration)
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const API_URL = 'http://tryshiptrack.com/api/track.php';

const formatDate = (dateString) => {
  if (!dateString) return 'Pending';
  if (dateString === 'Delivered') return dateString;
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    
    return `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
  } catch {
    return dateString;
  }
};

const mapStatusToUI = (status) => {
  const map = {
    'delivered': 'delivered',
    'in_transit': 'in_transit',
    'out_for_delivery': 'out_for_delivery',
    'pending': 'pending',
    'error': 'exception',
    'cancelled': 'cancelled',
    'returned': 'returned'
  };
  return map[status?.toLowerCase()] || 'pending';
};

const getMilestoneHeading = (statusMilestone) => {
  const map = {
    'info_received': 'Information Received',
    'in_transit': 'In Transit',
    'out_for_delivery': 'Out for Delivery',
    'delivered': 'Delivered',
    'exception': 'Exception',
    'cancelled': 'Cancelled',
    'returned': 'Returned'
  };
  return map[statusMilestone?.toLowerCase()] || statusMilestone || 'Status Update';
};

const transformResponse = (apiData) => {
  const events = (apiData.events || []).map((event, idx) => ({
    id: idx + 1,
    time: event.formattedDate || formatDate(event.datetime),
    location: event.location || 'Unknown',
    heading: getMilestoneHeading(event.statusMilestone),
    description: event.status,
    rawDate: event.datetime
  }));

  events.sort((a, b) => {
    if (a.rawDate && b.rawDate) return new Date(a.rawDate) - new Date(b.rawDate);
    return 0;
  });

  const latestEvent = events[events.length - 1];

  return {
    trackingNumber: apiData.tracking_number,
    courier: apiData.courier?.toUpperCase() || 'GLS',
    status: apiData.status_description,
    statusCode: mapStatusToUI(apiData.status),
    estimatedDelivery: apiData.estimated_delivery === 'Delivered' ? 'Delivered' : formatDate(apiData.estimated_delivery),
    origin: apiData.origin,
    destination: apiData.destination,
    lastUpdate: latestEvent?.time || 'Just now',
    events: events
  };
};

export const trackingService = {
  getTrackingInfo: async (trackingNumber) => {
    if (!trackingNumber || trackingNumber.trim().length < 4) {
      return {
        success: false,
        error: 'Please enter a valid tracking number'
      };
    }

    const cleanNumber = trackingNumber.trim().toUpperCase();
    
    try {
      // Use CORS proxy to bypass browser restrictions
      const url = `${CORS_PROXY}${encodeURIComponent(`${API_URL}?number=${cleanNumber}`)}`;
      
      console.log('Calling API via proxy:', url);
      
      const response = await fetch(url);
      const text = await response.text();
      const result = JSON.parse(text);
      
      console.log('API Response:', result);
      
      if (result.status === 'success' && result.data) {
        return {
          success: true,
          data: transformResponse(result.data)
        };
      }
      
      return {
        success: false,
        error: result.message || 'Unable to track shipment'
      };
      
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: 'Unable to connect to tracking service. Please try again.'
      };
    }
  }
};

export default trackingService;