import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {CommentData, FullOffer, Reviews, ShortOffers} from '../types/offer-info.ts';
import {
  loadFavorites,
  loadNearbyOffers,
  loadOffer,
  loadOffers, loadReviews,
  redirectToRoute,
  requireAuthorization, setCommentPostingStatus,
  setError, setOfferDataLoadingStatus,
  setOffersDataLoadingStatus,
  setUser
} from './actions.ts';
import {saveToken, dropToken} from '../service/token';
import {ApiRoute, AppRoute, AuthStatus, TIMEOUT_SHOW_ERROR} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {store} from './index.ts';

export const clearErrorAction = createAsyncThunk(
  'app/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<ShortOffers>(ApiRoute.GetOffers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(ApiRoute.Login);
      dispatch(requireAuthorization(AuthStatus.Auth));
      dispatch(setUser(data));
    } catch {
      dispatch(requireAuthorization(AuthStatus.NoAuth));
      dispatch(setUser(null));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(ApiRoute.Login, {email, password});

    saveToken(data.token);
    dispatch(requireAuthorization(AuthStatus.Auth));
    dispatch(setUser(data));

    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthStatus.NoAuth));
    dispatch(setUser(null));
  },
);

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setOfferDataLoadingStatus(true));
    try {
      const [offerResponse, nearbyResponse, commentsResponse] = await Promise.all([
        api.get<FullOffer>(ApiRoute.GetOffer(offerId)),
        api.get<ShortOffers>(ApiRoute.GetNearbyOffers(offerId)),
        api.get<Reviews>(ApiRoute.GetOfferComments(offerId))
      ]);

      dispatch(loadOffer(offerResponse.data));
      dispatch(loadNearbyOffers(nearbyResponse.data));
      dispatch(loadReviews(commentsResponse.data));
      dispatch(setOfferDataLoadingStatus(false));
    } catch {
      dispatch(setOfferDataLoadingStatus(false));
    }
  },
);

export const postCommentAction = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postComment',
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    dispatch(setCommentPostingStatus(true));
    await api.post(ApiRoute.GetOfferComments(offerId), {comment, rating});

    const {data} = await api.get<Reviews>(ApiRoute.GetOfferComments(offerId));
    dispatch(loadReviews(data));
    dispatch(setCommentPostingStatus(false));
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<ShortOffers>(ApiRoute.Favourites);
    dispatch(loadFavorites(data));
  },
);
