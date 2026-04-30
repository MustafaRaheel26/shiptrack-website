/**
 * Tracking Service - ShipTrack Frontend
 * Matches mobile app behavior - shows "not found" for invalid numbers
 */

const API_BASE_URL = 'https://tryshiptrack.com/api';

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

// Helper function to check if tracking data is valid (has actual events)
const isValidTrackingData = (apiData) => {
  // Check if there are actual tracking events
  if (!apiData.events || apiData.events.length === 0) {
    return false;
  }
  
  // Check if courier is null or unknown
  if (!apiData.courier || apiData.courier === null) {
    return false;
  }
  
  // Check if status is 'pending' with no real updates
  if (apiData.status === 'pending' && apiData.events.length === 0) {
    return false;
  }
  
  // Check if location is 'Unknown' and no events
  if (apiData.location === 'Unknown' && apiData.events.length === 0) {
    return false;
  }
  
  return true;
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
      const url = `${API_BASE_URL}/track.php?number=${encodeURIComponent(cleanNumber)}`;
      console.log('Calling API:', url);
      
      const response = await fetch(url);
      const result = await response.json();
      
      console.log('API Response:', result);
      
      if (result.status === 'success' && result.data) {
        const apiData = result.data;
        
        // CRITICAL: Check if this is actually valid tracking data
        // Mobile app logic: If no events or courier is null -> show "not found"
        if (!isValidTrackingData(apiData)) {
          console.log('Invalid tracking number detected - showing not found message');
          return {
            success: false,
            error: 'Tracking information not available for this number. Please verify and try again.'
          };
        }
        
        // Also check for empty events array (no tracking history)
        if (apiData.events && apiData.events.length === 0) {
          return {
            success: false,
            error: 'Tracking information not available for this number. Please verify and try again.'
          };
        }
        
        console.log('Valid tracking data found');
        return {
          success: true,
          data: transformResponse(apiData)
        };
      }
      
      // If API returns error status
      return {
        success: false,
        error: result.message || 'Tracking information not available for this number. Please verify and try again.'
      };
      
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: 'Network error. Please check your connection and try again.'
      };
    }
  }
};

export default trackingService;