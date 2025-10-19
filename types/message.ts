export interface LastMessagePreview {
  text: string;
  timestamp: string; // ISO string
}

export interface ConversationPreview {
  id: string;
  name: string;
  type: 'PLAN' | 'DIRECT'; // Updated to match API output (e.g., 'PLAN')
  last_message: LastMessagePreview | null; // Updated to match API output and allow null
  unreadCount?: number; // Made optional as it's not in the provided API log
}

export interface Sender {
  id: string;
  name: string;
  profilePictureUrl?: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string; // ISO string
  sender: Sender;
}

export interface Conversation {
  id: string;
  name: string;
  participants: Sender[]; // Assuming Sender is enough for participants list
  messages: Message[];
}