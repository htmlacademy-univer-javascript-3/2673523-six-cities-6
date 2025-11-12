import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';

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
import { loadOffers} from '../../store/actions.ts';

function App() {
  const dispatch = useDispatch();

  const FullOffersList: FullOffers = useMemo(() => offers.map((offer) => {
    const city = cities.find((c) => c.name === offer.cityName);
    const host = hosts.find((h) => h.id === offer.hostId);
    if (!city || !host) {
      throw new Error(`Data assembling error for offer id: ${offer.id}`);
    }
    return { ...offer, city, host };
  }), []);

  useEffect(() => {
    dispatch(loadOffers(FullOffersList));
  }, [dispatch, FullOffersList]);

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
