export interface Plan {
  id: string;
  title: string;
  description: string;
  category: 'sport' | 'social' | 'culture' | string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  participantCount?: number;
  capacity?: number;
}