'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';

function MapUpdater({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14);
    }
  }, [center, map]);
  return null;
}

export default function IssuesMap({ issues, focusedLocation }: any) {
  useEffect(() => {
    (async () => {
      const L = (await import('leaflet')).default;
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    })();
  }, []);

  return (
    <MapContainer
      center={[26.8467, 80.9462]} // Lucknow
      zoom={12}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapUpdater center={focusedLocation} />

      {issues.map((issue: any) => {
        if (!issue.location) return null;

        try {
          const loc = JSON.parse(issue.location);
          
          // Ensure loc is not null and has lat/lng before rendering
          if (!loc || typeof loc !== 'object' || !loc.lat || !loc.lng) return null;

          return (
            <Marker key={issue.id} position={[loc.lat, loc.lng]}>
              <Popup>
                <b>{issue.title}</b><br />
                {issue.description}
              </Popup>
            </Marker>
          );
        } catch (error) {
          return null; // fallback for invalid JSON values
        }
      })}
    </MapContainer>
  );
}