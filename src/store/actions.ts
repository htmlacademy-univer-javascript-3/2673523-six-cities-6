import {createAction} from '@reduxjs/toolkit';
import {FullOffers, Reviews} from '../types/offer-info.ts';
import {SortType} from '../const.ts';

export const changeCity = createAction<string>('app/changeCity');

export const loadOffers = createAction<FullOffers>('app/loadOffers');

export const loadReviews = createAction<Reviews>('app/loadReviews');

export const setSortType = createAction<SortType>('app/setSortType');
