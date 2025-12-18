import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import type { State, AppDispatch } from '../types/state';
import {CommentData, FavoriteStatusData, FullOffer, Reviews, ShortOffers} from '../types/offer-info.ts';
import {saveToken, dropToken} from '../service/token';
import {ApiRoute, AppRoute, TIMEOUT_SHOW_ERROR} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import { redirectToRoute} from './actions.ts';
import {setError} from './app-process/app-process';

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  (_arg, { dispatch }) => {
    setTimeout(
      () => dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<ShortOffers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ShortOffers>(ApiRoute.GetOffers);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(ApiRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(ApiRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  },
);

export const fetchOfferAction = createAsyncThunk<{ offer: FullOffer; nearby: ShortOffers; reviews: Reviews }, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, {extra: api}) => {
    const [offerResponse, nearbyResponse, commentsResponse] = await Promise.all([
      api.get<FullOffer>(ApiRoute.GetOffer(offerId)),
      api.get<ShortOffers>(ApiRoute.GetNearbyOffers(offerId)),
      api.get<Reviews>(ApiRoute.GetOfferComments(offerId))
    ]);

    return {
      offer: offerResponse.data,
      nearby: nearbyResponse.data,
      reviews: commentsResponse.data,
    };
  },
);

export const postCommentAction = createAsyncThunk<Reviews, CommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async ({offerId, comment, rating}, {extra: api}) => {
    await api.post(ApiRoute.GetOfferComments(offerId), {comment, rating});
    const {data} = await api.get<Reviews>(ApiRoute.GetOfferComments(offerId));
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<ShortOffers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ShortOffers>(ApiRoute.Favourites);
    return data;
  },
);

export const changeFavoriteStatusAction = createAsyncThunk<FullOffer, FavoriteStatusData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/changeFavoriteStatus',
  async ({offerId, status}, {extra: api}) => {
    const {data} = await api.post<FullOffer>(ApiRoute.ChangeFavouriteStatus(offerId, status));
    return data;
  },
);
