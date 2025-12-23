import {NameSpace, SortType} from '../../const';
import {State} from '../../types/state';

export const getCity = (state: Pick<State, NameSpace.App>): string => state[NameSpace.App].city;

export const getError = (state: Pick<State, NameSpace.App>): string | null => state[NameSpace.App].error;

export const getSortType = (state: Pick<State, NameSpace.App>): SortType => state[NameSpace.App].sortType;
