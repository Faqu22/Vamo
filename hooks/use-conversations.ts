import useSWR from 'swr';
import { fetcher } from '@/lib/axios';
import { ConversationPreview } from '@/types/message';

<<<<<<< HEAD
// La API devuelve un array directamente, no un objeto con una clave 'conversations'.
// Por lo tanto, el tipo de datos para useSWR debe ser un array de ConversationPreview.
export function useConversations() {
  const { data, error, isLoading } = useSWR<ConversationPreview[]>('/messaging', fetcher); // Cambiado el tipo a un array

  console.log('useConversations - isLoading:', isLoading);
  console.log('useConversations - error:', error);
  console.log('useConversations - data:', data);

  return {
    conversations: data, // Devolver directamente 'data' ya que es el array
=======
interface ConversationsResponse {
  conversations: ConversationPreview[];
}

export function useConversations() {
  const { data, error, isLoading } = useSWR<ConversationsResponse>('/messages/conversations', fetcher);

  return {
    conversations: data?.conversations,
>>>>>>> faa00f36c436d6e0d4f2865aecae423ec57b8a3d
    isLoading,
    isError: error,
  };
}