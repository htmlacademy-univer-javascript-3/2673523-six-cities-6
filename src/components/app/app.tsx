import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { useMemo } from 'react';

import MainPageScreen from '../../pages/main-page-screen/main-page-screen';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import FavouriteScreen from '../../pages/favorites-screen/favourite-screen.tsx';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';

import { cities } from '../../mocks/cities.ts';
import { reviews } from '../../mocks/review.ts';
import { hosts } from '../../mocks/hosts.ts';
import { offers } from '../../mocks/offers.ts';
import { FullOffers } from '../../types/offer-info.ts';
import {AppRoute, AuthStatus} from '../../const.ts';


function App() {
  const FullOffersList: FullOffers = useMemo(() => offers.map((offer) => {
    const city = cities.find((c) => c.name === offer.cityName);
    const host = hosts.find((h) => h.id === offer.hostId);
    if (!city || !host) {
      throw new Error(`Data assembling error for offer id: ${offer.id}`);
    }
    // Небольшой комментарий к ревью - массив зависимостей пустой не просто так - линтер
    // говорит о том, что изменение offers, cities, hosts повторный рендер не вызовет

    return { ...offer, city, host };
  }), []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPageScreen offers={ FullOffersList } />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Favourites}
          element={
            <PrivateRoute
              authStatus={AuthStatus.NoAuth}
            >
              <FavouriteScreen offers={ FullOffersList }/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offers}
          element={<OfferScreen offers={FullOffersList} reviews={reviews}/>}
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
