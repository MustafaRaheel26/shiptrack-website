/**
 * Tracking Service - ShipTrack Frontend
 * Connects to the backend API via Vite proxy
 */

// Use relative path - Vite proxy will handle forwarding to https://tryshiptrack.com
const API_BASE_URL = '/api';

/**
 * Use backend's already formatted date - NO conversion needed!
 * Backend already returns formattedDate like "Apr 20, 2026 07:17 PM"
 */
const formatDate = (event) => {
  // First priority: Use backend's formattedDate if available
  if (event?.formattedDate) {
    // Convert "Apr 20, 2026 07:17 PM" to "20 Apr 2026 7:17 PM" (mobile app format)
    const formatted = event.formattedDate;
    // Parse the backend formatted date
    const match = formatted.match(/([A-Za-z]{3}) (\d{1,2}), (\d{4}) (\d{2}):(\d{2}) (AM|PM)/);
    if (match) {
      const [, month, day, year, hour, minute, ampm] = match;
      // Convert to mobile app format: "20 Apr 2026 7:17 PM"
      const hour12 = parseInt(hour, 10);
      return `${parseInt(day, 10)} ${month} ${year} ${hour12}:${minute} ${ampm}`;
    }
    return formatted;
  }
  
  // Fallback: Use datetime if formattedDate is not available
  if (event?.datetime) {
    const date = new Date(event.datetime);
    if (!isNaN(date.getTime())) {
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'short' });
      const year = date.getFullYear();
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
    }
  }
  
  return 'Pending';
};

/**
 * Formats estimated delivery date (date only, no time)
 */
const formatEstimatedDate = (dateString) => {
  if (!dateString) return 'Pending';
  if (dateString === 'Delivered') return 'Delivered';
  if (dateString === 'Today') return 'Today';
  
  // If it's already in "20 Apr 2026" format, return as is
  if (/^\d{1,2} [A-Za-z]{3} \d{4}$/.test(dateString)) {
    return dateString;
  }
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
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
 * Converts statusMilestone to a user-friendly heading
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
  const events = (apiData.events || []).map((event, idx) => {
    // Debug: Log what we're receiving from backend
    console.log(`[Event ${idx}] Raw event data:`, {
      datetime: event.datetime,
      formattedDate: event.formattedDate,
      status: event.status,
      statusMilestone: event.statusMilestone
    });
    
    return {
      id: idx + 1,
      time: formatDate(event),
      location: event.location || 'Unknown',
      heading: getMilestoneHeading(event.statusMilestone),
      description: event.status || 'Status update',
      statusMilestone: event.statusMilestone,
      status: event.status,
      rawDate: event.datetime
    };
  });

  // Sort chronological order (oldest first for timeline)
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
    estimatedDelivery: formatEstimatedDate(apiData.estimated_delivery),
    origin: apiData.origin || 'Origin info pending',
    destination: apiData.destination || 'Destination info pending',
    lastUpdate: formatDate({ formattedDate: apiData.updated, datetime: apiData.updated }),
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
      console.log('[TrackingService] Fetching:', `${API_BASE_URL}/track.php?number=${cleanNumber}`);
      
      const response = await fetch(`${API_BASE_URL}/track.php?number=${encodeURIComponent(cleanNumber)}`);
      
      const result = await response.json();
      
      console.log('[TrackingService] Full API Response:', JSON.stringify(result, null, 2));
      
      if (result.status === 'success' && result.data) {
        if (result.data.status === 'error') {
          return {
            success: false,
            error: result.data.error || 'Tracking number not found'
          };
        }
        
        const transformedData = transformResponse(result.data);
        
        console.log('[TrackingService] Transformed Events:', transformedData.events.map(e => ({
          time: e.time,
          heading: e.heading,
          description: e.description
        })));
        
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
        error: 'Network error. Please check your connection and try again.'
      };
    }
  }
};

export default trackingService;