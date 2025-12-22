import { useState, ChangeEvent, FormEvent, Fragment } from 'react';
import {MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {postCommentAction} from '../../store/api-actions';
import {getCommentPostingStatus} from '../../store/app-data/selectors';

type CommentFormProps = {
  offerId: string;
};

const STARS_RATING = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
];

const DEFAULT_RATING = 0;

function CommentForm({ offerId }: CommentFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector(getCommentPostingStatus);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (rating === DEFAULT_RATING || comment.length < MIN_COMMENT_LENGTH || comment.length > MAX_COMMENT_LENGTH) {
      return;
    }

    dispatch(postCommentAction({ offerId, comment, rating }))
      .unwrap()
      .then(() => {
        setRating(0);
        setComment('');
      })
      .catch(() => {
      });
  };

  const isFormValid = rating !== 0 && comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {STARS_RATING.map(({ value, title }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={rating === value}
              onChange={handleRatingChange}
              disabled={isSubmitting}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={handleCommentChange}
        maxLength={MAX_COMMENT_LENGTH}
        disabled={isSubmitting}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set a <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
