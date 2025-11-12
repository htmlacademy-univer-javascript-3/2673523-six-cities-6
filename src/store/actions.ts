import {createAction} from '@reduxjs/toolkit';
import { FullOffers} from '../types/offer-info.ts';

export const changeCity = createAction<string>('app/changeCity');

export const loadOffers = createAction<FullOffers>('app/loadOffers');
