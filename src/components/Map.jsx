import React, { useEffect } from 'react';
import L from 'leaflet';

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

// Make sure to include a default icon for Leaflet
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Set default icon for Leaflet markers
const defaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = ({ fireAlerts }) => {
  useEffect(() => {
    // Create the map instance
    const map = L.map('map').setView([29.0826, 79.0634], 6); // Center on Uttarakhand

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add fire alerts as markers
    fireAlerts.forEach((alert) => {
      L.marker([alert.latitude, alert.longitude], { icon: defaultIcon })
        .addTo(map)
        .bindPopup(`<b>${alert.description}</b><br>${alert.location}`)
        .openPopup();
    });

    // Clean up map on unmount
    return () => {
      map.remove();
    };
  }, [fireAlerts]);

  return (
    <div id="map" className="w-full h-96 rounded-lg shadow-md"></div>
  );
};

export default Map;
