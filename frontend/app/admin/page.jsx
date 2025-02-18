"use client";
import RoleBasedRoute from "@/components/RoleBasedRoute";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editUser, setEditUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem("accessToken").replace(/"/g, "");
      const response = await axios.get("http://localhost:5000/api/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    try {
      const token = sessionStorage.getItem("accessToken").replace(/"/g, "");
      await axios.post(
        "http://localhost:5000/api/admin",
        { ...newUser },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUsers();
      setIsModalOpen(false);
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEditUser = async () => {
    try {
      const token = sessionStorage.getItem("accessToken").replace(/"/g, "");
      await axios.put(
        `http://localhost:5000/api/admin/${editUser.id}`,
        {
          name: editUser.name,
          email: editUser.email,
          role: editUser.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUsers();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const openEditModal = (user) => {
    setEditUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      const token = sessionStorage.getItem("accessToken").replace(/"/g, "");

      await axios.delete(`http://localhost:5000/api/admin/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <RoleBasedRoute allowedRoles={["admin"]}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <div className="space-x-4">
            <Link
              href="/admin/assign-students"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Assign Students
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add New User
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">Add New User</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        )}

        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold mb-4">Edit User</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
                <select
                  value={editUser.role}
                  onChange={(e) =>
                    setEditUser({ ...editUser, role: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditUser}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update User
                </button>
              </div>
            </div>
          </div>
        )}

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b text-center">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => openEditModal(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </RoleBasedRoute>
    </div>
  );
}
