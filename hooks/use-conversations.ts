import useSWR from 'swr';
import { fetcher } from '@/lib/axios';
import { ConversationPreview } from '@/types/message';

interface ConversationsResponse {
  conversations: ConversationPreview[];
}

export function useConversations() {
  const { data, error, isLoading } = useSWR<ConversationsResponse>('/messages/conversations', fetcher);

  return {
    conversations: data?.conversations,
    isLoading,
    isError: error,
  };
}