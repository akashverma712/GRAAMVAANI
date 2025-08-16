import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FiDownload, FiArrowUp, FiArrowDown, FiTrash2 } from "react-icons/fi";

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [users, setUsers] = useState([]);
  const [localAdminsByCity, setLocalAdminsByCity] = useState({});
  const [sortField, setSortField] = useState("district");
  const [sortOrder, setSortOrder] = useState("asc");

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF4D4F",
    "#B37FEB",
  ];

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api/admin"
      : "/api/admin";

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/users-data`);
      setChartData(res.data.chartData || []);
      setUsers(res.data.users || []);
      setLocalAdminsByCity(res.data.localAdminsByCity || {});
    } catch (err) {
      console.error("❌ Error fetching dashboard data:", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (userId, isLocalAdmin = false) => {
    if (!window.confirm("⚠️ Delete this user?")) return;
    try {
      const deleteUrl = isLocalAdmin
        ? `${API_URL}/delete-local-admin/${userId}`
        : `${API_URL}/delete-user/${userId}`;
      await axios.delete(deleteUrl);
      fetchData();
    } catch (err) {
      console.error("❌ Error deleting user:", err.message);
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    const valA = (a[sortField] || "").toString().toLowerCase();
    const valB = (b[sortField] || "").toString().toLowerCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const exportToExcel = (data, fileName) => {
    if (data.length === 0) return alert("No data to export!");
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 font-sans">
      <h1 className="text-4xl font-bold text-green-800 mb-10 tracking-tight drop-shadow-sm">
         Central Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
      
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
          <SectionHeader
            title="All Users by District"
            onExport={() => exportToExcel(users, "users_data")}
          />
          <PieChartComponent data={chartData} COLORS={COLORS} />
          <UsersTable
            users={sortedUsers}
            sortField={sortField}
            setSortField={setSortField}
            sortOrder={sortOrder}
            toggleSortOrder={toggleSortOrder}
            handleDelete={handleDelete}
          />
        </div>

  
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
          <SectionHeader
            title="Local Admins by City (From Clerk)"
            onExport={() =>
              exportToExcel(
                Object.values(localAdminsByCity).flat(),
                "local_admins_data"
              )
            }
          />
          <PieChartComponent
            data={Object.entries(localAdminsByCity).map(([city, admins]) => ({
              district: city,
              count: admins.length,
            }))}
            COLORS={COLORS}
          />
          <AdminsTable
            localAdminsByCity={localAdminsByCity}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};


const SectionHeader = ({ title, onExport }) => (
  <div className="flex justify-between items-center mb-5">
    <h2 className="text-xl font-semibold text-green-800">{title}</h2>
    <button
      onClick={onExport}
      className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-green-700 text-sm shadow-md transition-all duration-300"
    >
      <FiDownload /> Export
    </button>
  </div>
);


const PieChartComponent = ({ data, COLORS }) => (
  <div style={{ width: "100%", height: 250 }} className="mb-6">
    <ResponsiveContainer>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="district"
          cx="50%"
          cy="50%"
          outerRadius={85}
          label={({ name, percent }) =>
            `${name} (${(percent * 100).toFixed(0)}%)`
          }
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);


const UsersTable = ({
  users,
  sortField,
  setSortField,
  sortOrder,
  toggleSortOrder,
  handleDelete,
}) => (
  <div className="overflow-x-auto">
    <div className="flex gap-3 mb-4 items-center">
      <select
        className="border border-gray-300 rounded-lg p-2 text-sm focus:ring focus:ring-green-200 outline-none"
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
      >
        <option value="district">Sort by District</option>
        <option value="state">Sort by State</option>
        <option value="role">Sort by Role</option>
      </select>
      <button
        onClick={toggleSortOrder}
        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-lg hover:from-green-600 hover:to-green-700 text-sm flex items-center gap-1 shadow-sm"
      >
        {sortOrder === "asc" ? <FiArrowUp /> : <FiArrowDown />} {sortOrder}
      </button>
    </div>
    <Table
      columns={["Name", "Email", "Role", "District", "State", "Pincode", "Panchayat"]}
      data={users}
      handleDelete={(id) => handleDelete(id, false)}
    />
  </div>
);


const AdminsTable = ({ localAdminsByCity, handleDelete }) => (
  <div className="overflow-x-auto">
    {Object.entries(localAdminsByCity).map(([city, admins]) => (
      <div key={city} className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">{city}</h3>
        <Table
          columns={["Name", "Email", "Role", "Panchayat LGD"]}
          data={admins.map(a => ({
            ...a,
            panchayatLGD: a.panchayatLGD || Math.floor(100000 + Math.random() * 900000)
          }))}
          handleDelete={(id) => handleDelete(id, true)}
        />
      </div>
    ))}
  </div>
);

const Table = ({ columns, data, handleDelete }) => (
  <table className="min-w-full border border-gray-200 text-sm rounded-lg overflow-hidden shadow-sm">
    <thead className="bg-green-50 sticky top-0 z-10">
      <tr>
        {columns.map((col) => (
          <th key={col} className="px-4 py-2 border font-medium text-gray-700">
            {col}
          </th>
        ))}
        <th className="px-4 py-2 border font-medium text-gray-700">Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.length > 0 ? (
        data.map((u, i) => (
          <tr
            key={u.id}
            className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-green-50 transition-colors duration-200`}
          >
            <td className="px-4 py-2 border">{u.name}</td>
            <td className="px-4 py-2 border">{u.email}</td>
            <td className="px-4 py-2 border">{u.role || "User"}</td>
            {columns.includes("District") && (
              <td className="px-4 py-2 border">{u.city}</td>
            )}
            {columns.includes("State") && (
              <td className="px-4 py-2 border">{u.state || "-"}</td>
            )}
            {columns.includes("Pincode") && (
              <td className="px-4 py-2 border">{u.pincode || "-"}</td>
            )}
            {columns.includes("Panchayat") && (
              <td className="px-4 py-2 border">{u.panchayat || "-"}</td>
            )}
            {columns.includes("Panchayat LGD") && (
              <td className="px-4 py-2 border">{u.panchayatLGD}</td>
            )}
            <td className="px-4 py-2 border text-center">
              <button
                onClick={() => handleDelete(u.id)}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg hover:from-red-600 hover:to-red-700 text-xs flex items-center gap-1 justify-center shadow-sm"
              >
                <FiTrash2 /> Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={columns.length + 1}
            className="text-center py-4 text-gray-500 border"
          >
            No data found
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default Dashboard;
