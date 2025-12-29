"use client";

import Map, { MapPin } from "../components/Map";

export default function MapPage() {
  const initialPins: MapPin[] = [
    {
      id: "1",
      position: [24.8607, 67.0011],
      title: "Flood Disaster",
      description: "Heavy flooding in Karachi",
      type: "disaster",
    },
    {
      id: "2",
      position: [31.5204, 74.3587],
      title: "Relief Camp",
      description: "Medical relief camp in Lahore",
      type: "response",
    },
  ];

  // Pass only the array to the child
  return <Map initialPins={initialPins} />;
}
