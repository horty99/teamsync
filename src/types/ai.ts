export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AIChat {
  id: string;
  type: 'psychology' | 'nutrition';
  messages: AIMessage[];
  lastUpdated: Date;
}

export interface AIStore {
  chats: AIChat[];
  addMessage: (chatId: string, message: Omit<AIMessage, 'id' | 'timestamp'>) => Promise<void>;
  createChat: (type: AIChat['type']) => string;
  getChat: (chatId: string) => AIChat | undefined;
}