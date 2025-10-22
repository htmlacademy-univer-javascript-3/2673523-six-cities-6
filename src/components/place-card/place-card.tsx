import { Link } from 'react-router-dom';
import { FullOffer } from '../../types/offer-info.ts';

type PlaceCardProps = {
  offer: FullOffer;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  //Пока что заглушка от сообщение линтера,т.к отображения маркеров предложений на карте будем делать позже
  isActive?: boolean;
};

function PlaceCard({ offer, onMouseEnter, onMouseLeave, isActive }: PlaceCardProps): JSX.Element {
  const { id, title, type, price, previewImage, isPremium, isFavorite, rating } = offer;
  const ratingWidth = `${Math.round(rating) * 20}%`;

  const handleMouseEnter = () => {
    onMouseEnter?.(id);
  };

  const handleMouseLeave = () => {
    onMouseLeave?.();
  };

  const articleClassName = `cities__card place-card ${isActive ? 'place-card--active' : ''}`;

  return (
    <article className={articleClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offers/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
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
