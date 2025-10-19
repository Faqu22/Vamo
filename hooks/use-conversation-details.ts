import useSWR from 'swr';
import { fetcher } from '@/lib/axios';
import { Conversation } from '@/types/message';

export function useConversationDetails(conversationId: string) {
  const { data, error, isLoading } = useSWR<Conversation>(
    conversationId ? `/messaging/${conversationId}` : null,
    fetcher
  );

  return {
    conversation: data,
    isLoading,
    isError: error,
  };
}