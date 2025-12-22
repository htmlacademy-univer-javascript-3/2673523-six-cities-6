import {Link} from 'react-router-dom';
import React from 'react';
import {AppRoute} from '../../const';

const Logo: React.FC = () => (
  <div className="header__left">
    <Link className="header__logo-link" to={AppRoute.Root}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </Link>
  </div>
);

export default Logo;
