import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FullOffer, Reviews, ShortOffers} from '../../types/offer-info';
import {
  fetchFavoritesAction,
  fetchOfferAction,
  fetchOffersAction,
  postCommentAction
} from '../api-actions';

type AppData = {
  offers: ShortOffers;
  isOffersDataLoading: boolean;
  offer: FullOffer | null;
  nearbyOffers: ShortOffers;
  reviews: Reviews;
  isOfferDataLoading: boolean;
  isCommentPosting: boolean;
  favorites: ShortOffers;
};

const initialState: AppData = {
  offers: [],
  isOffersDataLoading: false,
  offer: null,
  nearbyOffers: [],
  reviews: [],
  isOfferDataLoading: false,
  isCommentPosting: false,
  favorites: [],
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload.offer;
        state.nearbyOffers = action.payload.nearby;
        state.reviews = action.payload.reviews;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferDataLoading = false;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isCommentPosting = true;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isCommentPosting = false;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.isCommentPosting = false;
      })
      // Favorites
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  }
});
