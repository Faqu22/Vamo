export interface NewPlan {
  activity: string;
  description?: string;
  when: 'Ahora' | 'Hoy';
  duration?: number; // in minutes, now optional
  availabilityStart?: string;
  availabilityEnd?: string;
  location?: {
    name: string;
    latitude: number;
    longitude: number;
  };
  capacity: '1:1' | number;
  womenOnly: boolean;
  ageRange: string; // e.g., '18-24'
  visibility: 'Público' | 'Solo por invitación';
}