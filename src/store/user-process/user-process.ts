import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthStatus} from '../../const';
import {UserData} from '../../types/user-data';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';

type UserProcess = {
  authStatus: AuthStatus;
  user: UserData | null;
};

const initialState: UserProcess = {
  authStatus: AuthStatus.Unknown,
  user: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.user = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.user = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.user = action.payload;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.user = null;
      });
  }
});
