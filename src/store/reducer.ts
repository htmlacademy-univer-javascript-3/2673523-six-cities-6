import {createReducer} from '@reduxjs/toolkit';
import {changeCity, loadOffers, loadReviews} from './actions.ts';
import {FullOffers, Reviews} from '../types/offer-info';
import {InitCity} from '../const.ts';

interface AppState {
  city: string;
  offers: FullOffers;
  reviews: Reviews;
}

const initialState: AppState = {
  city: InitCity,
  offers: [],
  reviews: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    });
});

export {reducer};
