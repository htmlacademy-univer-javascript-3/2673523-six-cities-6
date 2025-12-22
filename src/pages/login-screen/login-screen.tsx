import { useRef, FormEvent, useMemo, MouseEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { changeCity } from '../../store/app-process/app-process';
import { AppRoute, CITIES } from '../../const';
import Logo from '../../components/logo/logo';


function LoginScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const randomCity = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * CITIES.length);
    return CITIES[randomIndex];
  }, []);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const password = passwordRef.current.value;
      const login = loginRef.current.value;

      const isValidPassword = /^(?=.*[a-zA-Z])(?=.*\d)/.test(password);

      if (!isValidPassword) {
        return;
      }

      dispatch(loginAction({
        login,
        password
      }));
    }
  };

  const handleCityClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(changeCity(randomCity));
    navigate(AppRoute.Root);
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  data-testid="EmailElement"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  data-testid="passwordElement"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to={AppRoute.Root}
                onClick={handleCityClick}
              >
                <span>{randomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
