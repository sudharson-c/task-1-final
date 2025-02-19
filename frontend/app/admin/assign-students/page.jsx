"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AssignStudentsPage() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeachers, setSelectedTeachers] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("accessToken").replace(/"/g, "");
      const [studentsRes, teachersRes] = await Promise.all([
        axios.get(`${process.env.API_URL}/api/admin/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`${process.env.API_URL}/api/admin/teachers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);
      setStudents(studentsRes.data);
      setTeachers(teachersRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (studentId, teacherId) => {
    try {
      const token = sessionStorage.getItem("accessToken").replace(/"/g, "");
      await axios.post(
        "http://localhost:5000/api/admin/assign",
        { studentId, teacherId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Student assigned successfully!");
    } catch (error) {
      console.error("Error assigning student:", error);
    }
  };

  const handleSelectChange = (studentId, teacherId) => {
    setSelectedTeachers((prev) => ({
      ...prev,
      [studentId]: teacherId,
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Assign Students to Teachers</h1>
        <Link
          href="/admin"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Admin
        </Link>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Student</th>
            <th className="p-2">Teacher</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-b text-center">
              <td className="p-2">{student.name}</td>
              <td className="p-2">
                <select
                  onChange={(e) =>
                    handleSelectChange(student.id, e.target.value)
                  }
                  className="p-1 border rounded"
                  value={selectedTeachers[student.id] || ""}
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-2">
                <button
                  onClick={() =>
                    handleAssign(student.id, selectedTeachers[student.id])
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  disabled={!selectedTeachers[student.id]}
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
