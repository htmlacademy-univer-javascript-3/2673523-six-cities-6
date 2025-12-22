import { render } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import Map from './map';
import { City } from '../../types/offer-info';
import { Points } from '../../types/map-types';
import { Marker } from 'leaflet';
import useMap from '../../hooks/use-map';
import {CURRENT_CUSTOM_ICON, DEFAULT_CUSTOM_ICON} from '../../const';

vi.mock('../../hooks/use-map', () => ({
  default: vi.fn(),
}));

vi.mock('leaflet', () => {
  const MockMarker = vi.fn().mockImplementation(() => ({
    addTo: vi.fn(),
    setIcon: vi.fn(),
    remove: vi.fn(),
  }));

  const mockLayerGroup = vi.fn().mockReturnValue({
    addTo: vi.fn(),
    clearLayers: vi.fn(),
    remove: vi.fn(),
  });

  const mockIcon = vi.fn();

  const leafletModule = {
    Marker: MockMarker,
    layerGroup: mockLayerGroup,
    icon: mockIcon,
  };

  return {
    ...leafletModule,
    default: leafletModule,
  };
});

describe('Component: Map', () => {
  const mockCity: City = {
    name: 'Amsterdam',
    location: { latitude: 52.370216, longitude: 4.895168, zoom: 10 },
  };

  const mockPoints: Points = [
    { id: '1', title: 'Point 1', lat: 52, lng: 4 },
    { id: '2', title: 'Point 2', lat: 52.1, lng: 4.1 },
    { id: '3', title: 'Point 3', lat: 52.2, lng: 4.2 },
  ];

  const mapInstance = {
    removeLayer: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useMap as unknown as Mock).mockReturnValue(mapInstance);
  });

  it('should initialize map and create markers for points', () => {
    render(<Map city={mockCity} points={mockPoints} selectedPoint={undefined} />);

    expect(useMap).toHaveBeenCalledTimes(1);
    expect(Marker).toHaveBeenCalledTimes(mockPoints.length);
    expect(Marker).toHaveBeenCalledWith({
      lat: mockPoints[0].lat,
      lng: mockPoints[0].lng,
    });
  });

  it('should set correct icons for selected and unselected points', () => {
    const selectedPoint = mockPoints[1];

    render(<Map city={mockCity} points={mockPoints} selectedPoint={selectedPoint} />);

    const mockMarkerAction = Marker as unknown as Mock;
    const markerResults = mockMarkerAction.mock.results;

    expect(markerResults).toHaveLength(3);

    const firstMarker = markerResults[0].value as Marker;
    const secondMarker = markerResults[1].value as Marker;
    const thirdMarker = markerResults[2].value as Marker;

    expect(firstMarker.setIcon).toHaveBeenCalledWith(DEFAULT_CUSTOM_ICON);
    expect(secondMarker.setIcon).toHaveBeenCalledWith(CURRENT_CUSTOM_ICON);
    expect(thirdMarker.setIcon).toHaveBeenCalledWith(DEFAULT_CUSTOM_ICON);
  });
});
