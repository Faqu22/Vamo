import useSWR from 'swr';

import { fetcher } from '@/lib/axios';
import { FrequentPlace } from '@/types/place';

interface FrequentPlacesResponse {
  places: FrequentPlace[];
}

export function useFrequentPlaces() {
  const { data, error, isLoading } = useSWR<FrequentPlacesResponse>('/profile/me/places', fetcher);

  return {
    places: data?.places,
    isLoading,
    isError: error,
  };
}