export interface UserProfile {
  name: string;
  age: number;
  profilePictureUrl: string;
}

export const MOCK_USER: UserProfile = {
  name: 'Juan Pérez',
  age: 28,
  // Usaremos una imagen de marcador de posición por ahora
  profilePictureUrl: 'https://via.placeholder.com/150',
};