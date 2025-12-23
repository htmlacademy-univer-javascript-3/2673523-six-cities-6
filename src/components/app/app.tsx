import { Route, Routes } from 'react-router-dom';
import MainPageScreen from '../../pages/main-page-screen/main-page-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen.tsx';
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
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offers}
          element={<OfferScreen />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
