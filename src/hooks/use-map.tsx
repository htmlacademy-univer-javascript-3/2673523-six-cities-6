import { useEffect, useState, useRef, MutableRefObject } from 'react';
import leaflet, { Map } from 'leaflet';
import { City } from '../types/offer-info';

export const TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
export const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City | undefined): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current && city) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      leaflet
        .tileLayer(
          TILE_LAYER_URL,
          {
            attribution: MAP_ATTRIBUTION,
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

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
