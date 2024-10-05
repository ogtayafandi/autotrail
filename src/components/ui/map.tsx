'use client'
import { useEffect, useRef } from 'react';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapboxMap | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Eğer harita zaten yüklüyse, tekrar yükleme

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Harita stili
      center: [49.8671, 40.4093], // Koordinatlar (Bakü örneği)
      zoom: 10, // Başlangıç zoom seviyesi
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
};

export default Map;