import {createReducer} from '@reduxjs/toolkit';
import {changeCity, loadOffers, loadReviews, setSortType} from './actions.ts';
import {FullOffers, Reviews} from '../types/offer-info';
import {INIT_CITY, SortType} from '../const.ts';

interface AppState {
  city: string;
  offers: FullOffers;
  reviews: Reviews;
  sortType: SortType;
}

const initialState: AppState = {
  city: INIT_CITY,
  offers: [],
  reviews: [],
  sortType: SortType.Popular,
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
    })
    .addCase(setSortType, (state, action) => { // Обрабатываем новое действие
      state.sortType = action.payload;
    });
});

export {reducer};
