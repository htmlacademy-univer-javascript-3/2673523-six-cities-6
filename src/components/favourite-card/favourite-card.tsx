import { Link } from 'react-router-dom';
import { ShortOffer } from '../../types/offer-info';
import { useAppDispatch } from '../../hooks';
import { changeFavoriteStatusAction } from '../../store/api-actions';
import {AppRoute, FavoriteStatus, RATING_MULTIPLIER} from '../../const';

type FavoriteCardProps = {
  offer: ShortOffer;
};

function FavoriteCard({ offer }: FavoriteCardProps): JSX.Element {
  const { id, title, type, price, previewImage, isPremium, rating } = offer;
  const ratingWidth = `${Math.round(rating) * RATING_MULTIPLIER}%`;

  const dispatch = useAppDispatch();

  const handleBookmarkClick = () => {
    dispatch(changeFavoriteStatusAction({
      offerId: id,
      status: FavoriteStatus.Removed
    }));
  };

  const offerLink = AppRoute.Offers.replace(':id', id);

  return (
    <article className="favorites__card place-card">
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={offerLink}>
          <img
            className="place-card__image"
            src={previewImage}
            width="150"
            height="110"
            alt={title}
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={handleBookmarkClick}
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }} data-testid="rating-stars"></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerLink}>{title}</Link>
        </h2>
        <p className="place-card__type" style={{ textTransform: 'capitalize' }}>{type}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
