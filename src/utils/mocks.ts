import {ThunkDispatch} from '@reduxjs/toolkit';
import {Action} from 'redux';
import {State} from '../types/state.ts';
import { createAPI } from '../service/api.ts';
import {UserData} from '../types/user-data.ts';
import {FullOffer, Review, Reviews, ShortOffer} from '../types/offer-info.ts';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const mockUser: UserData = {
  id: 1,
  email: 'test@test.ru',
  token: 'secret-token',
  avatarUrl: 'https://14.react.pages.academy/static/avatar/1.jpg',
};

export const mockShortOffer : ShortOffer = {
  id: '1',
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 120,
  city: { name: 'Amsterdam', location: { latitude: 52, longitude: 4, zoom: 10 } },
  location: { latitude: 52, longitude: 4, zoom: 10 },
  isFavorite: false,
  isPremium: false,
  previewImage: 'img/1.png',
  rating: 4
};

export const mockFullOffer: FullOffer = {
  ...mockShortOffer,
  description: 'A quiet place',
  bedrooms: 3,
  goods: ['Heating'],
  host: { id: '123', name: 'Host', isPro: true, avatarUrl: 'img/avatar.png' },
  images: ['img/1.png'],
  maxAdults: 4
};

export const mockReview : Review = {
  id: '1',
  offerId: '1',
  date: '2023-01-01',
  user: { id: '2', name: 'User', avatarUrl: 'img/avatar.png', isPro: false },
  comment: 'Great!',
  rating: 5
};

export const mockReviews : Reviews = [mockReview];

