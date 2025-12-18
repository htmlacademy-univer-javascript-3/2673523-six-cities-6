export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;
export const MAX_NEARBY_OFFERS = 3;


export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favourites = '/favourites',
  Offers = '/offers/:id',
  NotFound = '/notFoundError',
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

export const ApiRoute = {
  GetOffers: '/offers',
  Login: '/login',
  Logout: '/logout',
  Favourites: '/favorite',
  GetOffer: (offersId : string) => `/offers/${offersId}`,
  GetNearbyOffers: (offerId : string) => `/offers/${offerId}/nearby`,
  GetOfferComments: (offerId : string) => `comments/${offerId}`,
  ChangeFavouriteStatus: (offerId : string, status: number) => `/favorite/${offerId}/${status}`,
};

export const URL_MARKER_CURRENT =
  '/img/pin-active.svg';

export const URL_MARKER_DEFAULT =
  '/img/pin.svg';

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
