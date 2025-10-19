import useSWR from 'swr';

import { fetcher } from '@/lib/axios';
import { UserProfile } from '@/types/user';

export function useProfile() {
  const { data, error, isLoading, mutate } = useSWR<UserProfile>('/profile/me', fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}