import { ChatContainer } from "@/components/chat-container";

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col items-center">
      <main className="h-full w-full">
        <ChatContainer />
      </main>
    </div>
  );
}
