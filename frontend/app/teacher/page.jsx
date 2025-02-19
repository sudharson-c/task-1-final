"use client";
import RoleBasedRoute from "@/components/RoleBasedRoute";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AssignedStudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/teacher/assigned-students`
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <RoleBasedRoute allowedRoles={["admin", "teacher"]}>
        <h1 className="text-2xl font-bold mb-6">Assigned Students</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="p-2">{student.name}</td>
                <td className="p-2">{student.email}</td>
                <td className="p-2">{student.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </RoleBasedRoute>
    </div>
  );
}
