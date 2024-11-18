import React, { useState, useEffect } from 'react';
import { useChatStore } from '../../store/chatStore';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import AIChatBot from './AIChatBot';

const ChatView = () => {
  const { messages, currentChannel, currentUser } = useChatStore();
  const [activeAI, setActiveAI] = useState<'psychology' | 'nutrition' | null>(null);
  const aiSuggestionsEnabled = currentUser.preferences?.aiSuggestions ?? true;

  // Reset active AI when AI suggestions are disabled
  useEffect(() => {
    if (!aiSuggestionsEnabled) {
      setActiveAI(null);
    }
  }, [aiSuggestionsEnabled]);

  if (activeAI && aiSuggestionsEnabled) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <AIChatBot type={activeAI} />
      </div>
    );
  }

  if (!currentChannel) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Select a channel to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">{currentChannel.name}</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatView;