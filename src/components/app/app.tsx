import {Route, Routes} from 'react-router-dom';

import MainPageScreen from '../../pages/main-page-screen/main-page-screen';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import FavouriteScreen from '../../pages/favorites-screen/favourite-screen.tsx';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import HistoryRouter from '../history-route/history-route.tsx';
import LoadingPage from '../../pages/loading-page/loading-page.tsx';

import {AppRoute, AuthStatus} from '../../const.ts';
import {useAppSelector} from '../../hooks';
import browserHistory from '../../browse-history.ts';
import {getAuthStatus} from '../../store/user-process/selectors.ts';
import {getOffersDataLoadingStatus} from '../../store/app-data/selectors.ts';

function App() {
  const authStatus = useAppSelector(getAuthStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);


  if (authStatus === AuthStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
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
    </HistoryRouter>
  );
}

export default App;
