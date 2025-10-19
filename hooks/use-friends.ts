import useSWR from 'swr';

import { fetcher } from '@/lib/axios';
import { Friend } from '@/types/friend';

interface FriendsResponse {
  friends: Friend[];
}

export function useFriends() {
  const { data, error, isLoading } = useSWR<FriendsResponse>('/profile/me/friends', fetcher);

  return {
    friends: data?.friends,
    isLoading,
    isError: error,
  };
}