import { FaUsers, FaChartLine, FaCog, FaHome, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useUser, SignOutButton, SignedIn } from "@clerk/clerk-react";

const Sidebar = () => {
  const { user } = useUser();

  return (
    <aside className="w-64 bg-white border-r shadow-md hidden md:flex flex-col justify-between">
      <div>
        <div className="p-4 text-green-700 font-bold text-xl">AdminPanel</div>
        <nav className="flex flex-col gap-2 p-4 text-gray-700">
          <SidebarItem icon={<FaHome />} label="Dashboard" to="/dashboard" />
          <SidebarItem icon={<FaUsers />} label="Event" to="/event" />
          <SidebarItem icon={<FaChartLine />} label="Notices" to="/notices" />
          <SidebarItem icon={<FaCog />} label="Scheme" to="/Scheme" />
        </nav>
      </div>

      {/* User Account Area */}
      <SignedIn>
        <div className="p-4 border-t text-sm text-gray-600 flex items-center gap-2">
          {user?.imageUrl && (
            <img src={user.imageUrl} alt="avatar" className="w-8 h-8 rounded-full" />
          )}
          <div className="flex-1">
            <div>{user?.fullName || "Admin"}</div>
            <div className="text-xs text-gray-500 truncate">{user?.primaryEmailAddress?.emailAddress}</div>
          </div>
          <SignOutButton>
            <button className="text-red-500 hover:text-red-700" title="Sign Out">
              <FaSignOutAlt />
            </button>
          </SignOutButton>
        </div>
      </SignedIn>
    </aside>
  );
};

const SidebarItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 p-2 rounded w-full text-left hover:bg-gray-100 ${
        isActive ? "bg-gray-100 font-bold text-green-600" : ""
      }`
    }
  >
    <span className="text-green-600">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
