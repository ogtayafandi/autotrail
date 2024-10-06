'use client';
import { useEffect, useRef } from 'react';
import mapboxgl, { Map as MapboxMap, Marker, Popup, GeoJSONSource } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;

interface SegmentPoint {
  lon: number;
  lat: number;
  height: number;
  temperature: number;
}

interface MapProps {
  frozen?: boolean;
  showPlayButton?: boolean;
  style?: React.CSSProperties;
  setIsPlaying?: any;
  isPlaying?: boolean;
  segments: [number, number, number, number][];
}

const Map: React.FC<MapProps> = ({ segments, style = {}, setIsPlaying = () => {}, isPlaying = false }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const markerRef = useRef<Marker | null>(null); // Store marker reference
  const animationRef = useRef<number | null>(null); // Store animation frame for cleanup

  // Convert raw segments data to SegmentPoint objects
  const segmentPoints: SegmentPoint[] = segments.map((point) => ({
    lon: point[0],
    lat: point[1],
    height: point[2],
    temperature: point[3],
  }));

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    // Initialize the map
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [segmentPoints[0].lon, segmentPoints[0].lat],
      zoom: 14,
    });

    // Add navigation controls (zoom buttons)
    mapRef.current.addControl(new mapboxgl.NavigationControl());

    mapRef.current.on('load', () => {
      addRouteLayer();
      addMarkers(); // Initialize markers
    });

    // Cleanup on unmount
    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [segmentPoints]);

  // Function to add the route line
  const addRouteLayer = () => {
    if (!mapRef.current) return;

    const coordinates: [number, number][] = segmentPoints.map((point) => [point.lon, point.lat]);

    const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates,
      },
    };

    // Add the route as a source
    if (!mapRef.current.getSource('route')) {
      mapRef.current.addSource('route', {
        type: 'geojson',
        data: geojson,
      });
    } else {
      (mapRef.current.getSource('route') as GeoJSONSource).setData(geojson);
    }

    // Add the route as a layer
    if (!mapRef.current.getLayer('route-layer')) {
      mapRef.current.addLayer({
        id: 'route-layer',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#FF0000',
          'line-width': 4,
        },
      });
    }
  };

  // Function to animate the marker along the route
  const startMarkerAnimation = () => {
    console.log('hello')

    setIsPlaying(true); // Start playing
    let index = 0;
    const totalPoints = segments.length;
    let progress = 0;
    const speed = 3; // Adjust speed

    const animateMarker = () => {
      console.log(index, totalPoints - 1)

      if (index < totalPoints - 1) {
        if (progress >= 1) {
          index++;
          progress = 0;
        }

        const start = segments[index];
        const end = segments[index + 1];

        // Calculate interpolated position
        const lng = start?.[0] + (end?.[0] - start?.[0]) * progress;
        const lat = start?.[1] + (end?.[1] - start?.[1]) * progress;

        // Update marker position
        markerRef.current?.setLngLat([lng, lat]);

        // Move the map with the marker

        mapRef.current?.easeTo({
          center: [lng, lat],
          zoom: 14,
          // pitch: 60, // Slight pitch increase
          bearing: mapRef.current?.getBearing() ?? 0 + 0.5, // Slight rotation
          duration: 50,
        });

        // Update progress
        progress += speed;

        // Move to the next point when progress reaches 1


        // Keep animating
        animationRef.current = requestAnimationFrame(animateMarker);
      } else {
        setIsPlaying(false); // Stop playing
        if (animationRef.current) cancelAnimationFrame(animationRef.current); // Cleanup animation
      }
    };

    animateMarker();
  };

  // Cleanup the animation when the component unmounts
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Start animation when isPlaying becomes true
  useEffect(() => {
    console.log(isPlaying && markerRef.current && mapRef.current)

    if (isPlaying && markerRef.current && mapRef.current) {
      startMarkerAnimation();
    }
  }, [isPlaying]);

  // Function to add markers with popups
  const addMarkers = () => {
    if (!mapRef.current) return;

    // Initialize marker at the first point
    const popup = new Popup({ offset: 25 }).setHTML(
      `<h3>Height: ${segmentPoints[0].height}m</h3><p>Temperature: ${segmentPoints[0].temperature}°C</p>`
    );

    markerRef.current = new Marker()
      .setLngLat([segmentPoints[0].lon, segmentPoints[0].lat])
      .setPopup(popup)
      .addTo(mapRef.current);
  };

  return <div ref={mapContainer} style={{ width: '100%', height: '500px', ...style }} />;
};

export default Map;