export const mockTrackingData = {
  "ST123456789": {
    trackingNumber: "ST123456789",
    courier: "FedEx",
    status: "In Transit",
    statusCode: "in_transit",
    estimatedDelivery: "2026-05-02",
    origin: "New York, USA",
    destination: "London, UK",
    lastUpdate: "2026-04-28 10:30 AM",
    events: [
      {
        id: 1,
        time: "2026-04-28 10:30 AM",
        location: "New York Hub",
        status: "Departed from facility",
        description: "Your package has left the primary sorting facility."
      },
      {
        id: 2,
        time: "2026-04-27 04:15 PM",
        location: "New York Hub",
        status: "Arrived at facility",
        description: "Package received at the local exchange point."
      },
      {
        id: 3,
        time: "2026-04-27 09:00 AM",
        location: "Brooklyn, USA",
        status: "Picked up",
        description: "Courier has picked up the package from the sender."
      }
    ]
  },
  "DELIVERED99": {
    trackingNumber: "DELIVERED99",
    courier: "DHL Express",
    status: "Delivered",
    statusCode: "delivered",
    estimatedDelivery: "2026-04-25",
    origin: "Shenzhen, China",
    destination: "San Francisco, USA",
    lastUpdate: "2026-04-25 02:45 PM",
    events: [
      {
        id: 1,
        time: "2026-04-25 02:45 PM",
        location: "San Francisco, USA",
        status: "Delivered",
        description: "Package delivered to the recipient. Signed by: M. Doe"
      },
      {
        id: 2,
        time: "2026-04-25 08:30 AM",
        location: "San Francisco Hub",
        status: "Out for Delivery",
        description: "Shipment is with our local courier for delivery."
      }
    ]
  }
};
