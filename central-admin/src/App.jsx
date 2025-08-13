// App.jsx
import { Routes, Route } from "react-router-dom";

import NoticeUpload from "./pages/NoticeUpload";
import SignInPage from "./components/SignInPage";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import EventForm from "./pages/EventForm";
import SchemeForm from "./pages/SchemeForm";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignInPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notices" element={<NoticeUpload />} />
          <Route path="/event" element={<EventForm />} />
          <Route path="/scheme" element={<SchemeForm />} />
        </Route>
      </Route>

      {/* Default redirect for all other routes */}
      <Route path="*" element={<SignInPage />} />
    </Routes>
  );
}

export default App;
