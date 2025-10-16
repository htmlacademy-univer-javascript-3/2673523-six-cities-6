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
