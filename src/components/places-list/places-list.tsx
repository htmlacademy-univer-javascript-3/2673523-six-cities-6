import { useState } from 'react';
import PlaceCard from '../place-card/place-card';
import { FullOffers } from '../../types/offer-info';

type PlacesListProps = {
  offers: FullOffers;
};

function PlacesList({ offers }: PlacesListProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => setActiveCardId(offer.id)}
          onMouseLeave={() => setActiveCardId(null)}
          isActive={activeCardId === offer.id}
        />
      ))}
    </div>
  );
}

export default PlacesList;
