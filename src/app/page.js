import { ChatContainer } from "@/components/chat-container";

export default function Home() {
  return (
    <div className="h-screen overflow-hidden flex flex-col items-center p-4">
      <main className="h-full w-full max-w-2xl">
        <ChatContainer />
      </main>
    </div>
  );
}
