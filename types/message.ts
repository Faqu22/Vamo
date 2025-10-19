export interface LastMessagePreview {
  text: string;
  timestamp: string; // ISO string
}

export interface ConversationPreview {
  id: string;
  name: string;
  type: 'plan' | 'direct';
  lastMessage: LastMessagePreview;
  unreadCount: number;
}

export interface Sender {
  id: string;
  name: string;
  profilePictureUrl?: string;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string; // ISO string
  sender: Sender;
}

export interface Conversation {
  id: string;
  name: string;
  participants: Sender[]; // Assuming Sender is enough for participants list
  messages: Message[];
}