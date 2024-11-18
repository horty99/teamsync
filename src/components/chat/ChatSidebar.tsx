import React from 'react';
import { Hash, Users, Megaphone, Brain, Apple } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import type { Channel } from '../../types/chat';

const ChatSidebar = () => {
  const { channels, currentChannel, setCurrentChannel } = useChatStore();

  const getChannelIcon = (type: Channel['type']) => {
    switch (type) {
      case 'team':
        return <Hash className="w-4 h-4" />;
      case 'private':
        return <Users className="w-4 h-4" />;
      case 'announcement':
        return <Megaphone className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Channels</h2>
      <div className="space-y-1">
        {channels.map((channel) => (
          <button
            key={channel.id}
            onClick={() => setCurrentChannel(channel)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
              currentChannel?.id === channel.id
                ? 'bg-primary-100 text-primary-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {getChannelIcon(channel.type)}
            <span className="font-medium">{channel.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Assistants</h2>
        <div className="space-y-1">
          <button
            onClick={() => {}}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100"
          >
            <Brain className="w-4 h-4 text-primary-600" />
            <span className="font-medium">Sports Psychologist</span>
          </button>
          <button
            onClick={() => {}}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100"
          >
            <Apple className="w-4 h-4 text-primary-600" />
            <span className="font-medium">Nutritionist</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;