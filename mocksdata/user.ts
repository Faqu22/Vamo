export interface UserProfile {
  name: string;
  lastName: string;
  age: number;
  profilePictureUrl: string;
  bio: string;
  interests: string[];
}

export const MOCK_USER: UserProfile = {
  name: 'Juan',
  lastName: 'Pérez',
  age: 28,
  profilePictureUrl: 'https://i.pravatar.cc/150?u=juanperez',
  bio: 'Amante del buen café, los libros y las caminatas al aire libre. Siempre listo para una nueva aventura.',
  interests: ['Fútbol', 'Cine', 'Gastronomía', 'Viajar', 'Música en vivo'],
};