export interface LocationSearchResult {
  id: string;
  name: string;
  address: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

export const MOCK_LOCATION_RESULTS: LocationSearchResult[] = [
  {
    id: '1',
    name: 'Café La Poesía',
    address: 'Bolívar 734, CABA',
    coordinate: { latitude: -34.6174, longitude: -58.3725 },
  },
  {
    id: '2',
    name: 'Parque Centenario',
    address: 'Av. Díaz Vélez 4800, CABA',
    coordinate: { latitude: -34.606, longitude: -58.442 },
  },
  {
    id: '3',
    name: 'Cine Gaumont',
    address: 'Av. Rivadavia 1635, CABA',
    coordinate: { latitude: -34.608, longitude: -58.39 },
  },
  {
    id: '4',
    name: 'El Ateneo Grand Splendid',
    address: 'Av. Santa Fe 1860, CABA',
    coordinate: { latitude: -34.595, longitude: -58.393 },
  },
  {
    id: '5',
    name: 'Plaza Serrano',
    address: 'Serrano 1554, CABA',
    coordinate: { latitude: -34.588, longitude: -58.427 },
  },
];