import {useMemo, useState} from 'react';
import PlacesList from '../../components/places-list/places-list.tsx';
import CitiesList from '../../components/cities-list/cities-list.tsx';
import Map from '../../components/map/map.tsx';
import {City, ShortOffer} from '../../types/offer-info.ts';
import {Point} from '../../types/map-types.ts';
import {PlaceCardVariant} from '../../types/place-card-types.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity, setSortType} from '../../store/actions.ts';
import {SortType} from '../../const.ts';
import SortOptions from '../../components/sort-options/sort-options.tsx';
import Header from '../../components/header/header.tsx';


function MainPageScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentCity = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);
  const activeSortType = useAppSelector((state) => state.sortType);

  const cityOffers = useMemo(
    () => allOffers.filter((offer) => offer.city.name === currentCity),
    [currentCity, allOffers]
  );

  const sortedOffers = useMemo(() => {
    switch (activeSortType) {
      case SortType.PriceLowToHigh:
        return [...cityOffers].sort((a, b) => a.price - b.price);
      case SortType.PriceHighToLow:
        return [...cityOffers].sort((a, b) => b.price - a.price);
      case SortType.TopRatedFirst:
        return [...cityOffers].sort((a, b) => b.rating - a.rating);
      default:
        return cityOffers;
    }
  }, [activeSortType, cityOffers]);

  const [activeOffer, setActiveOffer] = useState<ShortOffer | undefined>(undefined);

  const offersCount = sortedOffers.length;
  const city: City | undefined = cityOffers[0]?.city;

  const handleCityChange = (newCity: string) => {
    dispatch(changeCity(newCity));
  };

  const handleSortChange = (newSortType: SortType) => {
    dispatch(setSortType(newSortType));
  };

  const handleCardHover = (offerId: string | null) => {
    const currentOffer = cityOffers.find((offer) => offer.id === offerId);
    setActiveOffer(currentOffer);
  };


  const points: Point[] = cityOffers.map((offer) => ({
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  }));


  const selectedPoint: Point | undefined = activeOffer
    ? {
      title: activeOffer.title,
      lat: activeOffer.location.latitude,
      lng: activeOffer.location.longitude,
    }
    : undefined;

  const cityName = offersCount > 0 ? cityOffers[0].city.name : 'No offers';
  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              activeCity={currentCity}
              onCityChange={handleCityChange}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in {cityName}</b>
              <SortOptions
                activeSortType={activeSortType}
                onSortChange={handleSortChange}
              />
              <div className="cities__places-list places__list tabs__content">
                <PlacesList
                  offers={sortedOffers}
                  variant={PlaceCardVariant.Cities}
                  onCardHover={handleCardHover}
                  activeOfferId={activeOffer?.id || null}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={city}
                  points={points}
                  selectedPoint={selectedPoint}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPageScreen;
