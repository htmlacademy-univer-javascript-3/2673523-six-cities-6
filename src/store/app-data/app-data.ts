import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {
  changeFavoriteStatusAction,
  fetchFavoritesAction,
  fetchOfferAction,
  fetchOffersAction,
  postCommentAction
} from '../api-actions';
import {AppData} from '../../types/app-data';


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
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        if (state.offer && state.offer.id === updatedOffer.id) {
          state.offer.isFavorite = updatedOffer.isFavorite;
        }

        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id ? {...offer, isFavorite: updatedOffer.isFavorite} : offer
        );

        state.nearbyOffers = state.nearbyOffers.map((offer) =>
          offer.id === updatedOffer.id ? {...offer, isFavorite: updatedOffer.isFavorite} : offer
        );

        if (updatedOffer.isFavorite) {
          state.favorites.push(updatedOffer);
        } else {
          state.favorites = state.favorites.filter((offer) => offer.id !== updatedOffer.id);
        }
      });
  }
});
