import React from 'react';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatView from '../components/chat/ChatView';
import CoachConnect from '../components/chat/CoachConnect';

const Chat = () => {
  return (
    <div className="flex-1 flex h-[calc(100vh-5rem)] relative">
      <ChatSidebar />
      <ChatView />
      <CoachConnect />
    </div>
  );
};

export default Chat;