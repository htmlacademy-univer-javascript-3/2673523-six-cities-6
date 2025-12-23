import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {FullOffer, Reviews, ShortOffers} from '../../types/offer-info';

type DataState = Pick<State, NameSpace.Data>;

export const getOffers = (state: DataState): ShortOffers => state[NameSpace.Data].offers;

export const getOffersDataLoadingStatus = (state: DataState): boolean => state[NameSpace.Data].isOffersDataLoading;

export const getOffer = (state: DataState): FullOffer | null => state[NameSpace.Data].offer;

export const getNearbyOffers = (state: DataState): ShortOffers => state[NameSpace.Data].nearbyOffers;

export const getReviews = (state: DataState): Reviews => state[NameSpace.Data].reviews;

export const getOfferDataLoadingStatus = (state: DataState): boolean => state[NameSpace.Data].isOfferDataLoading;

export const getCommentPostingStatus = (state: DataState): boolean => state[NameSpace.Data].isCommentPosting;

export const getFavorites = (state: DataState): ShortOffers => state[NameSpace.Data].favorites;
