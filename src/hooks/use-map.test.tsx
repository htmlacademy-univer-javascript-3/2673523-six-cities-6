import { renderHook } from '@testing-library/react';
import { MutableRefObject } from 'react';
import { vi, Mock } from 'vitest';
import leaflet from 'leaflet';
import useMap from './use-map';
import { City } from '../types/offer-info';

vi.mock('leaflet', () => {
  const mapInstance = {
    setView: vi.fn(),
    remove: vi.fn(),
  };

  return {
    default: {
      map: vi.fn().mockReturnValue(mapInstance),
      tileLayer: vi.fn().mockReturnValue({
        addTo: vi.fn(),
      }),
    },
  };
});

describe('Hook: useMap', () => {
  const mockCity: City = {
    name: 'Amsterdam',
    location: { latitude: 52.3, longitude: 4.9, zoom: 10 },
  };

  it('should return map instance and initialize leaflet', () => {
    const mapElement = document.createElement('div');
    const mapRef = { current: mapElement } as MutableRefObject<HTMLElement | null>;

    const { result } = renderHook(() => useMap(mapRef, mockCity));

    expect(leaflet.map).toHaveBeenCalledTimes(1);
    expect(leaflet.map).toHaveBeenCalledWith(mapElement, expect.any(Object));

    expect(leaflet.tileLayer).toHaveBeenCalledTimes(1);

    expect(result.current).not.toBeNull();
    expect(result.current).toHaveProperty('setView');
  });

  it('should update view when city changes', () => {
    const mapElement = document.createElement('div');
    const mapRef = { current: mapElement } as MutableRefObject<HTMLElement | null>;

    const { rerender, result } = renderHook(
      ({ city }) => useMap(mapRef, city),
      { initialProps: { city: mockCity } }
    );

    const mapInstance = result.current as unknown as { setView: Mock };

    vi.clearAllMocks();

    const newCity: City = {
      name: 'Paris',
      location: { latitude: 48.8, longitude: 2.3, zoom: 12 },
    };

    rerender({ city: newCity });

    expect(mapInstance.setView).toHaveBeenCalledTimes(1);
    expect(mapInstance.setView).toHaveBeenCalledWith(
      { lat: newCity.location.latitude, lng: newCity.location.longitude },
      newCity.location.zoom
    );
  });

  it('should not initialize map if ref is null', () => {
    const mapRef = { current: null } as MutableRefObject<HTMLElement | null>;

    const { result } = renderHook(() => useMap(mapRef, mockCity));

    expect(leaflet.map).not.toHaveBeenCalled();
    expect(result.current).toBeNull();
  });
});
