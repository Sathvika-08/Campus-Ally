"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { handleChat } from "./actions";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo(0, scrollAreaRef.current.scrollHeight);
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    startTransition(async () => {
      const result = await handleChat(input);
      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        });
        setMessages(prev => prev.slice(0, -1)); // Remove user message if AI fails
      } else if (result.answer) {
        const assistantMessage: Message = {
          role: "assistant",
          content: result.answer,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="h-[75vh]">
        <CardContent className="p-0 h-full flex flex-col">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                   <Bot size={48} className="mb-4" />
                   <p className="text-lg">Welcome to the Campus Ally Chatbot!</p>
                   <p>Ask me anything about student life, resources, or events.</p>
                </div>
              )}
              {messages.map((message, index) => (
                <div key={index} className={cn("flex items-start gap-3", message.role === "user" ? "justify-end" : "justify-start")}>
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><Bot /></AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn("p-3 rounded-lg max-w-sm", message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                    <p className="text-sm font-code whitespace-pre-wrap">{message.content}</p>
                  </div>
                   {message.role === "user" && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isPending && (
                <div className="flex items-start gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                  <div className="p-3 rounded-lg bg-muted">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                disabled={isPending}
              />
              <Button type="submit" disabled={!input.trim() || isPending}>
                <Send size={18} />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
