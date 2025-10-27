import PlaceCard from '../place-card/place-card.tsx';
import { FullOffers } from '../../types/offer-info.ts';

type PlacesListProps = {
  offers: FullOffers;
  onCardHover: (offerId: string | null) => void;
  activeOfferId: string | null;
};

function PlacesList({ offers, onCardHover, activeOfferId }: PlacesListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => onCardHover(offer.id)}
          onMouseLeave={() => onCardHover(null)}
          isActive={offer.id === activeOfferId}
        />
      ))}
    </>
  );
}

export default PlacesList;
