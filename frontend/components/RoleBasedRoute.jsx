"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function RoleBasedRoute({ allowedRoles, children }) {
  const router = useRouter();
  const [user] = useLocalStorage("user", null);

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role)) {
      router.push("/unauthorized");
    }
  }, [user, allowedRoles, router]);

  if (!user || !allowedRoles.includes(user.role)) {
    return <div>Loading...</div>;
  }

  return children;
}
