import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortOptions from './sort-options';
import { SortType } from '../../const';

describe('Component: SortOptions', () => {
  it('should render correctly', () => {
    const currentSort = SortType.Popular;

    render(
      <SortOptions
        activeSortType={currentSort}
        onSortChange={vi.fn()}
      />
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();

    expect(screen.getAllByText(currentSort)).toHaveLength(2);
  });

  it('should toggle options list visibility on click', async () => {
    render(
      <SortOptions
        activeSortType={SortType.Popular}
        onSortChange={vi.fn()}
      />
    );

    const optionsList = screen.getByRole('list');

    const trigger = screen.getAllByText(SortType.Popular)[0];

    expect(optionsList).not.toHaveClass('places__options--opened');

    await userEvent.click(trigger);
    expect(optionsList).toHaveClass('places__options--opened');

    await userEvent.click(trigger);
    expect(optionsList).not.toHaveClass('places__options--opened');
  });

  it('should highlight the active option', () => {
    const activeSort = SortType.PriceHighToLow;

    render(
      <SortOptions
        activeSortType={activeSort}
        onSortChange={vi.fn()}
      />
    );

    const options = screen.getAllByRole('listitem');

    const activeOption = options.find((li) => li.textContent === activeSort);

    expect(activeOption).toHaveClass('places__option--active');
  });
});
