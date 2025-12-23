import {MemoryHistory, createMemoryHistory, } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {Action} from 'redux';
import {createAPI} from '../service/api';
import HistoryRouter from '../components/history-route/history-route';
import {State} from '../types/state';
import {AppThunkDispatch} from './mocks';


export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}
