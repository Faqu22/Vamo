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
}

export function usePlans({
  latitude,
  longitude,
  activity,
  radius = 20,
  ageMin = 18,
  ageMax = 99,
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

    key = `/plans/nearby?${params.toString()}`;
  }
  const { data, error, isLoading } = useSWR<Plan[]>(key, fetcher, {
    refreshInterval: 5000
  });
  return {
    plans: data ?? [],
    isLoading,
    isError: error,
  };
}