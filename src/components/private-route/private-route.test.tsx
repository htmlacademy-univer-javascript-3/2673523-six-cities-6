import { render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import { AppRoute, AuthStatus, NameSpace } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import {mockUser} from '../../utils/mocks.ts';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Favorites);
  });

  it('should render loading indicator when user status is Unknown', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <PrivateRoute>
          <span>Private Content</span>
        </PrivateRoute>,
        mockHistory
      ),
      {
        [NameSpace.User]: {
          authStatus: AuthStatus.Unknown,
          user: null,
        }
      }
    );

    render(withStoreComponent);

    expect(screen.queryByText(/Private Content/i)).not.toBeInTheDocument();
  });

  it('should redirect to login when user not authorized', () => {
    const componentWithRoutes = (
      <Routes>
        <Route path={AppRoute.Login} element={<span>Login Page</span>} />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute>
            <span>Private Content</span>
          </PrivateRoute>
        }
        />
      </Routes>
    );

    const { withStoreComponent } = withStore(
      withHistory(componentWithRoutes, mockHistory),
      {
        [NameSpace.User]: {
          authStatus: AuthStatus.NoAuth,
          user: null,
        }
      }
    );

    render(withStoreComponent);

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Content/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <Routes>
          <Route path={AppRoute.Login} element={<span>Login Page</span>} />
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute>
              <span>Private Content</span>
            </PrivateRoute>
          }
          />
        </Routes>,
        mockHistory
      ),
      {
        [NameSpace.User]: {
          authStatus: AuthStatus.Auth,
          user: mockUser,
        }
      }
    );

    render(withStoreComponent);

    expect(screen.getByText(/Private Content/i)).toBeInTheDocument();
    expect(screen.queryByText(/Login Page/i)).not.toBeInTheDocument();
  });
});
