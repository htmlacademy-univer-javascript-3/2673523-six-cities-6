export enum PlaceCardVariant {
  Cities = 'cities',
  NearPlaces = 'near-places',
}

type PlaceCardConfig = {
  classNamePref: string;
  image: {
    width: number;
    height: number;
  };
};

export const PlaceCardConfigs: Record<PlaceCardVariant, PlaceCardConfig> = {
  [PlaceCardVariant.Cities]: {
    classNamePref: 'cities',
    image: {
      width: 260,
      height: 200,
    },
  },
  [PlaceCardVariant.NearPlaces]: {
    classNamePref: 'near-places',
    image: {
      width: 260,
      height: 200,
    },
  }
};
