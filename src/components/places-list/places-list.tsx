import PlaceCard from '../place-card/place-card';
import {ShortOffers} from '../../types/offer-info';
import {PlaceCardVariant} from '../../types/place-card-types';

type PlacesListProps = {
  offers: ShortOffers;
  variant: PlaceCardVariant;
  onCardHover: (offerId: string | null) => void;
  activeOfferId: string | null;
};

function PlacesList({ offers, variant, onCardHover, activeOfferId }: PlacesListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={variant}
          onMouseEnter={() => onCardHover(offer.id)}
          onMouseLeave={() => onCardHover(null)}
          isActive={offer.id === activeOfferId}
        />
      ))}
    </>
  );
}

export default PlacesList;
