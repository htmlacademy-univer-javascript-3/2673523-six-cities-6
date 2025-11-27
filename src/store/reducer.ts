import {createReducer} from '@reduxjs/toolkit';
import {changeCity, loadOffers, loadReviews, requireAuthorization, setSortType} from './actions.ts';
import {Reviews, ShortOffers} from '../types/offer-info';
import {AuthStatus, INIT_CITY, SortType} from '../const.ts';

interface AppState {
  city: string;
  offers: ShortOffers;
  reviews: Reviews;
  sortType: SortType;
  authStatus: AuthStatus;
}

const initialState: AppState = {
  city: INIT_CITY,
  offers: [],
  reviews: [],
  sortType: SortType.Popular,
  authStatus: AuthStatus.Unknown,
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authStatus = action.payload;
    });
});

export {reducer};
