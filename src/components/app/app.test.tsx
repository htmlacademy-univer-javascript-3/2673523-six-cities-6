import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import App from './app';
import { withHistory, withStore } from '../../utils/mock-component';
import { AppRoute, AuthStatus, NameSpace } from '../../const';
import {mockAppData, mockUser} from '../../utils/mocks.ts';

vi.mock('../../pages/main-page-screen/main-page-screen', () => ({
  default: () => <h1>Main Page Screen</h1>
}));
vi.mock('../../pages/login-screen/login-screen', () => ({
  default: () => <h1>Login Screen</h1>
}));
vi.mock('../../pages/favorites-screen/favourite-screen', () => ({
  default: () => <h1>Favorites Screen</h1>
}));
vi.mock('../../pages/offer-screen/offer-screen', () => ({
  default: () => <h1>Offer Screen</h1>
}));
vi.mock('../../pages/not-found-screen/not-found-screen', () => ({
  default: () => <h1>404 Not Found</h1>
}));
vi.mock('../../pages/loading-page/loading-page', () => ({
  default: () => <h1>Loading Page</h1>
}));

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPageScreen" when user navigate to "/"', () => {
    const { withStoreComponent } = withStore(
      withHistory(<App />, mockHistory),
      {
        [NameSpace.User]: { authStatus: AuthStatus.NoAuth, user: null },
        [NameSpace.Data]: { ...mockAppData, isOffersDataLoading: false }
      }
    );

    mockHistory.push(AppRoute.Root);
    render(withStoreComponent);

    expect(screen.getByText(/Main Page Screen/i)).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    const { withStoreComponent } = withStore(
      withHistory(<App />, mockHistory),
      {
        [NameSpace.User]: { authStatus: AuthStatus.NoAuth, user: null },
        [NameSpace.Data]: { ...mockAppData, isOffersDataLoading: false }
      }
    );

    mockHistory.push(AppRoute.Login);
    render(withStoreComponent);

    expect(screen.getByText(/Login Screen/i)).toBeInTheDocument();
  });

  it('should render "OfferScreen" when user navigate to "/offers/:id"', () => {
    const { withStoreComponent } = withStore(
      withHistory(<App />, mockHistory),
      {
        [NameSpace.User]: { authStatus: AuthStatus.NoAuth, user: null },
        [NameSpace.Data]: { ...mockAppData, isOffersDataLoading: false }
      }
    );

    mockHistory.push('/offers/1');
    render(withStoreComponent);

    expect(screen.getByText(/Offer Screen/i)).toBeInTheDocument();
  });

  it('should render "Favorites Screen" when user navigate to "/favourites" and AUTHORIZED', () => {
    const { withStoreComponent } = withStore(
      withHistory(<App />, mockHistory),
      {
        [NameSpace.User]: { authStatus: AuthStatus.Auth, user: mockUser },
        [NameSpace.Data]: { ...mockAppData, isOffersDataLoading: false }
      }
    );

    mockHistory.push(AppRoute.Favourites);
    render(withStoreComponent);

    expect(screen.getByText(/Favorites Screen/i)).toBeInTheDocument();
  });

  it('should redirect to "LoginScreen" when user navigate to "/favourites" and NOT AUTHORIZED', () => {
    const { withStoreComponent } = withStore(
      withHistory(<App />, mockHistory),
      {
        [NameSpace.User]: { authStatus: AuthStatus.NoAuth, user: null },
        [NameSpace.Data]: { ...mockAppData, isOffersDataLoading: false }
      }
    );

    mockHistory.push(AppRoute.Favourites);
    render(withStoreComponent);

    expect(screen.getByText(/Login Screen/i)).toBeInTheDocument();
    expect(screen.queryByText(/Favorites Screen/i)).not.toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const { withStoreComponent } = withStore(
      withHistory(<App />, mockHistory),
      {
        [NameSpace.User]: { authStatus: AuthStatus.NoAuth, user: null },
        [NameSpace.Data]: { ...mockAppData, isOffersDataLoading: false }
      }
    );

    mockHistory.push('/non-existent-route');
    render(withStoreComponent);

    expect(screen.getByText(/404 Not Found/i)).toBeInTheDocument();
  });

  it('should render "LoadingPage" when isOffersDataLoading is true', () => {
    const { withStoreComponent } = withStore(
      withHistory(<App />, mockHistory),
      {
        [NameSpace.User]: { authStatus: AuthStatus.NoAuth, user: null },
        [NameSpace.Data]: { ...mockAppData, isOffersDataLoading: true }
      }
    );

    mockHistory.push(AppRoute.Root);
    render(withStoreComponent);

    expect(screen.getByText(/Loading Page/i)).toBeInTheDocument();
  });

  it('should render "LoadingPage" when AuthStatus is Unknown', () => {
    const { withStoreComponent } = withStore(
      withHistory(<App />, mockHistory),
      {
        [NameSpace.User]: { authStatus: AuthStatus.Unknown, user: null },
        [NameSpace.Data]: { ...mockAppData, isOffersDataLoading: false }
      }
    );

    mockHistory.push(AppRoute.Root);
    render(withStoreComponent);

    expect(screen.getByText(/Loading Page/i)).toBeInTheDocument();
  });
});
