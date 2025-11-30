import {createAction} from '@reduxjs/toolkit';
import {FullOffer, Reviews, ShortOffers} from '../types/offer-info.ts';
import {AppRoute, AuthStatus, SortType} from '../const.ts';
import {UserData} from '../types/user-data.ts';

export const changeCity = createAction<string>('app/changeCity');

export const loadOffers = createAction<ShortOffers>('app/loadOffers');

export const loadReviews = createAction<Reviews>('app/loadReviews');

export const setSortType = createAction<SortType>('app/setSortType');

export const requireAuthorization = createAction<AuthStatus>('user/requireAuthorization');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setError = createAction<string | null>('app/setError');

export const setUser = createAction<UserData | null>('user/setUser');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const loadOffer = createAction<FullOffer>('data/loadOffer');

export const loadNearbyOffers = createAction<ShortOffers>('data/loadNearbyOffers');

export const loadFavorites = createAction<ShortOffers>('data/loadFavorites');

export const setOfferDataLoadingStatus = createAction<boolean>('data/setOfferLoadingStatus');

export const setCommentPostingStatus = createAction<boolean>('data/setCommentStatus');
