import useSWR from 'swr';

import { fetcher } from '@/lib/axios';
import { Plan } from '@/types/plan';

interface PlansResponse {
  plans: Plan[];
}

interface UsePlansParams {
  latitude?: number | null;
  longitude?: number | null;
  activity?: string;
  radius?: number;
  ageMin?: number;
  ageMax?: number;
  gender?: 'any' | 'male' | 'female';
  timeOfDay?: 'any' | 'morning' | 'afternoon' | 'night';
}

export function usePlans({
  latitude,
  longitude,
  activity,
  radius = 20,
  ageMin = 18,
  ageMax = 99,
  gender ,
  timeOfDay,
}: UsePlansParams) {
  const shouldFetch = latitude && longitude;

  let key = null;
  if (shouldFetch) {
    const params = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      radius_km: String(radius),
    });

    if (activity) {
      params.append('activity', activity);
    }
    if (ageMin) {
      params.append('age_min', String(ageMin));
    }
    if (ageMax) {
      params.append('age_max', String(ageMax));
    }
    if (gender && gender !== 'any') {
      params.append('gender', gender);
    }
    if (timeOfDay && timeOfDay !== 'any') {
      params.append('time_of_day', timeOfDay);
    }

    key = `/plans/nearby?${params.toString()}`;
  }
  console.log('a', key)
  const { data, error, isLoading } = useSWR<Plan[]>(key, fetcher);
  console.log(data);
  return {
    plans: data ?? [],
    isLoading,
    isError: error,
  };
}