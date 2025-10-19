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
}

export function usePlans({ latitude, longitude, interests, activity }: UsePlansParams) {
  const interestsQuery = interests?.length ? `&interests=${interests.join(',')}` : '';
  const activityQuery = activity ? `&activity=${activity}` : '';

  // Solo obtener si tenemos una ubicación
  const shouldFetch = latitude && longitude;

  const key = shouldFetch
    ? `/plans?latitude=${latitude}&longitude=${longitude}${interestsQuery}${activityQuery}`
    : null;

  const { data, error, isLoading } = useSWR<PlansResponse>(key, fetcher);

  return {
    plans: data?.plans,
    isLoading,
    isError: error,
  };
}