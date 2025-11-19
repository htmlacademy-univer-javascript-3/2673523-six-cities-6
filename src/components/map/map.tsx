import {type City} from '../../types/offer-info.ts';
import {currentCustomIcon, defaultCustomIcon, Point, Points} from '../../types/map-types.ts';
import {useEffect, useRef} from 'react';
import useMap from '../../hooks/use-map.tsx';
import {layerGroup, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City | undefined;
  points: Points;
  selectedPoint: Point | undefined;
};

function Map(props: MapProps): JSX.Element {
  const { city, points, selectedPoint } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markersRef = useRef<Marker[]>([]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      markersRef.current = points.map((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });
        marker.addTo(markerLayer);
        return marker;
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points]);

  useEffect(() => {
    if (map) {
      markersRef.current.forEach((marker, index) => {
        const point = points[index];
        if (point) {
          marker.setIcon(
            selectedPoint !== undefined && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          );
        }
      });
    }
  }, [map, points, selectedPoint]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
