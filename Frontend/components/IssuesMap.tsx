'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';

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
  const [leafletLib, setLeafletLib] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const L = (await import('leaflet')).default;
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      setLeafletLib(L);
    })();
  }, []);

  const getCustomIcon = (imageUrl?: string) => {
    if (!leafletLib) return null;
    
    const innerHtml = imageUrl 
      ? `<img src="${imageUrl}" style="width: 24px; height: 24px; border-radius: 50%; object-fit: cover; border: 1px solid rgba(255,255,255,0.5);" />`
      : `<div style="width: 10px; height: 10px; background: white; border-radius: 50%; box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);"></div>`;

    return leafletLib.divIcon({
      className: 'custom-map-marker',
      html: `<div style="
        width: 30px; 
        height: 30px; 
        background: linear-gradient(135deg, #3b82f6, #4f46e5); 
        border-radius: 50% 50% 50% 0; 
        transform: rotate(-45deg); 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        box-shadow: 0 4px 12px rgba(59,130,246,0.4);
        border: 2px solid white;
        z-index: 1000;
      ">
        <div style="transform: rotate(45deg); display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;">
          ${innerHtml}
        </div>
      </div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
  };

  if (!leafletLib) {
    return <div className="h-[400px] w-full rounded-xl bg-slate-800 animate-pulse flex items-center justify-center text-slate-400">Loading Map Engine...</div>;
  }

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

          const icon = getCustomIcon(issue.image);

          return (
            <Marker key={issue.id} position={[loc.lat, loc.lng]} icon={icon}>
              <Popup className="min-w-[200px]">
                <b className="text-sm font-semibold">{issue.title}</b><br />
                <p className="text-xs mt-1 mb-2 text-gray-600">{issue.description}</p>
                {issue.image && (
                  <div className="mt-2 w-full rounded overflow-hidden shadow-sm">
                    <img src={issue.image} alt={issue.title} className="w-full h-auto max-h-32 object-cover" />
                  </div>
                )}
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