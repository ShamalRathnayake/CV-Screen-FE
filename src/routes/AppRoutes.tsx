import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Protected Routes */}
      {/* <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Route> */}

      {/* Catch-all */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
