import { NameSpace, SortType } from '../../const';
import {getCity, getError, getSortType} from './selectors';

describe('AppProcess selectors', () => {
  const state = {
    [NameSpace.App]: {
      city: 'Paris',
      sortType: SortType.Popular,
      error: null,
    }
  };

  it('should return city from state', () => {
    const { city } = state[NameSpace.App];
    const result = getCity(state);
    expect(result).toBe(city);
  });

  it('should return sortType from state', () => {
    const { sortType } = state[NameSpace.App];
    const result = getSortType(state);
    expect(result).toBe(sortType);
  });

  it('should return error from state', () => {
    const { error } = state[NameSpace.App];
    const result = getError(state);
    expect(result).toBe(error);
  });
});
