"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function StudentProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/api/student/profile`
      );
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Profile</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Name:</label>
            <p>{profile.name}</p>
          </div>
          <div>
            <label className="font-semibold">Email:</label>
            <p>{profile.email}</p>
          </div>
          <div>
            <label className="font-semibold">Role:</label>
            <p>{profile.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
