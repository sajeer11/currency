"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

// Types
export type LatLngTuple = [number, number];

export interface MapPin {
  id: string;
  position: LatLngTuple;
  title: string;
  description?: string;
  type: "disaster" | "response";
}

interface MapProps {
  initialPins: MapPin[];
}

// Setup Leaflet default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Map({ initialPins }: MapProps) {
  const [mapPins] = useState<MapPin[]>(initialPins);

  return (

    
    <div className="flex flex-col lg:flex-row  h-full max-w-7xl mx-auto p-4 mt-10">
      
      {/* Left Side: Data Section */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-[70vh] bg-white  shadow-md p-6 overflow-y-auto  ">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Disaster & Response Data
        </h2>

        <p className="text-gray-600 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Integer vel eros vel sapien fermentum luctus. Suspendisse
          potenti.
        </p>

        <ul className="space-y-3 text-gray-700">
          {mapPins.map((pin) => (
            <li key={pin.id}>
              {pin.title} — {pin.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side: Map Section */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-[70vh] ">
        <MapContainer
          center={[30.3753, 69.3451]}
          zoom={6}
          style={{
            height: "100%", 
            width: "100%",
          
         
          }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          />

          {mapPins.map((pin) => (
            <Marker
              key={pin.id}
              position={pin.position}
              eventHandlers={{
                click: (e) => {
                  const map = e.target._map;
                  map.flyTo(pin.position, 10, { duration: 1.5 });
                },
              }}
            >
              <Popup>
                <strong>{pin.title}</strong>
                {pin.description && <p>{pin.description}</p>}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>

  );
}
