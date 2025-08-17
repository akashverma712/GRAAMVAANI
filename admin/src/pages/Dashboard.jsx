import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Directly fetch Dhanbad users from backend
        const res = await axios.get("http://localhost:5000/api/admin/krishna/users/Dhanbad");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err.message);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dhanbad District Users</h1>

      {users.length === 0 ? (
        <p>No users found for Dhanbad</p>
      ) : (
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Panchayat</th>
              <th className="border px-4 py-2">Pincode</th>
              <th className="border px-4 py-2">State</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phone}</td>
                <td className="border px-4 py-2">{user.panchayat}</td>
                <td className="border px-4 py-2">{user.pincode}</td>
                <td className="border px-4 py-2">{user.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
