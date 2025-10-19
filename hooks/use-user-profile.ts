import useSWR from 'swr';

import { fetcher } from '@/lib/axios';
import { UserProfile } from '@/types/user';

export function useUserProfile(userId: string | undefined | null) {
  const { data, error, isLoading } = useSWR<UserProfile>(
    userId ? `/profiles/${userId}` : null,
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}