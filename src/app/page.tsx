"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";
import { Bot, CalendarDays, HeartHandshake } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { userData } = useAuth();
  const isAdmin = userData?.role === 'admin';

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <section className="text-center mb-12">
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground to-secondary-foreground">
            {isAdmin ? 'Welcome to Admin Dashboard' : 'Welcome to Campus Ally'}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {isAdmin 
              ? "Your dashboard for managing campus activities and events."
              : "Your all-in-one assistant for navigating campus life. Get answers, check on your wellness, and stay updated with events."
            }
          </p>
        </section>

        <section className={isAdmin ? "flex justify-center" : "grid md:grid-cols-3 gap-6"}>
          {!isAdmin && (
            <>
              <Link href="/chatbot">
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <Bot className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <CardTitle className="font-headline text-2xl">AI Chatbot</CardTitle>
                    </div>
                    <CardDescription className="pt-4">
                      Have questions about campus services, course registration, or facilities? Our AI chatbot has the answers.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/wellness">
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <HeartHandshake className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <CardTitle className="font-headline text-2xl">Wellness Assistant</CardTitle>
                    </div>
                    <CardDescription className="pt-4">
                      Take a moment to check in with yourself. Our wellness assistant provides motivational feedback to support you.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </>
          )}
          <Link href="/events">
            <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <CalendarDays className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="font-headline text-2xl">Events Dashboard</CardTitle>
                </div>
                <CardDescription className="pt-4">
                  Discover what's happening on campus. From workshops to social gatherings, never miss an event.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </section>
      </div>
    </div>
  );
}
