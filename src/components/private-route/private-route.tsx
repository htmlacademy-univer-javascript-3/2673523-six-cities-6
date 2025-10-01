import {Navigate} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../const.ts';

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authStatus, children} = props;

  return (
    authStatus === AuthStatus.Auth ? children : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
