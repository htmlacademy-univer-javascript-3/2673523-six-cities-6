export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Host = {
  id: string;
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Review = {
  id: string;
  offerId: string;
  date: string;
  user: Host;
  comment: string;
  rating: number;
};

export type ShortOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  cityName: string;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  description: string;
  bedrooms: number;
  goods: string[];
  hostId: string;
  images: string[];
  maxAdults: number;
};

export type FullOffer = Omit<Offer, 'cityName' | 'hostId'> & {
  city: City;
  host: Host;
};

export type Offers = Offer[]

export type ShortOffers = ShortOffer[]

export type FullOffers = FullOffer[]

export type Reviews = Review[]
