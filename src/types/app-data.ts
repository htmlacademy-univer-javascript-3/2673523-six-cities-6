import {FullOffer, Reviews, ShortOffers} from './offer-info';

export type AppData = {
  offers: ShortOffers;
  isOffersDataLoading: boolean;
  offer: FullOffer | null;
  nearbyOffers: ShortOffers;
  reviews: Reviews;
  isOfferDataLoading: boolean;
  isCommentPosting: boolean;
  favorites: ShortOffers;
};
