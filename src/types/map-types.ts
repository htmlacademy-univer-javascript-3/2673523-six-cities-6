import leaflet from 'leaflet';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../const.ts';

export const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export type Point = {
  title: string;
  lat: number;
  lng: number;
};

export type Points = Point[];
