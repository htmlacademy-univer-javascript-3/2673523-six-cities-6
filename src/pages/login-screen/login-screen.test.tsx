import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginScreen from './login-screen';
import { withHistory, withStore } from '../../utils/mock-component';
import { loginAction } from '../../store/api-actions';

vi.mock('../../store/api-actions', () => ({
  loginAction: vi.fn().mockReturnValue({ type: 'user/login' }),
}));

describe('Component: LoginScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login form correctly', () => {
    const { withStoreComponent } = withStore(withHistory(<LoginScreen />), {});

    render(withStoreComponent);

    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();

    expect(screen.getByTestId('EmailElement')).toBeInTheDocument();
    expect(screen.getByTestId('passwordElement')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();

    expect(screen.getByText(/Paris|Cologne|Brussels|Amsterdam|Hamburg|Dusseldorf/i)).toBeInTheDocument();
  });

  it('should dispatch "loginAction" with entered data when form is submitted', async () => {
    const { withStoreComponent } = withStore(withHistory(<LoginScreen />), {});

    render(withStoreComponent);

    const emailInput = screen.getByTestId('EmailElement');
    const passwordInput = screen.getByTestId('passwordElement');
    const submitButton = screen.getByRole('button', { name: /Sign in/i });

    await userEvent.type(emailInput, 'test@test.ru');
    await userEvent.type(passwordInput, 'q123456');

    await userEvent.click(submitButton);

    expect(loginAction).toHaveBeenCalledTimes(1);

    expect(loginAction).toHaveBeenCalledWith({
      login: 'test@test.ru',
      password: 'q123456',
    });
  });
});
