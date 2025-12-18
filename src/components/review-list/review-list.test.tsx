import { render, screen } from '@testing-library/react';
import ReviewList from './review-list';
import { mockReview } from '../../utils/mocks';
import { Review as ReviewType } from '../../types/offer-info';

vi.mock('../review/review', () => ({
  default: ({ review }: { review: ReviewType }) => (
    <li data-testid="review-item-mock">
      {review.comment}
    </li>
  ),
}));

describe('Component: ReviewList', () => {
  const mockReviews: ReviewType[] = [
    { ...mockReview, id: '1', comment: 'Comment 1' },
    { ...mockReview, id: '2', comment: 'Comment 2' },
    { ...mockReview, id: '3', comment: 'Comment 3' },
  ];

  it('should render correct number of reviews', () => {
    render(<ReviewList reviews={mockReviews} />);

    const reviewItems = screen.getAllByTestId('review-item-mock');
    expect(reviewItems).toHaveLength(mockReviews.length);
  });

  it('should display correct review count in the title', () => {
    render(<ReviewList reviews={mockReviews} />);

    expect(screen.getByText(mockReviews.length.toString())).toBeInTheDocument();

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

  it('should render empty list when no reviews provided', () => {
    render(<ReviewList reviews={[]} />);

    const reviewItems = screen.queryAllByTestId('review-item-mock');
    expect(reviewItems).toHaveLength(0);

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
