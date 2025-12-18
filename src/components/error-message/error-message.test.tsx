import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import {NameSpace, SortType} from '../../const';
import ErrorMessage from './error-message';

describe('Component: ErrorMessage', () => {
  it('should not render error message when error is null', () => {
    const { withStoreComponent } = withStore(<ErrorMessage />, {
      [NameSpace.App]: {
        city: 'Paris',
        sortType: SortType.Popular,
        error: null,
      }
    });

    render(withStoreComponent);

    // Проверяем, что компонент вообще не отрендерился
    expect(screen.queryByText(/Error/i)).not.toBeInTheDocument();
  });

  it('should render error message when error is not null', () => {
    const errorMessage = 'Test error message';

    const { withStoreComponent } = withStore(<ErrorMessage />, {
      [NameSpace.App]: {
        city: 'Paris',
        sortType: SortType.Popular,
        error: errorMessage,
      }
    });

    render(withStoreComponent);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage).closest('div')).toHaveClass('error-message');
  });
});
