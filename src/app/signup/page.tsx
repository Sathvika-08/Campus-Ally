// src/app/signup/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAuth, createUserWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { db, app } from "@/firebase";

const formSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  role: z.enum(["student", "admin"], { required_error: "Please select a role." }),
});

type FormData = z.infer<typeof formSchema>;

export default function SignupPage() {
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
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        role: data.role,
      });
      
      // Sign out the user immediately after signup
      await signOut(auth);

      toast({
        title: "Success",
        description: "Account created! Please check your email to verify your account before signing in.",
      });
      router.push("/login");
    } catch (error: any) {
      console.error("Signup error:", error);
      let errorMessage = "An unknown error occurred.";
      if (error.code === 'auth/email-already-in-use') {
          errorMessage = "This email address is already registered. Please try logging in.";
      } else {
          errorMessage = error.message;
      }
      toast({
        variant: "destructive",
        title: "Signup Failed",
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
          <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Get started with Campus Ally today
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
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>
           <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary-foreground hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
