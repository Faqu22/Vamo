export interface Plan {
  id: string;
  activity: string;
  description: string;
  category: 'sport' | 'social' | 'culture' | string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  participantCount?: number;
  capacity?: number;
  age_range_min: number;
  age_range_max: number;
  duration: number;
  gender_preference: string;
  is_flexible: boolean;
  location_name: string;
  location_address: string;
  location_latitude: number;
  location_longitude: number;
  visibility: string;
  when: string;
  availabilityStart?: string;
  availabilityEnd?: string;
}