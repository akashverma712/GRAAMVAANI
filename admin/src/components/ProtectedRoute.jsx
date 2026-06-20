// components/ProtectedRoute.jsx
import { useUser, RedirectToSignIn } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  return isSignedIn ? <Outlet /> : <RedirectToSignIn />;
};

export default ProtectedRoute;
