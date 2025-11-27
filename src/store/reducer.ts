import {createReducer} from '@reduxjs/toolkit';
import {
  changeCity,
  loadOffers,
  loadReviews,
  requireAuthorization, setError,
  setOffersDataLoadingStatus,
  setSortType
} from './actions.ts';
import {Reviews, ShortOffers} from '../types/offer-info';
import {AuthStatus, INIT_CITY, SortType} from '../const.ts';

interface AppState {
  city: string;
  offers: ShortOffers;
  reviews: Reviews;
  sortType: SortType;
  authStatus: AuthStatus;
  isOffersDataLoading: boolean;
  error: string | null;
}

const initialState: AppState = {
  city: INIT_CITY,
  offers: [],
  reviews: [],
  sortType: SortType.Popular,
  authStatus: AuthStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
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
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
