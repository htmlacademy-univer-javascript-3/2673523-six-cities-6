import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import Header from '../../components/header/header.tsx';
import CommentForm from '../../components/comment-form/comment-form.tsx';
import ReviewList from '../../components/review-list/review-list.tsx';
import Map from '../../components/map/map.tsx';
import PlacesList from '../../components/places-list/places-list.tsx';
import LoadingPage from '../loading-page/loading-page.tsx';
import { ShortOffer } from '../../types/offer-info.ts';
import { Point } from '../../types/map-types.ts';
import { PlaceCardVariant } from '../../types/place-card-types.ts';
import {AuthStatus, MAX_NEARBY_OFFERS} from '../../const.ts';
import {fetchOfferAction} from '../../store/api-actions.ts';
import {getNearbyOffers, getOffer, getOfferDataLoadingStatus, getReviews} from '../../store/app-data/selectors.ts';
import {getAuthStatus} from '../../store/user-process/selectors.ts';

function OfferScreen(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const fullOffer = useAppSelector(getOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getReviews);
  const isOfferLoading = useAppSelector(getOfferDataLoadingStatus);
  const authStatus = useAppSelector(getAuthStatus);

  const [activeNearbyOffer, setActiveNearbyOffer] = useState<ShortOffer | undefined>(undefined);
  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
    }
  }, [id, dispatch]);

  if (isOfferLoading || !fullOffer) {
    return <LoadingPage />;
  }

  const nearbyOffersSlice = nearbyOffers.slice(0, MAX_NEARBY_OFFERS);

  const sortedReviews = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const handleNearbyCardHover = (offerId: string | null) => {
    const newActiveOffer = nearbyOffersSlice.find((offer) => offer.id === offerId);
    setActiveNearbyOffer(newActiveOffer);
  };

  const offersForMap = [...nearbyOffersSlice, fullOffer];
  const points: Point[] = offersForMap.map((offer) => ({
    id: offer.id,
    title: offer.title,
    lat: offer.location.latitude,
    lng: offer.location.longitude,
  }));

  const selectedPoint: Point = {
    id: activeNearbyOffer?.id || fullOffer.id,
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
                <ReviewList reviews={sortedReviews} />
                {authStatus === AuthStatus.Auth && <CommentForm offerId={fullOffer.id} />}
              </section >
            </div>
            <section className="offer__map map">
              <Map
                city={fullOffer.city}
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
                offers={nearbyOffersSlice}
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
