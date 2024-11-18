import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Brain, Apple } from 'lucide-react';
import { useAIStore } from '../../store/aiStore';
import { formatDistanceToNow } from 'date-fns';
import type { AIChat } from '../../types/ai';

interface AIChatBotProps {
  type: AIChat['type'];
}

const AIChatBot: React.FC<AIChatBotProps> = ({ type }) => {
  const [message, setMessage] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { createChat, getChat, addMessage } = useAIStore();

  useEffect(() => {
    if (!chatId) {
      const newChatId = createChat(type);
      setChatId(newChatId);
    }
  }, [type, chatId, createChat]);

  const chat = chatId ? getChat(chatId) : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !chatId) return;

    await addMessage(chatId, {
      role: 'user',
      content: message.trim(),
    });
    setMessage('');
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        {type === 'psychology' ? (
          <>
            <Brain className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">Sports Psychologist</h2>
          </>
        ) : (
          <>
            <Apple className="w-5 h-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-gray-900">Nutritionist</h2>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat?.messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Bot className="w-5 h-5 text-gray-600" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p
                className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-primary-100' : 'text-gray-500'
                }`}
              >
                {formatDistanceToNow(message.timestamp, { addSuffix: true })}
              </p>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <div className="w-5 h-5 text-primary-600">U</div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Ask the ${
              type === 'psychology' ? 'sports psychologist' : 'nutritionist'
            } a question...`}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChatBot;