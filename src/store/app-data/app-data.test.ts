import { appData } from './app-data';
import {
  fetchOffersAction,
  fetchOfferAction,
  postCommentAction,
  changeFavoriteStatusAction
} from '../api-actions';
import {mockFullOffer, mockReviews, mockShortOffer} from '../../utils/mocks.ts';

describe('AppData Slice', () => {
  const initialState = {
    offers: [],
    isOffersDataLoading: false,
    offer: null,
    nearbyOffers: [],
    reviews: [],
    isOfferDataLoading: false,
    isCommentPosting: false,
    favorites: [],
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = appData.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should set isOffersDataLoading to true with "fetchOffersAction.pending"', () => {
    const result = appData.reducer(initialState, fetchOffersAction.pending('', undefined));
    expect(result.isOffersDataLoading).toBe(true);
  });

  it('should set offers and update loading status with "fetchOffersAction.fulfilled"', () => {
    const mockOffers = [mockShortOffer];
    const result = appData.reducer(
      initialState,
      fetchOffersAction.fulfilled(mockOffers, '', undefined)
    );
    expect(result.offers).toEqual(mockOffers);
    expect(result.isOffersDataLoading).toBe(false);
  });

  it('should set isOfferDataLoading to true with "fetchOfferAction.pending"', () => {
    const result = appData.reducer(initialState, fetchOfferAction.pending('', '1'));
    expect(result.isOfferDataLoading).toBe(true);
  });

  it('should update offer, nearby, reviews with "fetchOfferAction.fulfilled"', () => {
    const payload = {
      offer: mockFullOffer,
      nearby: [mockShortOffer],
      reviews: mockReviews
    };

    const result = appData.reducer(
      initialState,
      fetchOfferAction.fulfilled(payload, '', '1')
    );

    expect(result.offer).toEqual(payload.offer);
    expect(result.nearbyOffers).toEqual(payload.nearby);
    expect(result.reviews).toEqual(payload.reviews);
    expect(result.isOfferDataLoading).toBe(false);
  });

  it('should set isCommentPosting to true with "postCommentAction.pending"', () => {
    const result = appData.reducer(initialState, postCommentAction.pending('', { offerId: '1', comment: '', rating: 5 }));
    expect(result.isCommentPosting).toBe(true);
  });

  it('should update reviews with "postCommentAction.fulfilled"', () => {
    const result = appData.reducer(
      initialState,
      postCommentAction.fulfilled(mockReviews, '', { offerId: '1', comment: '', rating: 5 })
    );
    expect(result.reviews).toEqual(mockReviews);
    expect(result.isCommentPosting).toBe(false);
  });

  it('should add offer to favorites with "changeFavoriteStatusAction.fulfilled"', () => {
    const startState = {
      ...initialState,
      offers: [mockShortOffer],
    };

    const updatedOffer = { ...mockFullOffer, isFavorite: true };

    const result = appData.reducer(
      startState,
      changeFavoriteStatusAction.fulfilled(updatedOffer, '', { offerId: '1', status: 1 })
    );

    expect(result.offers[0].isFavorite).toBe(true);
    expect(result.favorites).toHaveLength(1);
    expect(result.favorites[0].id).toBe('1');
  });

  it('should remove offer from favorites with "changeFavoriteStatusAction.fulfilled"', () => {
    const likedOffer = { ...mockFullOffer, isFavorite: true };
    const startState = {
      ...initialState,
      offers: [likedOffer],
      favorites: [likedOffer],
      offer: likedOffer,
    };

    const updatedOffer = { ...mockFullOffer, isFavorite: false };

    const result = appData.reducer(
      startState,
      changeFavoriteStatusAction.fulfilled(updatedOffer, '', { offerId: '1', status: 0 })
    );

    expect(result.offers[0].isFavorite).toBe(false);
    expect(result.offer?.isFavorite).toBe(false);
    expect(result.favorites).toHaveLength(0);
  });
});
