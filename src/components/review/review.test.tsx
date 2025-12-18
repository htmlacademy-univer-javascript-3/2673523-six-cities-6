import { render, screen } from '@testing-library/react';
import Review from './review';
import { mockReview } from '../../utils/mocks';

describe('Component: Review', () => {
  const testReview = {
    ...mockReview,
    rating: 4,
    date: '2023-05-25T12:00:00.000Z',
    comment: 'Super test comment',
    user: {
      ...mockReview.user,
      name: 'TestUser',
      avatarUrl: 'img/test-avatar.jpg'
    }
  };

  it('should render correct user info and comment', () => {
    render(<Review review={testReview} />);

    expect(screen.getByText('TestUser')).toBeInTheDocument();

    expect(screen.getByText('Super test comment')).toBeInTheDocument();

    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'img/test-avatar.jpg');
  });

  it('should render correct rating width', () => {
    render(<Review review={testReview} />);

    const ratingText = screen.getByText('Rating');
    const starsSpan = ratingText.previousSibling;

    expect(starsSpan).toHaveStyle({ width: '80%' });
  });

  it('should render correctly formatted date', () => {
    render(<Review review={testReview} />);

    const dateElement = screen.getByText('May 2023');
    expect(dateElement).toBeInTheDocument();

    expect(dateElement).toHaveAttribute('dateTime', '2023-05-25');
  });
});
