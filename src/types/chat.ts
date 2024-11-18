export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  attachments?: Attachment[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'coach' | 'player' | 'admin' | 'staff';
  status: 'online' | 'offline' | 'away';
  email?: string;
  preferences?: {
    aiSuggestions: boolean;
  };
}

export interface Channel {
  id: string;
  name: string;
  type: 'team' | 'private' | 'announcement';
  members: User[];
  lastMessage?: Message;
}

export interface Attachment {
  id: string;
  type: 'image' | 'document' | 'video';
  url: string;
  name: string;
}

export interface InviteLink {
  id: string;
  code: string;
  createdBy: string;
  createdAt: Date;
  expiresAt: Date;
  maxUses?: number;
  uses: number;
  role: 'player' | 'admin';
  active: boolean;
}