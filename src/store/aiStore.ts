import { create } from 'zustand';
import type { AIStore, AIChat, AIMessage } from '../types/ai';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
});

const PSYCHOLOGY_PROMPT = `You are an expert sports psychologist with years of experience working with athletes. 
Your role is to provide mental health support, performance psychology advice, and emotional guidance to athletes and coaches. 
Keep responses concise, practical, and focused on sports psychology principles.`;

const NUTRITION_PROMPT = `You are an expert sports nutritionist specializing in athlete nutrition and performance. 
Your role is to provide evidence-based nutritional advice, meal planning guidance, and recovery recommendations for athletes. 
Keep responses concise and focused on practical nutrition advice for athletes.`;

export const useAIStore = create<AIStore>((set, get) => ({
  chats: [],

  createChat: (type) => {
    const newChat: AIChat = {
      id: Date.now().toString(),
      type,
      messages: [],
      lastUpdated: new Date(),
    };
    set((state) => ({
      chats: [...state.chats, newChat],
    }));
    return newChat.id;
  },

  getChat: (chatId) => {
    return get().chats.find((chat) => chat.id === chatId);
  },

  addMessage: async (chatId, message) => {
    const chat = get().chats.find((c) => c.id === chatId);
    if (!chat) return;

    const newMessage: AIMessage = {
      id: Date.now().toString(),
      ...message,
      timestamp: new Date(),
    };

    // Add user message immediately
    set((state) => ({
      chats: state.chats.map((c) =>
        c.id === chatId
          ? {
              ...c,
              messages: [...c.messages, newMessage],
              lastUpdated: new Date(),
            }
          : c
      ),
    }));

    // Get AI response
    try {
      const systemPrompt = chat.type === 'psychology' ? PSYCHOLOGY_PROMPT : NUTRITION_PROMPT;
      const messages = [
        { role: 'system', content: systemPrompt },
        ...chat.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        { role: message.role, content: message.content },
      ];

      const response = await anthropic.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1024,
        messages,
      });

      const aiMessage: AIMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response.content[0].text,
        timestamp: new Date(),
      };

      // Add AI response
      set((state) => ({
        chats: state.chats.map((c) =>
          c.id === chatId
            ? {
                ...c,
                messages: [...c.messages, aiMessage],
                lastUpdated: new Date(),
              }
            : c
        ),
      }));
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Add error message
      const errorMessage: AIMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };

      set((state) => ({
        chats: state.chats.map((c) =>
          c.id === chatId
            ? {
                ...c,
                messages: [...c.messages, errorMessage],
                lastUpdated: new Date(),
              }
            : c
        ),
      }));
    }
  },
}));