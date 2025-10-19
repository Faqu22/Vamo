export interface Plan {
  id: string;
  title: string;
  description: string;
  category: 'sport' | 'social' | 'culture';
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

export const MOCK_PLANS: Plan[] = [
  {
    id: '1',
    title: 'Fútbol en Palermo',
    description: 'Partido 5vs5, ¡nos falta uno!',
    category: 'sport',
    coordinate: {
      latitude: -34.572,
      longitude: -58.425,
    },
  },
  {
    id: '2',
    title: 'Café por Villa Crespo',
    description: 'Charla y un buen café para cortar la tarde.',
    category: 'social',
    coordinate: {
      latitude: -34.59,
      longitude: -58.445,
    },
  },
  {
    id: '3',
    title: 'Cine en Recoleta',
    description: 'Vemos los estrenos de la semana.',
    category: 'culture',
    coordinate: {
      latitude: -34.588,
      longitude: -58.395,
    },
  },
];