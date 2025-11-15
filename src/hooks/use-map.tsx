import {useEffect, useState, MutableRefObject} from 'react';
import {City} from '../types/offer-info.ts';
import leaflet, {Map} from 'leaflet';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city : City | undefined) : Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    let instance: Map | null = null;

    if (mapRef.current !== null) {
      instance = leaflet.map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 10,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
    }

    return () => {
      if (instance) {
        instance.remove();
      }
    };
  }, [mapRef]);

  useEffect(() => {
    if (map && city) {
      map.setView({
        lat: city.location.latitude,
        lng: city.location.longitude,
      }, city.location.zoom);
    }
  }, [map, city]);

  return map;
}

export default useMap;
