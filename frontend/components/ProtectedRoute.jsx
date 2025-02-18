"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  const user = JSON.parse(localStorage.getItem("user"));
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
