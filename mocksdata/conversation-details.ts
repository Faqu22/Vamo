import { Conversation } from '@/types/message';

export const MOCK_CONVERSATION_DETAILS: Record<string, Conversation> = {
  'conv-1': {
    id: 'conv-1',
    name: 'Fútbol en Palermo',
    participants: [
      { id: 'user-1', name: 'Tú', profilePictureUrl: 'https://i.pravatar.cc/100?u=currentuser' },
      { id: 'user-2', name: 'Carlos', profilePictureUrl: 'https://i.pravatar.cc/100?u=carlos' },
      { id: 'user-3', name: 'Ana', profilePictureUrl: 'https://i.pravatar.cc/100?u=ana' },
    ],
    messages: [
      {
        id: 'msg-1',
        text: '¡Hola a todos! ¿Quién lleva la pelota hoy?',
        timestamp: '2024-08-15T18:00:00Z',
        sender: { id: 'user-1', name: 'Tú' },
      },
      {
        id: 'msg-2',
        text: 'Yo la llevo, no se preocupen.',
        timestamp: '2024-08-15T18:05:00Z',
        sender: { id: 'user-2', name: 'Carlos' },
      },
      {
        id: 'msg-3',
        text: '¡Genial! Nos vemos a las 19hs.',
        timestamp: '2024-08-15T18:30:00Z',
        sender: { id: 'user-3', name: 'Ana' },
      },
      {
        id: 'msg-4',
        text: 'Perfecto, ya estoy saliendo.',
        timestamp: '2024-08-15T18:45:00Z',
        sender: { id: 'user-1', name: 'Tú' },
      },
    ],
  },
  'conv-2': {
    id: 'conv-2',
    name: 'Café con Ana',
    participants: [
      { id: 'user-1', name: 'Tú', profilePictureUrl: 'https://i.pravatar.cc/100?u=currentuser' },
      { id: 'user-3', name: 'Ana', profilePictureUrl: 'https://i.pravatar.cc/100?u=ana' },
    ],
    messages: [
      {
        id: 'msg-5',
        text: 'Hola Ana, ¿seguimos con el café mañana?',
        timestamp: '2024-08-15T17:00:00Z',
        sender: { id: 'user-1', name: 'Tú' },
      },
      {
        id: 'msg-6',
        text: 'Sí, perfecto. ¿A qué hora te viene bien?',
        timestamp: '2024-08-15T17:10:00Z',
        sender: { id: 'user-3', name: 'Ana' },
      },
      {
        id: 'msg-7',
        text: 'A las 10 AM en La Poesía?',
        timestamp: '2024-08-15T17:20:00Z',
        sender: { id: 'user-1', name: 'Tú' },
      },
      {
        id: 'msg-8',
        text: 'Perfecto, te veo ahí.',
        timestamp: '2024-08-15T17:45:00Z',
        sender: { id: 'user-3', name: 'Ana' },
      },
    ],
  },
  // Add more mock conversations as needed
};