// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { app } from "@/firebase";

const formSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const auth = getAuth(app);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      
      if (!userCredential.user.emailVerified) {
        await signOut(auth);
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Your email has not been verified. Please check your inbox for the verification link.",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
      router.push("/");
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "An unknown error occurred.";
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
          errorMessage = "Invalid email or password. Please try again.";
      } else {
          errorMessage = error.message;
      }
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="container mx-auto max-w-sm py-12">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>
           <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary-foreground hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
