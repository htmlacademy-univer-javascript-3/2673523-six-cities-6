import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import MainPageScreen from '../../pages/main-page-screen/main-page-screen';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import FavouriteScreen from '../../pages/favorites-screen/favourite-screen.tsx';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';

import { reviews } from '../../mocks/review.ts';
import {AppRoute, AuthStatus} from '../../const.ts';
import {loadReviews} from '../../store/actions.ts';
import {useAppSelector} from '../../hooks';
import LoadingPage from '../../pages/loading-page/loading-page.tsx';

function App() {
  const dispatch = useDispatch();
  const authStatus = useAppSelector((state) => state.authStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  useEffect(() => {
    dispatch(loadReviews(reviews));
  }, [dispatch]);

  if (authStatus === AuthStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPageScreen />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Favourites}
          element={
            <PrivateRoute
              authStatus={authStatus}
            >
              <FavouriteScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offers}
          element={<OfferScreen />}
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
