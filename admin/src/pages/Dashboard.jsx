import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to generate a random LGD number
  const getRandomLGD = () => Math.floor(100000 + Math.random() * 900000);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/admin/krishna/users/Dhanbad"
        );
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

  if (loading)
    return (
      <p className="text-center text-lg text-gray-500 mt-10">Loading users...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 font-semibold mt-10">{error}</p>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Dhanbad District Users
      </h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-600 font-medium">
          No users found for Dhanbad
        </p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="border px-6 py-3 text-left text-gray-700 font-semibold">
                  Name
                </th>
                <th className="border px-6 py-3 text-left text-gray-700 font-semibold">
                  Email
                </th>
                <th className="border px-6 py-3 text-left text-gray-700 font-semibold">
                  Phone
                </th>
                <th className="border px-6 py-3 text-left text-gray-700 font-semibold">
                  Panchayat
                </th>
                <th className="border px-6 py-3 text-left text-gray-700 font-semibold">
                  LGD Number
                </th>
                <th className="border px-6 py-3 text-left text-gray-700 font-semibold">
                  Pincode
                </th>
                <th className="border px-6 py-3 text-left text-gray-700 font-semibold">
                  State
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="border px-6 py-3">{user.name}</td>
                  <td className="border px-6 py-3">{user.email}</td>
                  <td className="border px-6 py-3">{user.phone}</td>
                  <td className="border px-6 py-3">{user.panchayat}</td>
                  <td className="border px-6 py-3">{getRandomLGD()}</td>
                  <td className="border px-6 py-3">{user.pincode}</td>
                  <td className="border px-6 py-3">{user.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
