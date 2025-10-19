export interface NewPlan {
  activity: string;
  description?: string;
  when: 'Ahora' | 'Hoy';
  duration?: number; // in minutes, now optional
  availabilityStart?: string;
  availabilityEnd?: string;
  location?: {
    name: string;
    address?: string;
    latitude: number;
    longitude: number;
  };
  locationDescription?: string;
  capacity: number;
  genderPreference: 'any' | 'male' | 'female';
  ageRange: {
    min: number;
    max: number;
  };
  isFlexible: boolean;
  visibility: 'Público' | 'Con Aprobación';
}