"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default async function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) router.push("/login");

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          School Management
        </Link>
        {user && (
          <div className="flex items-center space-x-6">
            <Link href="/admin" className="hover:text-gray-200">
              Admin
            </Link>
            <Link href="/teacher" className="hover:text-gray-200">
              Teacher
            </Link>
            <Link href="/student" className="hover:text-gray-200">
              Student
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
