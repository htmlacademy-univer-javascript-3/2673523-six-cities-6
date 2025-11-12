import {createReducer} from '@reduxjs/toolkit';
import {changeCity, loadOffers} from './actions.ts';
import { FullOffers } from '../types/offer-info';

interface AppState {
  city: string;
  offers: FullOffers;
}

const initialState: AppState = {
  city: 'Paris',
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
