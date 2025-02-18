"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AssignedTeacherPage() {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacher();
  }, []);

  const fetchTeacher = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/student/assigned-teacher"
      );
      setTeacher(response.data);
    } catch (error) {
      console.error("Error fetching assigned teacher:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Assigned Teacher</h1>
      {teacher ? (
        <div className="bg-white p-6 rounded shadow-md">
          <div className="space-y-4">
            <div>
              <label className="font-semibold">Name:</label>
              <p>{teacher.name}</p>
            </div>
            <div>
              <label className="font-semibold">Email:</label>
              <p>{teacher.email}</p>
            </div>
            <div>
              <label className="font-semibold">Subject:</label>
              <p>{teacher.subject}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No teacher assigned yet.</p>
      )}
    </div>
  );
}
