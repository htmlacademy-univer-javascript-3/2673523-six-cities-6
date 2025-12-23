import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import { redirect } from './redirect';
import browserHistory from '../../browse-history';
import { redirectToRoute } from '../actions';
import { AppRoute } from '../../const';
import { State } from '../../types/state';

vi.mock('../../browse-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    },
  },
}));

describe('Middleware: redirect', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Login);

    store.dispatch(redirectAction);

    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });
});
