import leaflet from 'leaflet';

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;
export const MAX_NEARBY_OFFERS = 3;
export const MAX_OFFER_IMAGES = 6;
export const MAX_OFFER_REVIEWS = 10;


export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offers = '/offers/:id',
  NotFound = '*',
}

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export const API_ROUTE = {
  GetOffers: '/offers',
  Login: '/login',
  Logout: '/logout',
  Favourites: '/favorite',
  GetOffer: (offerId : string) => `/offers/${offerId}`,
  GetNearbyOffers: (offerId : string) => `/offers/${offerId}/nearby`,
  GetOfferComments: (offerId : string) => `comments/${offerId}`,
  ChangeFavouriteStatus: (offerId : string, status: number) => `/favorite/${offerId}/${status}`,
};

export const DEFAULT_CUSTOM_ICON = leaflet.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const CURRENT_CUSTOM_ICON = leaflet.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const INIT_CITY = 'Paris';

export const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
export const REQUEST_TIMEOUT = 5000;
export const AUTH_TOKEN_KEY_NAME = 'six-cities-token';
export const TIMEOUT_SHOW_ERROR = 2000;

export enum NameSpace {
  Data = 'DATA',
  App = 'APP',
  User = 'USER',
}

export const RATING_MULTIPLIER = 20;

export enum FavoriteStatus {
  Removed = 0,
  Added = 1,
}

export const MAX_REVIEWS_COUNT = 10;
