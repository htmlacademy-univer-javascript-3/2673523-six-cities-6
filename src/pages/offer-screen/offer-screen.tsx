import { useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useAppSelector } from '../../hooks';
import Header from '../../components/header/header.tsx'; // Импортируем Header
import NotFoundScreen from '../not-found-screen/not-found-screen.tsx';
import CommentForm from '../../components/comment-form/comment-form.tsx';
import ReviewList from '../../components/review-list/review-list.tsx';
import Map from '../../components/map/map.tsx';
import PlacesList from '../../components/places-list/places-list.tsx';
import { FullOffer, ShortOffer } from '../../types/offer-info.ts';
import { Point } from '../../types/map-types.ts';
import { PlaceCardVariant } from '../../types/place-card-types.ts';
import { MAX_NEARBY_OFFERS } from '../../const.ts';

function OfferScreen(): JSX.Element {
  const allOffers = useAppSelector((state) => state.offers);
  const allReviews = useAppSelector((state) => state.reviews);

  const { id } = useParams<{ id: string }>();
  const [activeNearbyOffer, setActiveNearbyOffer] = useState<ShortOffer | undefined>(undefined);

  const shortOffer = useMemo(
    () => allOffers.find((offer) => offer.id === id),
    [allOffers, id]
  );

  const currentReviews = useMemo(
    () => allReviews.filter((review) => review.offerId === id),
    [allReviews, id]
  );

  const nearbyOffers = useMemo(() => {
    if (!shortOffer) {
      return [];
    }
    return allOffers
      .filter((offer) => offer.city.name === shortOffer.city.name && offer.id !== shortOffer.id)
      .slice(0, MAX_NEARBY_OFFERS);
  }, [allOffers, shortOffer]);

  if (!shortOffer) {
    return <NotFoundScreen />;
  }

  //ВЕСЬ ЭТОТ ФАЙЛ МОЖНО НЕ ПРОСМАТРИВАТЬ, ДАННЫЕ С СЕРВЕРА ДОБАВЛЯЮТСЯ В СЛЕД ЗАДАНИИ
  //ЧТОБЫ ПРИЛОЖЕНИЕ МОГЛО СБИЛДИТЬСЯ В ПРОВЕРКАХ GITHUB ACTIONS СДЕЛАНА ТАКАЯ ЗАГЛУШКА
  const fullOffer: FullOffer = {
    ...shortOffer,
    images: [shortOffer.previewImage, shortOffer.previewImage, shortOffer.previewImage, shortOffer.previewImage, shortOffer.previewImage, shortOffer.previewImage],
    bedrooms: 2,
    maxAdults: 4,
    goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Fridge'],
    host: {
      id: 'mock-host-id',
      name: 'Host Name',
      isPro: true,
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    description: 'This is a temporary description generated because we are currently using ShortOffer data instead of fetching FullOffer from the server.',
  };

  const handleNearbyCardHover = (offerId: string | null) => {
    const newActiveOffer = nearbyOffers.find((offer) => offer.id === offerId);
    setActiveNearbyOffer(newActiveOffer);
  };

  const offersForMap = [...nearbyOffers, fullOffer];
  const city = fullOffer.city;

  const points: Point[] = offersForMap.map((offer) => ({
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  }));

  const selectedPoint: Point = {
    title: activeNearbyOffer?.title || fullOffer.title,
    lat: activeNearbyOffer?.location.latitude || fullOffer.location.latitude,
    lng: activeNearbyOffer?.location.longitude || fullOffer.location.longitude,
  };

  const { images, isPremium, title, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, description } = fullOffer;

  const ratingWidth = `${Math.round(rating) * 20}%`;

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, 6).map((imageSrc) => (
                <div key={imageSrc} className="offer__image-wrapper">
                  <img className="offer__image" src={imageSrc} alt={title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button
                  className={`offer__bookmark-button button ${isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidth }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{type}</li>
                <li className="offer__feature offer__feature--bedrooms">{bedrooms} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {maxAdults} adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li key={good} className="offer__inside-item">{good}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper user__avatar-wrapper ${host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewList reviews={currentReviews} />
                <CommentForm />
              </section >
            </div>
            <section className="offer__map map">
              <Map
                city={city}
                points={points}
                selectedPoint={selectedPoint}
              />
            </section>
          </div>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <PlacesList
                offers={nearbyOffers}
                variant={PlaceCardVariant.NearPlaces}
                onCardHover={handleNearbyCardHover}
                activeOfferId={activeNearbyOffer?.id || null}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
