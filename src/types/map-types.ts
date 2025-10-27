import leaflet from 'leaflet';
import {UrlMarkerDefault, UrlMarkerCurrent} from '../const.ts';

export const defaultCustomIcon = leaflet.icon({
  iconUrl: UrlMarkerDefault,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const currentCustomIcon = leaflet.icon({
  iconUrl: UrlMarkerCurrent,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export type Point = {
  title: string;
  lat: number;
  lng: number;
};

export type Points = Point[];
