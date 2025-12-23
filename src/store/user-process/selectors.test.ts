import { NameSpace, AuthStatus } from '../../const';
import {getAuthStatus, getUserData,} from './selectors.ts';
import {mockUser} from '../../utils/mocks.ts';

describe('UserProcess selectors', () => {

  const state = {
    [NameSpace.User]: {
      authStatus: AuthStatus.Auth,
      user: mockUser,
    }
  };

  it('should return authStatus from state', () => {
    const { authStatus } = state[NameSpace.User];
    const result = getAuthStatus(state);
    expect(result).toBe(authStatus);
  });

  it('should return userData from state', () => {
    const { user } = state[NameSpace.User];
    const result = getUserData(state);
    expect(result).toEqual(user);
  });
});
