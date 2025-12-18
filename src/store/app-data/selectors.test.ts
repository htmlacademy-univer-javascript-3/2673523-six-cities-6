import { NameSpace } from '../../const';
import {
  getOffers,
  getOffersDataLoadingStatus,
  getOffer,
  getNearbyOffers,
  getReviews,
  getOfferDataLoadingStatus,
  getCommentPostingStatus,
  getFavorites
} from './selectors';
import { Reviews, ShortOffers } from '../../types/offer-info';
import {mockFullOffer, mockReview, mockShortOffer} from '../../utils/mocks.ts';

describe('AppData selectors', () => {
  const state = {
    [NameSpace.Data]: {
      offers: [mockShortOffer] as ShortOffers,
      isOffersDataLoading: true,
      offer: mockFullOffer,
      nearbyOffers: [mockShortOffer] as ShortOffers,
      reviews: [mockReview] as Reviews,
      isOfferDataLoading: false,
      isCommentPosting: false,
      favorites: [mockShortOffer] as ShortOffers,
    }
  };

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Data];
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });

  it('should return isOffersDataLoading status', () => {
    const { isOffersDataLoading } = state[NameSpace.Data];
    const result = getOffersDataLoadingStatus(state);
    expect(result).toBe(isOffersDataLoading);
  });

  it('should return specific offer from state', () => {
    const { offer } = state[NameSpace.Data];
    const result = getOffer(state);
    expect(result).toEqual(offer);
  });

  it('should return nearbyOffers from state', () => {
    const { nearbyOffers } = state[NameSpace.Data];
    const result = getNearbyOffers(state);
    expect(result).toEqual(nearbyOffers);
  });

  it('should return reviews from state', () => {
    const { reviews } = state[NameSpace.Data];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });

  it('should return isOfferDataLoading status', () => {
    const { isOfferDataLoading } = state[NameSpace.Data];
    const result = getOfferDataLoadingStatus(state);
    expect(result).toBe(isOfferDataLoading);
  });

  it('should return isCommentPosting status', () => {
    const { isCommentPosting } = state[NameSpace.Data];
    const result = getCommentPostingStatus(state);
    expect(result).toBe(isCommentPosting);
  });

  it('should return favorites from state', () => {
    const { favorites } = state[NameSpace.Data];
    const result = getFavorites(state);
    expect(result).toEqual(favorites);
  });
});
