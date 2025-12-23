import { userProcess } from './user-process';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { AuthStatus } from '../../const';
import {mockUser} from '../../utils/mocks.ts';

describe('UserProcess Slice', () => {
  const initialState = {
    authStatus: AuthStatus.Unknown,
    user: null,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = userProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should set "Auth" and user data with "checkAuthAction.fulfilled"', () => {
    const expectedState = { authStatus: AuthStatus.Auth, user: mockUser };

    const result = userProcess.reducer(
      initialState,
      checkAuthAction.fulfilled(mockUser, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected"', () => {
    const expectedState = { authStatus: AuthStatus.NoAuth, user: null };

    const result = userProcess.reducer(
      initialState,
      checkAuthAction.rejected(null, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" and user data with "loginAction.fulfilled"', () => {
    const expectedState = { authStatus: AuthStatus.Auth, user: mockUser };

    const loginArgs = { login: 'test@test.ru', password: '123' };

    const result = userProcess.reducer(
      initialState,
      loginAction.fulfilled(mockUser, '', loginArgs)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" and null user with "logoutAction.fulfilled"', () => {
    const state = { authStatus: AuthStatus.Auth, user: mockUser };
    const expectedState = { authStatus: AuthStatus.NoAuth, user: null };

    const result = userProcess.reducer(state, logoutAction.fulfilled(undefined, '', undefined));

    expect(result).toEqual(expectedState);
  });
});
