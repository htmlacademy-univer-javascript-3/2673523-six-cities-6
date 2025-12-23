import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlaceCard from './place-card';
import { withHistory, withStore } from '../../utils/mock-component';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { AppRoute, AuthStatus, NameSpace } from '../../const';
import { PlaceCardVariant } from '../../types/place-card-types';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route.tsx';
import {mockFullOffer} from '../../utils/mocks.ts';

vi.mock('../../store/api-actions', () => ({
  changeFavoriteStatusAction: vi.fn().mockReturnValue({ type: 'data/changeFavoriteStatus' }),
}));

describe('Component: PlaceCard', () => {
  const testVariant = 'cities' as PlaceCardVariant;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correct content', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <PlaceCard
          offer={mockFullOffer}
          variant={testVariant}
        />
      ),
      { [NameSpace.User]: { authStatus: AuthStatus.Auth, user: null } }
    );

    render(withStoreComponent);

    expect(screen.getByText(mockFullOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockFullOffer.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockFullOffer.type)).toBeInTheDocument();

    expect(screen.getByAltText(mockFullOffer.title)).toHaveAttribute('src', mockFullOffer.previewImage);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render "Premium" label when isPremium is true', () => {
    const premiumOffer = { ...mockFullOffer, isPremium: true };
    const { withStoreComponent } = withStore(
      withHistory(<PlaceCard offer={premiumOffer} variant={testVariant} />),
      { [NameSpace.User]: { authStatus: AuthStatus.NoAuth, user: null } }
    );

    render(withStoreComponent);
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should apply active class when isActive is true', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <PlaceCard
          offer={mockFullOffer}
          variant={testVariant}
          isActive
        />
      ),
      { [NameSpace.User]: { authStatus: AuthStatus.NoAuth, user: null } }
    );

    render(withStoreComponent);

    const article = screen.getByRole('article');
    expect(article).toHaveClass('place-card--active');
  });

  it('should handle mouse enter and leave events', async () => {
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();

    const { withStoreComponent } = withStore(
      withHistory(
        <PlaceCard
          offer={mockFullOffer}
          variant={testVariant}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ),
      { [NameSpace.User]: { authStatus: AuthStatus.NoAuth, user: null } }
    );

    render(withStoreComponent);

    const article = screen.getByRole('article');

    await userEvent.hover(article);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseEnter).toHaveBeenCalledWith(mockFullOffer.id);

    await userEvent.unhover(article);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('should dispatch "changeFavoriteStatusAction" when authorized user clicks bookmark', async () => {
    const { withStoreComponent } = withStore(
      withHistory(<PlaceCard offer={mockFullOffer} variant={testVariant} />),
      {
        [NameSpace.User]: {
          authStatus: AuthStatus.Auth,
          user: null,
        }
      }
    );

    render(withStoreComponent);

    const bookmarkBtn = screen.getByRole('button');
    await userEvent.click(bookmarkBtn);

    expect(changeFavoriteStatusAction).toHaveBeenCalledTimes(1);
    expect(changeFavoriteStatusAction).toHaveBeenCalledWith({
      offerId: mockFullOffer.id,
      status: 1
    });
  });

  it('should redirect to Login page when NOT authorized user clicks bookmark', async () => {
    const history = createMemoryHistory();

    const { withStoreComponent } = withStore(
      <HistoryRouter history={history}>
        <PlaceCard offer={mockFullOffer} variant={testVariant} />
      </HistoryRouter>,
      {
        [NameSpace.User]: {
          authStatus: AuthStatus.NoAuth,
          user: null,
        }
      }
    );

    render(withStoreComponent);

    await userEvent.click(screen.getByRole('button'));

    expect(history.location.pathname).toBe(AppRoute.Login);
  });
});
