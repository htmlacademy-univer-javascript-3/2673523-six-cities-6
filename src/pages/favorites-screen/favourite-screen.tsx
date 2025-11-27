import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import Logo from '../../components/logo/logo.tsx';
import FavoriteCard from '../../components/favourite-card/favourite-card.tsx';
import { FullOffer } from '../../types/offer-info.ts';
import { AppRoute } from '../../const.ts';

function FavouriteScreen(): JSX.Element {
  const allOffers = useAppSelector((state) => state.offers);

  const favoriteOffers = useMemo(
    () => allOffers.filter((offer) => offer.isFavorite),
    [allOffers]
  );

  const favoritesByCity = useMemo(
    () => favoriteOffers.reduce<Record<string, FullOffer[]>>((acc, offer) => {
      const city = offer.city.name;
      if (!acc[city]) {
        acc[city] = [];
      }
      //acc[city].push(offer);
      return acc;
    }, {}),
    [favoriteOffers]
  );

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favourites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">{favoriteOffers.length}</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(favoritesByCity).map(([city, offersInCity]) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {offersInCity.map((offer) => (
                      <FavoriteCard key={offer.id} offer={offer} />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

export default FavouriteScreen;
