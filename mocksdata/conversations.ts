import { ConversationPreview } from '@/types/message';

export const MOCK_CONVERSATIONS: ConversationPreview[] = [
  {
    id: 'conv-1',
    name: 'Fútbol en Palermo',
    type: 'plan',
    lastMessage: {
      text: '¡Nos vemos a las 19hs!',
      timestamp: '2024-08-15T18:30:00Z',
    },
    unreadCount: 2,
  },
  {
    id: 'conv-2',
    name: 'Café con Ana',
    type: 'direct',
    lastMessage: {
      text: 'Perfecto, te veo ahí.',
      timestamp: '2024-08-15T17:45:00Z',
    },
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    name: 'Clase de Yoga',
    type: 'plan',
    lastMessage: {
      text: 'No olvides tu mat!',
      timestamp: '2024-08-14T10:00:00Z',
    },
    unreadCount: 5,
  },
  {
    id: 'conv-4',
    name: 'Cena con amigos',
    type: 'plan',
    lastMessage: {
      text: '¿Alguien tiene alguna preferencia?',
      timestamp: '2024-08-13T20:10:00Z',
    },
    unreadCount: 0,
  },
  {
    id: 'conv-5',
    name: 'Reunión de estudio',
    type: 'plan',
    lastMessage: {
      text: 'Repasemos el capítulo 3.',
      timestamp: '2024-08-12T11:00:00Z',
    },
    unreadCount: 1,
  },
];