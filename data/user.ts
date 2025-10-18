import { UserProfile } from '../types/user';

// Este es un objeto modificable para simular un almacén de datos para el usuario de prueba.
export let userProfileData: UserProfile = {
  name: 'Juan',
  lastName: 'Pérez',
  age: 28,
  profilePictureUrl: 'https://i.pravatar.cc/150?u=juanperez',
  bio: 'Amante del buen café, los libros y las caminatas al aire libre. Siempre listo para una nueva aventura.',
  interests: ['Fútbol', 'Cine', 'Gastronomía', 'Viajar', 'Música en vivo'],
};

export const updateUserProfile = (newProfileData: UserProfile) => {
  userProfileData = { ...newProfileData };
};