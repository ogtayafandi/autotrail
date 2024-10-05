'use client';
import { useEffect, useRef } from 'react';
import mapboxgl, { Map as MapboxMap, Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Mapbox CSS

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapboxMap | null>(null);
  const marker = useRef<Marker | null>(null);

  // Her bir segmentin koordinatlarını tanımlıyoruz
  const routeCoordinates = [
    [49.8671, 40.4093], // Başlangıç noktası
    [49.8771, 40.4193], // İkinci nokta
    [49.8871, 40.4293], // Üçüncü nokta
    [49.8971, 40.4393], // Dördüncü nokta (Bitiş noktası)
  ];

  const lineSegments = [
    { coordinates: [routeCoordinates[0], routeCoordinates[1]], color: '#ff0000' }, // Kırmızı
    { coordinates: [routeCoordinates[1], routeCoordinates[2]], color: '#00ff00' }, // Yeşil
    { coordinates: [routeCoordinates[2], routeCoordinates[3]], color: '#0000ff' }, // Mavi
  ];

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    // Harita tanımı
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [49.8671, 40.4093], // Koordinatlar
      zoom: 12,
      pitch: 60, // 3D görünüm açısı
      bearing: -20,
      antialias: true,
    });

    map.current.on('load', () => {
      // Terrain ve sky ekleyelim (3D görünüm için)
      map.current?.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      map.current?.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14,
      });

      map.current?.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15,
        },
      });

      // Her segmenti ekliyoruz
      lineSegments.forEach((segment, index) => {
        const sourceId = `route-${index}`;
        
        // Segmentin GeoJSON verisini ekle
        map.current?.addSource(sourceId, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: segment.coordinates,
            },
          },
        });

        // Çizgi katmanını ekliyoruz
        map.current?.addLayer({
          id: `route-layer-${index}`,
          type: 'line',
          source: sourceId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': segment.color,
            'line-width': 4,
          },
        });
      });

      // Marker'ı başlangıç noktasına ekleyelim
      marker.current = new mapboxgl.Marker()
        .setLngLat(routeCoordinates[0])
        .addTo(map.current);
    });
  }, []);

  // Marker'ı çizgi boyunca hareket ettirme fonksiyonu (smooth animasyon)
  const startMarkerAnimation = () => {
    let index = 0;
    const totalPoints = routeCoordinates.length;
    let progress = 0;
    const speed = 0.01; // Hareket hızını ayarlayabilirsiniz

    const animateMarker = () => {
      if (index < totalPoints - 1) {
        const start = routeCoordinates[index];
        const end = routeCoordinates[index + 1];

        // Animasyonun ilerlemesi
        const lng = start[0] + (end[0] - start[0]) * progress;
        const lat = start[1] + (end[1] - start[1]) * progress;

        // Marker'ı güncelle
        marker.current?.setLngLat([lng, lat]);

        // Haritayı marker'la birlikte döndürüp zoomlayalım (havalı bir efekt için)
        map.current?.easeTo({
          center: [lng, lat],
          zoom: 14,
          pitch: 60 + progress * 10, // Hafif bir pitch artışı
          bearing: map.current.getBearing() + 0.5, // Hafif bir döndürme
          duration: 50,
        });

        // İlerlemeyi artır
        progress += speed;

        // Bir noktadan diğerine geçiş tamamlandığında sonraki noktaya geç
        if (progress >= 1) {
          index++;
          progress = 0;
        }

        requestAnimationFrame(animateMarker);
      }
    };

    animateMarker();
  };

  return (
    <div>
      <button onClick={startMarkerAnimation} style={{ marginBottom: '10px' }}>
        Play
      </button>
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: '500px', // Harita yüksekliği
          position: 'relative',
        }}
      />
    </div>
  );
};

export default Map;
