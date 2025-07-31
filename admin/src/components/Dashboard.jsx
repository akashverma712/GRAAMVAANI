import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import UserActions from "../components/UserActions";

export default function Dashboard() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  
  if (user?.publicMetadata?.role !== "local-admin") {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-screen w-full flex bg-green-100">

      <div className="w-[300px] bg-green-800 text-white flex flex-col items-center justify-center px-4 py-6">
        <img
          src={user.imageUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-white mb-4"
        />
        <h2 className="text-2xl font-semibold">Hello,</h2>
        <p className="text-xl">{user.firstName}</p>
      </div>

    
      <div className="flex-1 flex items-center justify-center flex-col relative">
        <UserActions />

        <h1 className="text-4xl font-bold text-green-800 mb-2">Dashboard</h1>
        <p className="text-lg text-gray-700">You are logged in as a Local Admin</p>
      </div>
    </div>
  );
}
