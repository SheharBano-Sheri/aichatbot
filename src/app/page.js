import { ChatContainer } from "@/components/chat-container";
import { NavBar } from "@/components/nav-bar";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <NavBar />
      <div className="flex-1 min-h-0">
        <ChatContainer />
      </div>
    </div>
  );
}
