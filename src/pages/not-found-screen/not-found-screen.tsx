import Logo from '../../components/logo/logo.tsx';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';


function NotFoundScreen() : JSX.Element {
  return (
    <div className="page page--gray page--not-found">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--not-found">
        <div className="not-found-container container">
          <section className="not-found">
            <h1 className="not-found__title">Page not found</h1>
            <p className="not-found__text">
              You can go to <Link to={AppRoute.Root}>main page</Link>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
