import { UserProfile } from '@/types/user';

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'user-abc',
    name: 'Carlos',
    lastName: 'Ruiz',
    age: 28,
    profilePictureUrl: 'https://i.pravatar.cc/150?u=carlosruiz',
    bio: 'Amante del fútbol y la buena comida. Siempre listo para un partido.',
    interests: ['Fútbol', 'Gastronomía', 'Cine'],
  },
  {
    id: 'user-def',
    name: 'Ana',
    lastName: 'Gómez',
    age: 25,
    profilePictureUrl: 'https://i.pravatar.cc/150?u=anagomez',
    bio: 'Explorando la ciudad, un café a la vez. Me encanta el arte y los museos.',
    interests: ['Arte', 'Café', 'Fotografía', 'Viajar'],
  },
];