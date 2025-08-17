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
import { FiDownload, FiSearch, FiTrash2 } from "react-icons/fi";

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [users, setUsers] = useState([]);
  const [localAdminsByCity, setLocalAdminsByCity] = useState({});
  const [searchField, setSearchField] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAdminDistrict, setSelectedAdminDistrict] = useState(null);
  const [selectedAdminPanchayat, setSelectedAdminPanchayat] = useState(null);

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
    if (!window.confirm("Delete this user?")) return;
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

  const exportToExcel = (data, fileName) => {
    if (!data || data.length === 0) return alert("No data to export!");
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  // === Users filtering (searchField: name | email | panchayat) ===
  const filteredUsers = users.filter((u) => {
    const fieldVal =
      searchField === "panchayat"
        ? u.panchayat || ""
        : (u[searchField] || "").toString();
    return fieldVal.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // === Admins: flatten localAdminsByCity into array + add district/panchayat fields ===
  const allAdmins = Object.entries(localAdminsByCity).flatMap(([city, admins]) =>
    admins.map((a) => ({
      ...a,
      // normalize fields: some payloads may use city/district/panchayat naming
      city: city,
      district: a.district || city || "",
      panchayat: a.panchayat || a.panchayatName || a.panchayatLGD || "",
    }))
  );

  // Filter admins by global search
  const filteredAdmins = allAdmins.filter((a) => {
    const fieldVal =
      searchField === "panchayat"
        ? a.panchayat || ""
        : (a[searchField] || "").toString();
    return fieldVal.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // If user clicked a district / panchayat chip, further filter admins for table display
  const displayedAdmins = filteredAdmins.filter((a) => {
    if (selectedAdminDistrict && a.district !== selectedAdminDistrict) return false;
    if (selectedAdminPanchayat && a.panchayat !== selectedAdminPanchayat) return false;
    return true;
  });

  // Build grouping: district -> panchayat -> admins[]
  const groupedAdminsByDistrict = allAdmins.reduce((acc, a) => {
    const district = a.district || "Unknown";
    const panch = a.panchayat || "Unknown";
    if (!acc[district]) acc[district] = {};
    if (!acc[district][panch]) acc[district][panch] = [];
    acc[district][panch].push(a);
    return acc;
  }, {});

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 font-sans">
      <h1 className="text-4xl font-bold text-green-800 mb-8 tracking-tight drop-shadow-sm">
        Central Admin Dashboard
      </h1>

      {/* Search Bar */}
      <div className="flex gap-3 mb-6 items-center bg-white/70 p-4 rounded-xl shadow-sm">
        <select
          className="border border-gray-300 rounded-lg p-2 text-sm focus:ring focus:ring-green-200 outline-none"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        >
          <option value="name">Search by Name</option>
          <option value="email">Search by Email</option>
          <option value="panchayat">Search by Panchayat</option>
        </select>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring focus:ring-green-200 outline-none"
          />
          <FiSearch className="absolute top-2.5 right-3 text-gray-400" />
        </div>
        <button
          onClick={() => {
            // clear filters
            setSearchTerm("");
            setSelectedAdminDistrict(null);
            setSelectedAdminPanchayat(null);
          }}
          className="text-sm px-3 py-2 border rounded-lg bg-white hover:bg-gray-50"
        >
          Clear
        </button>
      </div>

      {/* Users Section (stacked) */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 mb-10">
        <SectionHeader
          title="All Users"
          subtitle="Showing users matching the search (or all users if search empty)"
          onExport={() => exportToExcel(filteredUsers, "users_data")}
        />
        <div className="mb-6">
          <PieChartComponent data={chartData} COLORS={COLORS} />
        </div>
        <Table
          columns={[
            "Name",
            "Email",
            "Role",
            "District",
            "State",
            "Pincode",
            "Panchayat",
          ]}
          data={filteredUsers}
          handleDelete={(id) => handleDelete(id, false)}
        />
      </div>

      {/* Admins Section */}
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
        <SectionHeader
          title="Local Admins"
          subtitle="Group by district → panchayat. Click a panchayat to filter."
          onExport={() => exportToExcel(displayedAdmins, "local_admins_data")}
        />

        {/* Districts & Panchayat chips */}
        <div className="mb-6">
          {Object.keys(groupedAdminsByDistrict).length === 0 ? (
            <p className="text-gray-500">No local admin data available.</p>
          ) : (
            Object.entries(groupedAdminsByDistrict).map(([district, panchMap]) => (
              <div key={district} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3
                    className="text-lg font-semibold text-gray-700 cursor-pointer"
                    onClick={() => {
                      // clicking district header selects district and clears panchayat
                      setSelectedAdminDistrict((prev) => (prev === district ? null : district));
                      setSelectedAdminPanchayat(null);
                    }}
                  >
                    {district}{" "}
                    <span className="text-sm text-gray-500 ml-2">
                      ({Object.values(panchMap).reduce((s, arr) => s + arr.length, 0)})
                    </span>
                  </h3>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => exportToExcel(Object.values(panchMap).flat(), `${district}_admins`)}
                      className="text-sm px-3 py-1 border rounded-md bg-white hover:bg-gray-50"
                    >
                      Export {district}
                    </button>
                  </div>
                </div>

                {/* Panchayat chips */}
                <div className="flex flex-wrap gap-2">
                  {Object.entries(panchMap).map(([panch, arr]) => {
                    const isActive =
                      selectedAdminDistrict === district && selectedAdminPanchayat === panch;
                    return (
                      <button
                        key={panch}
                        onClick={() => {
                          setSelectedAdminDistrict(district);
                          // toggle same panchayat
                          setSelectedAdminPanchayat((prev) => (prev === panch ? null : panch));
                        }}
                        className={`text-sm px-3 py-1 rounded-full border ${
                          isActive
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                        }`}
                        title={`${arr.length} admin(s)`}
                      >
                        {panch} <span className="ml-2 text-xs text-gray-400">({arr.length})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mb-6">
          <PieChartComponent
            data={Object.entries(groupedAdminsByDistrict).map(([district, pMap]) => ({
              district,
              count: Object.values(pMap).reduce((s, arr) => s + arr.length, 0),
            }))}
            COLORS={COLORS}
          />
        </div>

        <Table
          columns={["Name", "Email", "Role", "Panchayat LGD"]}
          data={displayedAdmins.map((a) => ({
            ...a,
            panchayatLGD:
              a.panchayatLGD || Math.floor(100000 + Math.random() * 900000),
          }))}
          handleDelete={(id) => handleDelete(id, true)}
        />
      </div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, onExport }) => (
  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5 gap-3">
    <div>
      <h2 className="text-xl font-semibold text-green-800">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
    <div className="flex items-center gap-3">
      {onExport && (
        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-green-700 text-sm shadow-md transition-all duration-300"
        >
          <FiDownload /> Export
        </button>
      )}
    </div>
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
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
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

const Table = ({ columns, data, handleDelete }) => (
  <div className="overflow-x-auto">
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
              key={u._id || u.id || i}
              className={`${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-green-50 transition-colors duration-200`}
            >
              <td className="px-4 py-2 border">{u.name}</td>
              <td className="px-4 py-2 border">{u.email}</td>
              <td className="px-4 py-2 border">{u.role || "User"}</td>
              {columns.includes("District") && (
                <td className="px-4 py-2 border">{u.city || u.district || "-"}</td>
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
                  onClick={() => handleDelete(u._id || u.id)}
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
  </div>
);

export default Dashboard;
