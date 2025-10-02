export const Setting = {
  OffersCount: 10,
};

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
