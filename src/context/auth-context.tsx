// src/context/auth-context.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { app, db } from "@/firebase";
import { usePathname, useRouter } from "next/navigation";

interface UserProfile extends DocumentData {
    uid: string;
    email: string;
    role: 'student' | 'admin';
}

interface AuthContextType {
  user: User | null;
  userData: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, userData: null, loading: true });

const protectedRoutes = ["/chatbot", "/wellness", "/events"];
const adminRoutes = ["/admin"];
const publicRoutes = ["/login", "/signup"];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data() as UserProfile);
        } else {
          setUserData(null);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (loading) return;

    const isProtectedRoute = protectedRoutes.includes(pathname) || pathname === "/";
    const isPublicRoute = publicRoutes.includes(pathname);
    const isAdminRoute = adminRoutes.includes(pathname);

    if (!user && (isProtectedRoute || isAdminRoute)) {
      router.push("/login");
    } else if (user && isPublicRoute) {
      router.push("/");
    } else if (user && isAdminRoute && userData?.role !== 'admin') {
      // If a non-admin tries to access an admin route, redirect them
      router.push("/");
    }

  }, [user, userData, loading, router, pathname]);


  if (loading) {
    // You can render a loading spinner here
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
    );
  }

  // Prevent rendering protected content before redirect
  const isProtectedRoute = protectedRoutes.includes(pathname) || pathname === "/" || adminRoutes.includes(pathname);
  if (!user && isProtectedRoute) {
    return null; 
  }

  // Prevent rendering admin content for non-admins
  if (adminRoutes.includes(pathname) && userData?.role !== 'admin') {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
