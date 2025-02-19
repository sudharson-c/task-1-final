"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  // const [user] = useLocalStorage("user", null);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("token");

    if (!user || !token) {
      router.push("/login");
    }
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return children;
}
