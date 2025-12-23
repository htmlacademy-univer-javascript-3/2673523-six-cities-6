import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitiesList from './cities-list';
import { CITIES } from '../../const';

describe('Component: CitiesList', () => {
  it('should render all cities correctly', () => {
    const activeCity = CITIES[0];
    const onCityChange = vi.fn();

    render(
      <CitiesList
        activeCity={activeCity}
        onCityChange={onCityChange}
      />
    );

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(CITIES.length);

    CITIES.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should apply active class to the selected city', () => {
    const activeCity = CITIES[2];
    const inactiveCity = CITIES[0];

    render(
      <CitiesList
        activeCity={activeCity}
        onCityChange={vi.fn()}
      />
    );

    const activeLink = screen.getByRole('link', { name: activeCity });
    const inactiveLink = screen.getByRole('link', { name: inactiveCity });

    expect(activeLink).toHaveClass('tabs__item--active');
    expect(inactiveLink).not.toHaveClass('tabs__item--active');
  });

  it('should call "onCityChange" when a city is clicked', async () => {
    const onCityChange = vi.fn();
    const activeCity = CITIES[0];
    const targetCity = CITIES[1];

    render(
      <CitiesList
        activeCity={activeCity}
        onCityChange={onCityChange}
      />
    );

    await userEvent.click(screen.getByText(targetCity));

    expect(onCityChange).toBeCalledTimes(1);
    expect(onCityChange).toBeCalledWith(targetCity);
  });
});
