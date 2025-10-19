export interface UserProfile {
  id?: string;
  name: string;
  lastName: string;
  age: number;
  profilePictureUrl: string;
  bio: string;
  interests: string[];
}