import { Routes, Route } from "react-router-dom";
import SignInPage from "./components/SignInPage";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
