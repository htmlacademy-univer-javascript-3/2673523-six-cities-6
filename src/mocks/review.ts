import {Reviews} from '../types/offer-info.ts';

export const reviews: Reviews = [
  {
    id: 'rev-1',
    offerId: 'offer-1',
    date: '2024-04-24T10:20:30.123Z',
    user: {
      id: 'user-1',
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    rating: 4,
  },
  {
    id: 'rev-2',
    offerId: 'offer-2',
    date: '2024-05-15T12:00:00.000Z',
    user: {
      id: 'user-2',
      name: 'Elena',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    comment:
      'The apartment was even better than expected! The location is perfect, and the host was very welcoming. Highly recommended for a family stay.',
    rating: 5,
  },
  {
    id: 'rev-3',
    offerId: 'offer-3',
    date: '2024-06-01T18:30:00.000Z',
    user: {
      id: 'user-3',
      name: 'Vlad',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    comment:
      'Absolutely perfect! The "premium" tag is well-deserved. The bed was incredibly comfortable and the whole place was spotless. 5 stars!',
    rating: 5,
  },
  {
    id: 'rev-4',
    offerId: 'offer-4',
    date: '2024-03-20T09:00:00.000Z',
    user: {
      id: 'user-4',
      name: 'Masha',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false,
    },
    comment:
      'A great budget option. The room is small but has everything you need for a short stay. Clean and conveniently located.',
    rating: 4,
  },
];
