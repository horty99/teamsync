import { create } from 'zustand';
import type { Message, User, Channel } from '../types/chat';

interface ChatState {
  messages: Message[];
  channels: Channel[];
  currentChannel: Channel | null;
  currentUser: User;
  users: User[];
  onlineUsers: User[];
  coachAvailability: {
    online: boolean;
    nextAvailable: Date;
    scheduledMeetings: Array<{
      id: string;
      date: Date;
      playerName: string;
      status: 'scheduled' | 'completed' | 'cancelled';
    }>;
  };
  addMessage: (message: Message) => void;
  setCurrentChannel: (channel: Channel) => void;
  setOnlineUsers: (users: User[]) => void;
  scheduleCoachMeeting: (date: Date) => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
  removeUser: (userId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  channels: [
    {
      id: '1',
      name: 'Team General',
      type: 'team',
      members: [],
    },
    {
      id: '2',
      name: 'Announcements',
      type: 'announcement',
      members: [],
    },
    {
      id: '3',
      name: 'Coach Direct Line',
      type: 'private',
      members: [],
    }
  ],
  currentChannel: null,
  currentUser: {
    id: '1',
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    role: 'player',
    status: 'online',
    preferences: {
      aiSuggestions: true
    }
  },
  users: [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      role: 'player',
      status: 'online',
      preferences: {
        aiSuggestions: true
      }
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop',
      role: 'player',
      status: 'online',
      preferences: {
        aiSuggestions: true
      }
    },
    {
      id: '3',
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      role: 'player',
      status: 'offline',
      preferences: {
        aiSuggestions: true
      }
    },
    {
      id: '4',
      name: 'Coach Thompson',
      email: 'coach.thompson@example.com',
      avatar: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop',
      role: 'coach',
      status: 'online'
    }
  ],
  onlineUsers: [],
  coachAvailability: {
    online: true,
    nextAvailable: new Date(),
    scheduledMeetings: [],
  },
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setCurrentChannel: (channel) =>
    set(() => ({
      currentChannel: channel,
    })),
  setOnlineUsers: (users) =>
    set(() => ({
      onlineUsers: users,
    })),
  scheduleCoachMeeting: (date) =>
    set((state) => ({
      coachAvailability: {
        ...state.coachAvailability,
        scheduledMeetings: [
          ...state.coachAvailability.scheduledMeetings,
          {
            id: Date.now().toString(),
            date,
            playerName: state.currentUser.name,
            status: 'scheduled',
          },
        ],
      },
    })),
  updateUserPreferences: (preferences) =>
    set((state) => ({
      currentUser: {
        ...state.currentUser,
        preferences: {
          ...state.currentUser.preferences,
          ...preferences,
        },
      },
    })),
  removeUser: (userId) =>
    set((state) => ({
      users: state.users.filter(user => user.id !== userId),
      messages: state.messages.filter(message => message.sender.id !== userId),
    })),
}));