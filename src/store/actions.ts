import {createAction} from '@reduxjs/toolkit';
import {FullOffers, Reviews} from '../types/offer-info.ts';

export const changeCity = createAction<string>('app/changeCity');

export const loadOffers = createAction<FullOffers>('app/loadOffers');

export const loadReviews = createAction<Reviews>('app/loadReviews');
