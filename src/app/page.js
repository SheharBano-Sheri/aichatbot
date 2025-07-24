"use client";

import { ChatContainer } from "@/components/chat-container";
import { NavBar } from "@/components/nav-bar";
import { useChat } from "@/components/chat-provider";

export default function Home() {
  const { currentChatId, messages, setMessages } = useChat();

  return (
    <div className="flex flex-col h-full">
      <NavBar />
      <div className="flex-1 min-h-0">
        <ChatContainer
          currentChatId={currentChatId}
          messages={messages}
          onMessagesUpdate={setMessages}
        />
      </div>
    </div>
  );
}
