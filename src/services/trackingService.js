/**
 * Tracking Service - ShipTrack Frontend
 * Works on both localhost and Vercel production
 */

// IMPORTANT: Use FULL URL to your backend (NOT relative path)
const API_BASE_URL = 'https://tryshiptrack.com/api';

/**
 * Formats date to match mobile app format: "20 Apr 2026 7:17 PM"
 */
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
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    return `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
  } catch (error) {
    return dateString;
  }
};

/**
 * Maps backend status to UI status codes
 */
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

/**
 * Converts statusMilestone to user-friendly heading
 */
const getMilestoneHeading = (statusMilestone) => {
  const milestoneMap = {
    'info_received': 'Information Received',
    'in_transit': 'In Transit',
    'out_for_delivery': 'Out for Delivery',
    'delivered': 'Delivered',
    'exception': 'Exception',
    'cancelled': 'Cancelled',
    'returned': 'Returned',
    'label_created': 'Label Created',
    'picked_up': 'Picked Up',
    'arrived_at_facility': 'Arrived at Facility',
    'departed_facility': 'Departed Facility',
    'customs_cleared': 'Customs Cleared',
    'customs_hold': 'Customs Hold'
  };
  return milestoneMap[statusMilestone?.toLowerCase()] || statusMilestone || 'Status Update';
};

/**
 * Transforms API response to UI format
 */
const transformResponse = (apiData) => {
  const events = (apiData.events || []).map((event, idx) => ({
    id: idx + 1,
    time: formatDate(event.datetime || event.formattedDate),
    location: event.location || 'Unknown',
    heading: getMilestoneHeading(event.statusMilestone),
    description: event.status || 'Status update',
    statusMilestone: event.statusMilestone,
    status: event.status,
    rawDate: event.datetime
  }));

  events.sort((a, b) => {
    if (a.rawDate && b.rawDate) {
      return new Date(a.rawDate) - new Date(b.rawDate);
    }
    return 0;
  });

  const latestEvent = events[events.length - 1];

  return {
    trackingNumber: apiData.tracking_number,
    courier: apiData.courier?.toUpperCase() || 'Carrier',
    status: apiData.status_description || latestEvent?.description || apiData.status || 'Tracking information available',
    statusCode: mapStatusToUI(apiData.status),
    estimatedDelivery: apiData.estimated_delivery === 'Delivered' ? 'Delivered' : formatDate(apiData.estimated_delivery),
    origin: apiData.origin || 'Origin info pending',
    destination: apiData.destination || 'Destination info pending',
    lastUpdate: formatDate(apiData.updated),
    events: events
  };
};

export const trackingService = {
  getTrackingInfo: async (trackingNumber) => {
    if (!trackingNumber || trackingNumber.trim().length < 4) {
      return {
        success: false,
        error: 'Please enter a valid tracking number (minimum 4 characters)'
      };
    }

    const cleanNumber = trackingNumber.trim().toUpperCase();
    
    try {
      // Build URL with your backend domain - NOT relative path!
      const url = `${API_BASE_URL}/track.php?number=${encodeURIComponent(cleanNumber)}&t=${Date.now()}`;
      
      console.log('[TrackingService] Fetching from:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        }
      });
      
      console.log('[TrackingService] Response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 403) {
          return {
            success: false,
            error: 'Access forbidden. The backend server needs to allow requests from this domain.'
          };
        }
        if (response.status === 429) {
          return {
            success: false,
            error: 'Too many requests. Please wait a few minutes before trying again.'
          };
        }
        return {
          success: false,
          error: `Server error (${response.status}). Please try again later.`
        };
      }
      
      const result = await response.json();
      console.log('[TrackingService] Response data:', result);
      
      if (result.status === 'success' && result.data) {
        if (result.data.status === 'error' || result.data.error) {
          return {
            success: false,
            error: result.data.error || 'Tracking number not found. Please verify and try again.'
          };
        }
        
        const transformedData = transformResponse(result.data);
        
        return {
          success: true,
          data: transformedData
        };
      }
      
      return {
        success: false,
        error: result.message || 'Unable to track shipment. Please verify the tracking number.'
      };
      
    } catch (error) {
      console.error('[TrackingService] Error:', error);
      return {
        success: false,
        error: 'Unable to connect to tracking service. Please check your internet connection and try again.'
      };
    }
  }
};

export default trackingService;