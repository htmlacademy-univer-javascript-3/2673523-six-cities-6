import {Reviews} from '../../types/offer-info.ts';
import Review from '../review/review.tsx';

type ReviewListProps = {
  reviews: Reviews;
}

function ReviewList({reviews}: ReviewListProps) : JSX.Element {
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review key={review.id} review={review}/>
        ))}
      </ul>
    </>
  );
}

export default ReviewList;
