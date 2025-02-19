"use client";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function LogoutButton() {
  const router = useRouter();
  const [, setUser] = useLocalStorage("user", null);

  const handleLogout = () => {
    setUser(null);
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}
