// src/components/layout/header.tsx
"use client";

import Link from "next/link";
import { MainNav } from "./main-nav";
import { GraduationCap, LogOut } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { app } from "@/firebase";

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Logged out successfully" });
      router.push("/login");
    } catch (error) {
      toast({ variant: "destructive", title: "Failed to log out" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary-foreground" />
          <span className="font-bold font-headline text-lg text-primary-foreground">Campus Ally</span>
        </Link>
        
        {user && <MainNav />}

        <div className="ml-auto flex items-center space-x-4">
          {!loading && user && (
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
