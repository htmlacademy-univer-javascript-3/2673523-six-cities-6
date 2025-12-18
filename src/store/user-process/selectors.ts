import {NameSpace, AuthStatus} from '../../const';
import {State} from '../../types/state';
import {UserData} from '../../types/user-data';

type UserState = Pick<State, NameSpace.User>;

export const getAuthStatus = (state: UserState): AuthStatus => state[NameSpace.User].authStatus;

export const getUserData = (state: UserState): UserData | null => state[NameSpace.User].user;
