export interface ActiveUser {
  id: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  interests: string[];
}

export const MOCK_ACTIVE_USERS: ActiveUser[] = [
  { id: '1', age: 25, gender: 'male', interests: ['Fútbol', 'Videojuegos'] },
  { id: '2', age: 30, gender: 'female', interests: ['Cine', 'Arte', 'Gastronomía'] },
  { id: '3', age: 22, gender: 'male', interests: ['Música en vivo', 'Fotografía'] },
  { id: '4', age: 28, gender: 'female', interests: ['Senderismo', 'Fotografía'] },
  { id: '5', age: 35, gender: 'male', interests: ['Gastronomía', 'Fútbol'] },
  { id: '6', age: 26, gender: 'female', interests: ['Música en vivo', 'Cine'] },
  { id: '7', age: 29, gender: 'other', interests: ['Arte', 'Videojuegos'] },
  { id: '8', age: 24, gender: 'male', interests: ['Fútbol', 'Senderismo'] },
  { id: '9', age: 31, gender: 'female', interests: ['Gastronomía', 'Bailar'] },
  { id: '10', age: 27, gender: 'male', interests: ['Cine', 'Videojuegos', 'Viajar'] },
  { id: '11', age: 23, gender: 'female', interests: ['Viajar', 'Fotografía'] },
  { id: '12', age: 32, gender: 'male', interests: ['Música en vivo', 'Gastronomía'] },
  { id: '13', age: 20, gender: 'female', interests: ['Bailar', 'Cine'] },
  { id: '14', age: 33, gender: 'other', interests: ['Arte', 'Senderismo'] },
  { id: '15', age: 28, gender: 'male', interests: ['Fútbol', 'Viajar'] },
];