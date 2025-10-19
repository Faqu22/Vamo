import useSWR from 'swr';
import { fetcher } from '@/lib/axios';
import { ConversationPreview } from '@/types/message';

// La API devuelve un array directamente, no un objeto con una clave 'conversations'.
// Por lo tanto, el tipo de datos para useSWR debe ser un array de ConversationPreview.
export function useConversations() {
  const { data, error, isLoading } = useSWR<ConversationPreview[]>('/messaging', fetcher); // Cambiado el tipo a un array

  console.log('useConversations - isLoading:', isLoading);
  console.log('useConversations - error:', error);
  console.log('useConversations - data:', data);

  return {
    conversations: data, // Devolver directamente 'data' ya que es el array
    isLoading,
    isError: error,
  };
}