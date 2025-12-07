import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, INIT_CITY, SortType} from '../../const';

type AppProcess = {
  city: string;
  sortType: SortType;
  error: string | null;
};

const initialState: AppProcess = {
  city: INIT_CITY,
  sortType: SortType.Popular,
  error: null,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {changeCity, setSortType, setError} = appProcess.actions;
