import { Link } from 'react-router-dom';
import {ShortOffer} from '../../types/offer-info.ts';
import {PlaceCardConfigs, PlaceCardVariant} from '../../types/place-card-types.ts';

type PlaceCardProps = {
  offer: ShortOffer;
  variant: PlaceCardVariant;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  isActive?: boolean;
};

function PlaceCard({ offer, variant, onMouseEnter, onMouseLeave, isActive }: PlaceCardProps): JSX.Element {
  const { id, title, type, price, previewImage, isPremium, isFavorite, rating } = offer;
  const ratingWidth = `${Math.round(rating) * 20}%`;
  const config = PlaceCardConfigs[variant];

  const handleMouseEnter = () => {
    onMouseEnter?.(id);
  };

  const handleMouseLeave = () => {
    onMouseLeave?.();
  };

  const articleClassName = `${config.classNamePref}__card place-card ${isActive ? 'place-card--active' : ''}`;

  return (
    <article
      className={articleClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={`${config.classNamePref}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offers/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={config.image.width}
            height={config.image.height}
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offers/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
