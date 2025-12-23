import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './header';
import { withHistory, withStore } from '../../utils/mock-component';
import { AuthStatus, NameSpace } from '../../const';
import { logoutAction } from '../../store/api-actions';
import {ShortOffers} from '../../types/offer-info.ts';
import {mockAppData, mockShortOffer, mockUser} from '../../utils/mocks.ts';

vi.mock('../../store/api-actions', () => ({
  logoutAction: vi.fn().mockReturnValue({ type: 'user/logout' }),
}));

describe('Component: Header', () => {
  const emptyFavorites : ShortOffers = [];
  const mockFavorites = [mockShortOffer];

  it('should render "Sign in" when user is NOT authorized', () => {
    const { withStoreComponent } = withStore(withHistory(<Header />), {
      [NameSpace.User]: {
        authStatus: AuthStatus.NoAuth,
        user: null,
      },
      [NameSpace.Data]: {
        ...mockAppData,
        favorites: emptyFavorites,
      },
    });

    render(withStoreComponent);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();

    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });

  it('should render user info and "Sign out" when user IS authorized', () => {
    const { withStoreComponent } = withStore(withHistory(<Header />), {
      [NameSpace.User]: {
        authStatus: AuthStatus.Auth,
        user: mockUser,
      },
      [NameSpace.Data]: {
        ...mockAppData,
        favorites: mockFavorites,
      },
    });

    render(withStoreComponent);

    expect(screen.getByText(mockUser.email)).toBeInTheDocument();

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();

    expect(screen.getByText(mockFavorites.length.toString())).toBeInTheDocument();
  });

  it('should dispatch "logoutAction" when "Sign out" is clicked', async () => {
    const { withStoreComponent } = withStore(withHistory(<Header />), {
      [NameSpace.User]: {
        authStatus: AuthStatus.Auth,
        user: mockUser,
      },
      [NameSpace.Data]: {
        ...mockAppData,
        favorites: [],
      },
    });

    render(withStoreComponent);

    const signOutLink = screen.getByText(/Sign out/i);

    await userEvent.click(signOutLink);

    expect(logoutAction).toHaveBeenCalledTimes(1);
  });
});
