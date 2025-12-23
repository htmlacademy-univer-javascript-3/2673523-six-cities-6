import { appProcess, changeCity, setSortType, setError } from './app-process';
import { INIT_CITY, SortType} from '../../const';

describe('AppProcess Slice', () => {
  const initialState = {
    city: INIT_CITY,
    sortType: SortType.Popular,
    error: null,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = appProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const result = appProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should change city with "changeCity" action', () => {
    const newCity = 'Amsterdam';
    const action = changeCity(newCity);

    const result = appProcess.reducer(initialState, action);

    expect(result.city).toBe(newCity);
  });

  it('should change sort type with "setSortType" action', () => {
    const newSortType = SortType.PriceHighToLow;
    const action = setSortType(newSortType);

    const result = appProcess.reducer(initialState, action);

    expect(result.sortType).toBe(newSortType);
  });

  it('should set error with "setError" action', () => {
    const error = 'Something went wrong';
    const action = setError(error);

    const result = appProcess.reducer(initialState, action);

    expect(result.error).toBe(error);
  });
});
