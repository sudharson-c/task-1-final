"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [user] = useLocalStorage("user", null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return children;
}
