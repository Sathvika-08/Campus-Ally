import ChatbotClient from "./chatbot-client";

export default function ChatbotPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold">AI Chatbot</h1>
        <p className="text-muted-foreground mt-2">
          Your personal AI assistant to help with campus questions and resources.
        </p>
      </div>
      <ChatbotClient />
    </div>
  );
}
