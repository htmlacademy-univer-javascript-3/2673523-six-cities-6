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

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;
export const MAX_NEARBY_OFFERS = 3;


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

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const INIT_CITY = 'Paris';
