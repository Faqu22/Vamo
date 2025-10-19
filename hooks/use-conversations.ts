import useSWR from 'swr';
import { fetcher } from '@/lib/axios';
import { ConversationPreview } from '@/types/message';

interface ConversationsResponse {
  conversations: ConversationPreview[];
}

export function useConversations() {
  const { data, error, isLoading } = useSWR<ConversationsResponse>('/messaging', fetcher);

  // Añadimos console logs para depuración
  console.log('useConversations - isLoading:', isLoading);
  console.log('useConversations - error:', error);
  console.log('useConversations - data:', data);

  return {
    conversations: data?.conversations,
    isLoading,
    isError: error,
  };
}