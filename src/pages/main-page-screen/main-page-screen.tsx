import { useMemo, useState } from 'react';
import PlacesList from '../../components/places-list/places-list';
import CitiesList from '../../components/cities-list/cities-list';
import Map from '../../components/map/map';
import { City, ShortOffer } from '../../types/offer-info';
import { Point } from '../../types/map-types';
import { PlaceCardVariant } from '../../types/place-card-types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SortType } from '../../const';
import SortOptions from '../../components/sort-options/sort-options';
import Header from '../../components/header/header';
import { getCity, getSortType } from '../../store/app-process/selectors';
import { getOffers } from '../../store/app-data/selectors';
import { changeCity, setSortType } from '../../store/app-process/app-process';
import MainEmpty from '../../components/main-empty/main-empty';

function MainPageScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentCity = useAppSelector(getCity);
  const allOffers = useAppSelector(getOffers);
  const activeSortType = useAppSelector(getSortType);

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
  const isEmpty = offersCount === 0;

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
    id: offer.id,
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  }));

  const selectedPoint: Point | undefined = activeOffer
    ? {
      id: activeOffer.id,
      title: activeOffer.title,
      lat: activeOffer.location.latitude,
      lng: activeOffer.location.longitude,
    }
    : undefined;

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}>
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
          {isEmpty ? (
            <MainEmpty city={currentCity} />
          ) : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersCount} places to stay in {currentCity}</b>
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
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPageScreen;
