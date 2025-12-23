import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../service/api';
import { State } from '../types/state';
import {
  checkAuthAction,
  fetchOffersAction,
  loginAction,
  logoutAction,
  fetchOfferAction,
  postCommentAction,
  fetchFavoritesAction,
  changeFavoriteStatusAction,
  clearErrorAction
} from './api-actions';
import { API_ROUTE, TIMEOUT_SHOW_ERROR } from '../const';
import { redirectToRoute } from './actions';
import { setError } from './app-process/app-process';
import * as tokenStorage from '../service/token';
import { AuthData } from '../types/auth-data';
import {
  AppThunkDispatch,
  extractActionsTypes,
  mockFullOffer,
  mockReviews,
  mockShortOffer,
  mockUser
} from '../utils/mocks.ts';
import {PayloadAction} from '@reduxjs/toolkit';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);

  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({} as State);
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "pending" and "fulfilled" with mocked offers when server returns 200', async () => {
      const mockOffers = [mockShortOffer];
      mockAxiosAdapter.onGet(API_ROUTE.GetOffers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const actions = extractActionsTypes(store.getActions());
      const fulfilledAction = store.getActions().at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);
      expect(fulfilledAction.payload).toEqual(mockOffers);
    });

    it('should dispatch "pending" and "rejected" when server returns 400', async () => {
      mockAxiosAdapter.onGet(API_ROUTE.GetOffers).reply(400);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "pending" and "fulfilled" with user data when 200', async () => {
      mockAxiosAdapter.onGet(API_ROUTE.Login).reply(200, mockUser);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());
      const fulfilledAction = store.getActions().at(1) as ReturnType<typeof checkAuthAction.fulfilled>;

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
      expect(fulfilledAction.payload).toEqual(mockUser);
    });

    it('should dispatch "pending" and "rejected" when 401', async () => {
      mockAxiosAdapter.onGet(API_ROUTE.Login).reply(401);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "pending", "redirectToRoute", "fulfilled" and save token when 200', async () => {
      const authData: AuthData = { login: 'test@test.ru', password: '123' };
      mockAxiosAdapter.onPost(API_ROUTE.Login).reply(200, mockUser);

      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(authData));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);

      expect(mockSaveToken).toHaveBeenCalledWith(mockUser.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "pending", "fulfilled" and drop token when 204', async () => {
      mockAxiosAdapter.onDelete(API_ROUTE.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
      expect(mockDropToken).toHaveBeenCalled();
    });
  });

  describe('fetchOfferAction (Promise.all)', () => {
    it('should fetch offer, nearby and reviews together', async () => {
      const offerId = '1';
      mockAxiosAdapter.onGet(API_ROUTE.GetOffer(offerId)).reply(200, mockFullOffer);
      mockAxiosAdapter.onGet(API_ROUTE.GetNearbyOffers(offerId)).reply(200, [mockShortOffer]);
      mockAxiosAdapter.onGet(API_ROUTE.GetOfferComments(offerId)).reply(200, mockReviews);

      await store.dispatch(fetchOfferAction(offerId));

      const fulfilledAction = store.getActions().at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractActionsTypes(store.getActions())).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fulfilledAction.payload).toEqual({
        offer: mockFullOffer,
        nearby: [mockShortOffer],
        reviews: mockReviews
      });
    });
  });

  describe('postCommentAction', () => {
    it('should post comment and return updated reviews', async () => {
      const offerId = '1';
      const commentData = { offerId, comment: 'Nice', rating: 5 };

      mockAxiosAdapter.onPost(API_ROUTE.GetOfferComments(offerId)).reply(201);
      mockAxiosAdapter.onGet(API_ROUTE.GetOfferComments(offerId)).reply(200, mockReviews);

      await store.dispatch(postCommentAction(commentData));

      const fulfilledAction = store.getActions().at(1) as ReturnType<typeof postCommentAction.fulfilled>;

      expect(fulfilledAction.payload).toEqual(mockReviews);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should fetch favorites list', async () => {
      mockAxiosAdapter.onGet(API_ROUTE.Favourites).reply(200, [mockShortOffer]);

      await store.dispatch(fetchFavoritesAction());

      const fulfilledAction = store.getActions().at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>;
      expect(fulfilledAction.payload).toEqual([mockShortOffer]);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('should change status and return updated offer', async () => {
      const payload = { offerId: '1', status: 1 };
      const updatedOffer = { ...mockFullOffer, isFavorite: true };

      mockAxiosAdapter.onPost(API_ROUTE.ChangeFavouriteStatus(payload.offerId, payload.status))
        .reply(200, updatedOffer);

      await store.dispatch(changeFavoriteStatusAction(payload));

      const fulfilledAction = store.getActions().at(1) as ReturnType<typeof changeFavoriteStatusAction.fulfilled>;
      expect(fulfilledAction.payload).toEqual(updatedOffer);
    });
  });

  describe('clearErrorAction', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should dispatch "setError" with null after timeout', async () => {
      await store.dispatch(clearErrorAction());

      expect(extractActionsTypes(store.getActions())).toEqual([
        clearErrorAction.pending.type,
        clearErrorAction.fulfilled.type,
      ]);

      vi.advanceTimersByTime(TIMEOUT_SHOW_ERROR);

      const actions = store.getActions();

      const lastAction = actions[actions.length - 1] as PayloadAction<string | null>;

      expect(lastAction.type).toBe(setError.type);
      expect(lastAction.payload).toBe(null);
    });
  });
});
