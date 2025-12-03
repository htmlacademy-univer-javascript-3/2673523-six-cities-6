import {createReducer} from '@reduxjs/toolkit';
import {
  changeCity, loadFavorites, loadNearbyOffers, loadOffer,
  loadOffers,
  loadReviews,
  requireAuthorization, setCommentPostingStatus, setError, setOfferDataLoadingStatus,
  setOffersDataLoadingStatus,
  setSortType, setUser
} from './actions.ts';
import {FullOffer, Reviews, ShortOffers} from '../types/offer-info';
import {AuthStatus, INIT_CITY, SortType} from '../const.ts';
import {UserData} from '../types/user-data.ts';

interface AppState {
  city: string;
  offers: ShortOffers;
  reviews: Reviews;
  sortType: SortType;
  authStatus: AuthStatus;
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  isCommentPosting: boolean;
  offer: FullOffer | null;
  nearbyOffers: ShortOffers;
  favorites: ShortOffers;
  error: string | null;
  user: UserData | null;
}

const initialState: AppState = {
  city: INIT_CITY,
  offers: [],
  reviews: [],
  sortType: SortType.Popular,
  authStatus: AuthStatus.Unknown,
  isOffersDataLoading: false,
  isOfferDataLoading: false,
  isCommentPosting: false,
  offer: null,
  nearbyOffers: [],
  favorites: [],
  error: null,
  user: null
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
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(setCommentPostingStatus, (state, action) => {
      state.isCommentPosting = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
    });
});

export {reducer};
