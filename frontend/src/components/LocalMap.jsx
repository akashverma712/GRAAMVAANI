import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const locations = [
  {
    name: 'Primary Health Center',
    lat: 23.2599,
    lng: 77.4126,
    type: 'health',
  },
  {
    name: 'Village School',
    lat: 23.2605,
    lng: 77.414,
    type: 'education',
  },
  {
    name: 'Community Hall',
    lat: 23.261,
    lng: 77.411,
    type: 'community',
  },
];

const LocalMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 23.2599, lng: 77.4126 },
      zoom: 15,
    });

    locations.forEach((location) => {
      const marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map,
        title: location.name,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<strong>${location.name}</strong><br>Type: ${location.type}`,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12 px-4 max-w-6xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-green-800 mb-4">Local Resource Map</h2>
      <p className="text-gray-600 mb-6">
        Explore nearby health centers, schools, and community buildings.
      </p>
      <div ref={mapRef} className="w-full h-[500px] rounded-lg shadow border" />
    </motion.section>
  );
};

export default LocalMap;
