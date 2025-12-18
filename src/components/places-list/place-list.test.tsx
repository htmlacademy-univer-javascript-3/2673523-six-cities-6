import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlacesList from './places-list';
import {PlaceCardVariant} from '../../types/place-card-types';
import {ShortOffer} from '../../types/offer-info';
import {mockShortOffer} from '../../utils/mocks';

const mockOffers: ShortOffer[] = [
  { ...mockShortOffer, id: '1', title: 'Offer 1' },
  { ...mockShortOffer, id: '2', title: 'Offer 2' },
  { ...mockShortOffer, id: '3', title: 'Offer 3' },
];

type MockPlaceCardProps = {
  offer: ShortOffer;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};


vi.mock('../place-card/place-card', () => ({
  default: ({ offer, isActive, onMouseEnter, onMouseLeave }: MockPlaceCardProps) => (
    <div
      data-testid="place-card-mock"
      data-active={isActive ? 'true' : 'false'}
      data-id={offer.id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      Offer ID: {offer.id}
    </div>
  ),
}));

describe('Component: PlacesList', () => {
  const testVariant: PlaceCardVariant = PlaceCardVariant.Cities;

  it('should render correct number of cards', () => {
    render(
      <PlacesList
        offers={mockOffers}
        variant={testVariant}
        onCardHover={vi.fn()}
        activeOfferId={null}
      />
    );

    const cards = screen.getAllByTestId('place-card-mock');
    expect(cards).toHaveLength(mockOffers.length);
  });

  it('should pass "isActive=true" to the correct card', () => {
    const activeId = '2';

    render(
      <PlacesList
        offers={mockOffers}
        variant={testVariant}
        onCardHover={vi.fn()}
        activeOfferId={activeId}
      />
    );

    const cards = screen.getAllByTestId('place-card-mock');

    expect(cards[0]).toHaveAttribute('data-active', 'false');

    expect(cards[1]).toHaveAttribute('data-active', 'true');

    expect(cards[2]).toHaveAttribute('data-active', 'false');
  });

  it('should call "onCardHover" with ID on mouse enter', async () => {
    const onCardHover = vi.fn();

    render(
      <PlacesList
        offers={mockOffers}
        variant={testVariant}
        onCardHover={onCardHover}
        activeOfferId={null}
      />
    );

    const firstCard = screen.getAllByTestId('place-card-mock')[0];

    await userEvent.hover(firstCard);

    expect(onCardHover).toHaveBeenCalledTimes(1);
    expect(onCardHover).toHaveBeenCalledWith('1');
  });

  it('should call "onCardHover" with NULL on mouse leave', async () => {
    const onCardHover = vi.fn();

    render(
      <PlacesList
        offers={mockOffers}
        variant={testVariant}
        onCardHover={onCardHover}
        activeOfferId={null}
      />
    );

    const firstCard = screen.getAllByTestId('place-card-mock')[0];

    await userEvent.hover(firstCard);
    await userEvent.unhover(firstCard);

    expect(onCardHover).toHaveBeenCalledTimes(2);
    expect(onCardHover).toHaveBeenLastCalledWith(null);
  });
});
