import { fetcher } from '@/lib/axios';
import { ConversationPreview } from '@/types/message';
import useSWR from 'swr';

// La API devuelve un array directamente, no un objeto con una clave 'conversations'.
// Por lo tanto, el tipo de datos para useSWR debe ser un array de ConversationPreview.
export function useConversations() {
  const { data, error, isLoading } = useSWR<ConversationPreview[]>('/messaging', fetcher, {
    refreshInterval: 5000
  }); // Cambiado el tipo a un array

  return {
    conversations: data, // Devolver directamente 'data' ya que es el array
    isLoading,
    isError: error,
  };
}