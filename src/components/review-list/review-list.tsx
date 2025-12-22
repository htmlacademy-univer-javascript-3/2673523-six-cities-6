import {Reviews} from '../../types/offer-info';
import Review from '../review/review';
import {MAX_REVIEWS_COUNT} from '../../const';

type ReviewListProps = {
  reviews: Reviews;
}

function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  const sortedReviews = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, MAX_REVIEWS_COUNT);

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {sortedReviews.map((review) => (
          <Review key={review.id} review={review}/>
        ))}
      </ul>
    </>
  );
}

export default ReviewList;
