import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import List from './list';
import {Point, Points} from '../../types/map-types.ts';

describe('Component: List', () => {
  const mockPoints : Points = [
    { id: '1', title: 'Amsterdam', lat: 52, lng: 4 },
    { id: '2', title: 'Paris', lat: 48, lng: 2 },
    { id: '3', title: 'Berlin', lat: 51, lng: 13 },
  ];

  it('should render correct number of items', () => {
    render(<List points={mockPoints} onListItemHover={vi.fn()} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockPoints.length);

    mockPoints.forEach((point: Point) => {
      expect(screen.getByText(point.title)).toBeInTheDocument();
    });
  });

  it('should call "onListItemHover" when item is hovered', async () => {
    const onListItemHover = vi.fn();

    render(<List points={mockPoints} onListItemHover={onListItemHover} />);

    const firstPointTitle = mockPoints[0].title;
    const itemToHover = screen.getByText(firstPointTitle);

    await userEvent.hover(itemToHover);

    expect(onListItemHover).toHaveBeenCalledTimes(1);

    expect(onListItemHover).toHaveBeenCalledWith(firstPointTitle);
  });
});
