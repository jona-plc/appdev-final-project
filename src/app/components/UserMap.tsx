'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

interface UserMapProps {
  lat: number;
  lng: number;
  name: string;
  address: string; // Address to display in popup
}

// 🛠️ Fix Leaflet icon loading issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// 🔁 Helper component to force map to center when lat/lng change
function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    // Create a valid LatLngBounds object using the current lat/lng
    const bounds = L.latLngBounds([L.latLng(lat, lng), L.latLng(lat, lng)]);

    // Use fitBounds to show the map in such a way that the marker fits properly
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [lat, lng, map]);

  return null;
}

export default function UserMap({ lat, lng, name, address }: UserMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);  // Ensure that it only runs on client-side
  }, []);

  if (!isClient) return null;

  return (
    <div className="h-[400px] w-full rounded-md overflow-hidden">
      <MapContainer
        center={[lat, lng]}
        zoom={13}  // Set zoom level to 13
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <RecenterMap lat={lat} lng={lng} />
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>
            <div>
              <strong>{name}'s Location</strong>
              <br />
              <p>{address}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
