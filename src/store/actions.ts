import {createAction} from '@reduxjs/toolkit';
import {Reviews, ShortOffers} from '../types/offer-info.ts';
import {AuthStatus, SortType} from '../const.ts';

export const changeCity = createAction<string>('app/changeCity');

export const loadOffers = createAction<ShortOffers>('app/loadOffers');

export const loadReviews = createAction<Reviews>('app/loadReviews');

export const setSortType = createAction<SortType>('app/setSortType');

export const requireAuthorization = createAction<AuthStatus>('user/requireAuthorization');
