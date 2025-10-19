import useSWR from 'swr';

import { fetcher } from '@/lib/axios';
import { Plan } from '@/types/plan';

interface PlansResponse {
  plans: Plan[];
}

interface UsePlansParams {
  latitude?: number | null;
  longitude?: number | null;
  interests?: string[];
  activity?: string;
  radius?: number;
}

export function usePlans({
  latitude,
  longitude,
  interests,
  activity,
  radius = 20,
}: UsePlansParams) {
  const interestsQuery = interests?.length ? `&interests=${interests.join(',')}` : '';
  const activityQuery = activity ? `&activity=${activity}` : '';
  const radiusQuery = `&radius=${radius}`;

  // Solo obtener si tenemos una ubicación
  const shouldFetch = latitude && longitude;

  const key = shouldFetch
    ? `/plans?latitude=${latitude}&longitude=${longitude}${radiusQuery}${interestsQuery}${activityQuery}`
    : null;

  const { data, error, isLoading } = useSWR<PlansResponse>(key, fetcher);

  return {
    plans: data?.plans,
    isLoading,
    isError: error,
  };
}