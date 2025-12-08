import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {FullOffer, Reviews, ShortOffers} from '../../types/offer-info';

export const getOffers = (state: State): ShortOffers => state[NameSpace.Data].offers;

export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;

export const getOffer = (state: State): FullOffer | null => state[NameSpace.Data].offer;

export const getNearbyOffers = (state: State): ShortOffers => state[NameSpace.Data].nearbyOffers;

export const getReviews = (state: State): Reviews => state[NameSpace.Data].reviews;

export const getOfferDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOfferDataLoading;

export const getCommentPostingStatus = (state: State): boolean => state[NameSpace.Data].isCommentPosting;

export const getFavorites = (state: State): ShortOffers => state[NameSpace.Data].favorites;
