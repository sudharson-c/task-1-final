"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    router.push("/login");
  };

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          School Management
        </Link>
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
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
