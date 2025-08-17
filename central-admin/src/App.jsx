// App.jsx
import { Routes, Route } from "react-router-dom";

import NoticeUpload from "./pages/NoticeUpload";
import SignInPage from "./components/SignInPage";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
// import EventForm from "./pages/EventForm";
// import SchemeForm from "./pages/SchemeForm";
import SendSMS from "./components/SendSMS"; // ✅ Added
import AdminEventUpload from "./pages/AdminEventUpload";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/signin" element={<SignInPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notices" element={<NoticeUpload />} />
          {/* <Route path="/event" element={<EventForm />} /> */}
          <Route path="/event" element={<AdminEventUpload />} />
          <Route path="/send-sms" element={<SendSMS />} /> {/* ✅ New SMS page */}
        </Route>
      </Route>

      {/* Default redirect */}
      <Route path="*" element={<SignInPage />} />
    </Routes>
  );
}

export default App;
