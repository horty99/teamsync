import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import type { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className="flex gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
      <img
        src={message.sender.avatar}
        alt={message.sender.name}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{message.sender.name}</span>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(message.timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="text-gray-600 break-words">{message.content}</p>
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 flex gap-2">
            {message.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="relative group/attachment"
              >
                {attachment.type === 'image' && (
                  <img
                    src={attachment.url}
                    alt={attachment.name}
                    className="max-w-xs rounded-lg border border-gray-200"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;