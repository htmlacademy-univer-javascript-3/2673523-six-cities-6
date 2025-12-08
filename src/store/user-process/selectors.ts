import {NameSpace, AuthStatus} from '../../const';
import {State} from '../../types/state';
import {UserData} from '../../types/user-data';

export const getAuthStatus = (state: State): AuthStatus => state[NameSpace.User].authStatus;

export const getIsAuth = (state: State): boolean => state[NameSpace.User].authStatus === AuthStatus.Auth;

export const getUserData = (state: State): UserData | null => state[NameSpace.User].user;
