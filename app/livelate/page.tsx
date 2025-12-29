"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function ClickHandler({ setLocation }: { setLocation: (loc: { coords: [number, number]; name: string ,des:string }) => void }) {
  const map = useMapEvents({
    click: async (e) => {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;

      try {
        const res = await fetch(`/api/reverseGeocode?lat=${lat}&lon=${lon}`);
        const data = await res.json();
        console.log(data);

        setLocation({ coords: [lat, lon], name: data.name ,des:data.des|| "Unknown location" });

        map.flyTo([lat, lon], 12, { duration: 1.5 });
      } catch (err) {
        console.error("Geocoding error:", err);
      }
    },
  });

  return null;
}

export default function Task() {
  const [location, setLocation] = useState<{ coords: [number, number]; name: string } | null>(null);

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[30.3753, 69.3451]} // Pakistan
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />
        <ClickHandler setLocation={setLocation} />
        {location && (
          <Marker position={location.coords}>
            <Popup>
                <div>
                {location.name}
            
               </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
