"use client";
import axios from "axios";
import { useState } from "react";

export default function AssignMarksPage() {
  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.API_URL}/api/teacher/assign-marks`, {
        studentId,
        subject,
        score,
      });
      alert("Marks assigned successfully!");
    } catch (error) {
      console.error("Error assigning marks:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Assign Marks</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Student ID</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">Score</label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit">Assign Marks</button>
      </form>
    </div>
  );
}
