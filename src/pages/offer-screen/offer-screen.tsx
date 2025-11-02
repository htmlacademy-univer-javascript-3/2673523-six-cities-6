import { useParams, Link } from 'react-router-dom';
import Logo from '../../components/logo/logo.tsx';
import { FullOffers, Reviews } from '../../types/offer-info.ts';
import NotFoundScreen from '../not-found-screen/not-found-screen.tsx';
import CommentForm from '../../components/comment-form/comment-form.tsx';
import PlaceCard from '../../components/place-card/place-card.tsx';
import ReviewList from '../../components/review-list/review-list.tsx';
import { maxNearbyOffers } from '../../const.ts';
import Map from '../../components/map/map.tsx';
import { Point } from '../../types/map-types.ts';

type OfferScreenProps = {
  offers: FullOffers;
  reviews: Reviews;
};

function OfferScreen({ offers, reviews }: OfferScreenProps): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const currentOffer = offers.find((offer) => offer.id === id);
  const currentReviews = reviews.filter((review) => review.offerId === id);

  if (!currentOffer) {
    return <NotFoundScreen />;
  }

  const nearbyOffers = offers
    .filter((offer) => offer.city.name === currentOffer.city.name && offer.id !== currentOffer.id)
    .slice(0, maxNearbyOffers);

  const offersForMap = [...nearbyOffers, currentOffer];
  const city = currentOffer.city;

  const points: Point[] = offersForMap.map((offer) => ({
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  }));

  const selectedPoint: Point = {
    title: currentOffer.title,
    lat: currentOffer.location.latitude,
    lng: currentOffer.location.longitude,
  };

  const {images, isPremium, title, isFavorite, rating, type, bedrooms, maxAdults, price, goods, host, description,} = currentOffer;

  const ratingWidth = `${Math.round(rating) * 20}%`;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/login">
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
                    <img className="offer__avatar user__avatar" src={`/${host.avatarUrl}`} width="74" height="74" alt="Host avatar" />
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
              {nearbyOffers.map((offer) => (
                <PlaceCard key={offer.id} offer={offer} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
