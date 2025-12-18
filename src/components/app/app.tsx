import { Route, Routes } from 'react-router-dom';
import MainPageScreen from '../../pages/main-page-screen/main-page-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavouriteScreen from '../../pages/favorites-screen/favourite-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import LoadingPage from '../../pages/loading-page/loading-page';

import { AppRoute, AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getAuthStatus } from '../../store/user-process/selectors';
import { getOffersDataLoadingStatus } from '../../store/app-data/selectors';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const authStatus = useAppSelector(getAuthStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);

  if (authStatus === AuthStatus.Unknown || isOffersDataLoading) {
    return <LoadingPage />;
  }

  return (
    <HelmetProvider>
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
            <PrivateRoute>
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
    </HelmetProvider>
  );
}

export default App;
