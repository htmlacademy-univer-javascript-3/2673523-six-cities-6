import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { withHistory } from '../../utils/mock-component';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedText = '6 cities logo';
    const expectedRole = 'link';
    const preparedComponent = withHistory(<Logo />);

    render(preparedComponent);

    expect(screen.getByAltText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole(expectedRole)).toBeInTheDocument();
  });
});
