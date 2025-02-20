"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function RoleBasedRoute({ allowedRoles, children }) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user || !allowedRoles.includes(user.role)) {
      router.push("/unauthorized");
    }
  }, [user, allowedRoles]);

  if (!user || !allowedRoles.includes(user.role)) {
    return <div>Loading...</div>;
  }

  return children;
}
