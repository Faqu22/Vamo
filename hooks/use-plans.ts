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
  const radiusQuery = `&radius_km=${radius}`;

  // Solo obtener si tenemos una ubicación
  const shouldFetch = latitude && longitude;

  const key = shouldFetch
    ? `/plans/nearby?latitude=${latitude}&longitude=${longitude}${radiusQuery}`
    : null;

  const { data, error, isLoading } = useSWR<PlansResponse>(key, fetcher, {
    refreshInterval: 5000, // Revalida cada 5 segundos
  });
  
  return {
    plans: data?.plans ?? [],
    isLoading,
    isError: error,
  };
}