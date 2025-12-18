import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentForm from './comment-form';
import { withStore } from '../../utils/mock-component';
import { NameSpace } from '../../const';
import { postCommentAction } from '../../store/api-actions';
import {mockAppData} from '../../utils/mocks.ts';

vi.mock('../../store/api-actions', async () => {
  const actual = await vi.importActual('../../store/api-actions');
  return {
    ...actual as object,
    postCommentAction: vi.fn(),
  };
});

describe('Component: CommentForm', () => {
  const mockOfferId = '123';

  const makeValidComment = () => 'a'.repeat(60);

  beforeEach(() => {
    vi.clearAllMocks();

    (postCommentAction as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      type: 'data/postComment',
      payload: {},
      unwrap: () => Promise.resolve()
    });
  });

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<CommentForm offerId={mockOfferId} />, {
      [NameSpace.Data]: {
        ...mockAppData,
        isCommentPosting: false,
      }
    });

    render(withStoreComponent);

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();

    const radioButtons = screen.getAllByRole('radio');
    expect(radioButtons).toHaveLength(5);
  });

  it('should render disabled form elements when isCommentPosting is true', () => {
    const { withStoreComponent } = withStore(<CommentForm offerId={mockOfferId} />, {
      [NameSpace.Data]: {
        ...mockAppData,
        isCommentPosting: true,
      }
    });

    render(withStoreComponent);

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Submitting...');

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();

    screen.getAllByRole('radio').forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });

  it('should enable submit button only when form is valid', async () => {
    const { withStoreComponent } = withStore(<CommentForm offerId={mockOfferId} />, {
      [NameSpace.Data]: {
        ...mockAppData,
        isCommentPosting: false
      }
    });

    render(withStoreComponent);
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    const textarea = screen.getByRole('textbox');

    expect(submitButton).toBeDisabled();

    await userEvent.type(textarea, makeValidComment());
    expect(submitButton).toBeDisabled();

    const starInput = screen.getByTitle('perfect');
    await userEvent.click(starInput);

    expect(submitButton).toBeEnabled();

    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'short');
    expect(submitButton).toBeDisabled();
  });

  it('should dispatch "postCommentAction" when valid form is submitted', async () => {
    const { withStoreComponent } = withStore(<CommentForm offerId={mockOfferId} />, {
      [NameSpace.Data]: {
        ...mockAppData,
        isCommentPosting: false
      }
    });

    render(withStoreComponent);

    const textarea = screen.getByRole('textbox');
    const starInput = screen.getByTitle('perfect');
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    await userEvent.type(textarea, makeValidComment());
    await userEvent.click(starInput);

    await userEvent.click(submitButton);

    expect(postCommentAction).toHaveBeenCalledTimes(1);
    expect(postCommentAction).toHaveBeenCalledWith({
      offerId: mockOfferId,
      comment: makeValidComment(),
      rating: 5,
    });
  });
});
