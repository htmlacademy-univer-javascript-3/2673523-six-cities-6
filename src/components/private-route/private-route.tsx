import {Navigate} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const.ts';
import {ReactNode} from 'react';

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: ReactNode;
}

function PrivateRoute(props: PrivateRouteProps): ReactNode {
  const {authStatus, children} = props;

  return (authStatus === AuthStatus.Auth) ? children : <Navigate to={AppRoute.Login}/>;
}

export default PrivateRoute;
