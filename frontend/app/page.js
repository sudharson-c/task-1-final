"use client";
import LogoutButton from "@/components/LogoutButton";
import ProtectedRoute from "@/components/ProtectedRoute";


export default function Page() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Welcome, {user.name}!</h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Role: {user.role}</p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </ProtectedRoute>
  );
}