"use client";

import { Location } from "@/lib/generated/prisma";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMemo } from "react";

// حل مشكلة الأيقونة الافتراضية
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const containerStyle = {
  width: "100%",
  height: "500px",
};

const Map = ({ intineraies }: { intineraies: Location[] }) => {
  const center = useMemo(() => {
    if (intineraies.length === 0) return { lat: 30.033333, lng: 31.233334 }; // Default: Cairo
    return {
      lat: intineraies[0].lat,
      lng: intineraies[0].lng,
    };
  }, [intineraies]);

  return (
    <MapContainer
      center={center}
      zoom={7}
      style={containerStyle}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {intineraies.map((loc) => (
        <Marker key={loc.id} position={{ lat: loc.lat, lng: loc.lng }}>
          <Popup>
            <strong>{loc.locationTitle}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
