export interface Plan {
  id: string;
  title: string;
  description: string;
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
    coordinate: {
      latitude: -34.572,
      longitude: -58.425,
    },
  },
  {
    id: '2',
    title: 'Café por Villa Crespo',
    description: 'Charla y un buen café para cortar la tarde.',
    coordinate: {
      latitude: -34.59,
      longitude: -58.445,
    },
  },
  {
    id: '3',
    title: 'Cine en Recoleta',
    description: 'Vemos los estrenos de la semana.',
    coordinate: {
      latitude: -34.588,
      longitude: -58.395,
    },
  },
];