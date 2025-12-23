import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteCard from './favourite-card.tsx';
import { withHistory, withStore } from '../../utils/mock-component';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import { AppRoute } from '../../const';
import {mockOffer} from '../../utils/mocks.ts';

vi.mock('../../store/api-actions', () => ({
  changeFavoriteStatusAction: vi.fn().mockReturnValue({ type: 'data/changeFavoriteStatus' }),
}));

describe('Component: FavoriteCard', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correct content', () => {
    const { withStoreComponent } = withStore(
      withHistory(<FavoriteCard offer={mockOffer} />),
      {}
    );

    render(withStoreComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();

    const image = screen.getByAltText(mockOffer.title);
    expect(image).toHaveAttribute('src', mockOffer.previewImage);

    const links = screen.getAllByRole('link');
    const expectedHref = AppRoute.Offers.replace(':id', mockOffer.id);

    expect(links[0]).toHaveAttribute('href', expectedHref);
  });

  it('should render "Premium" label when offer is premium', () => {
    const premiumOffer = { ...mockOffer, isPremium: true };
    const { withStoreComponent } = withStore(
      withHistory(<FavoriteCard offer={premiumOffer} />),
      {}
    );

    render(withStoreComponent);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should NOT render "Premium" label when offer is not premium', () => {
    const { withStoreComponent } = withStore(
      withHistory(<FavoriteCard offer={mockOffer} />),
      {}
    );

    render(withStoreComponent);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render correct rating width', () => {
    const { withStoreComponent } = withStore(
      withHistory(<FavoriteCard offer={mockOffer} />),
      {}
    );

    render(withStoreComponent);
    expect(screen.getByTestId('rating-stars')).toHaveStyle({ width: '80%' });
  });

  it('should dispatch "changeFavoriteStatusAction" when bookmark button clicked', async () => {
    const { withStoreComponent } = withStore(
      withHistory(<FavoriteCard offer={mockOffer} />),
      {}
    );

    render(withStoreComponent);

    const bookmarkButton = screen.getByRole('button');

    await userEvent.click(bookmarkButton);

    expect(changeFavoriteStatusAction).toHaveBeenCalledTimes(1);
    expect(changeFavoriteStatusAction).toHaveBeenCalledWith({
      offerId: mockOffer.id,
      status: 0,
    });
  });
});
