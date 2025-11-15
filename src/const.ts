import {offers} from './mocks/offers.ts';
import { hosts } from './mocks/hosts.ts';
import {cities} from './mocks/cities.ts';
import {reviews} from './mocks/review.ts';

export const Setting = {
  Offers: offers,
  Hosts: hosts,
  Cities:cities,
  reviews: reviews
};

export const minCommentLength = 50;
export const maxCommentLength = 300;
export const maxNearbyOffers = 3;


export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favourites = '/favourites',
  Offers = '/offers/:id',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const UrlMarkerCurrent =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const UrlMarkerDefault =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const Cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const InitCity = 'Paris';
