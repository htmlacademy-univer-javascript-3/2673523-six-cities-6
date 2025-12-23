import {Navigate} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const';
import {useAppSelector} from '../../hooks';
import {ReactNode} from 'react';
import LoadingPage from '../../pages/loading-page/loading-page';
import {getAuthStatus} from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children: ReactNode;
}

function PrivateRoute(props: PrivateRouteProps): ReactNode {
  const {children} = props;

  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthStatus.Unknown) {
    return <LoadingPage />;
  }

  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
