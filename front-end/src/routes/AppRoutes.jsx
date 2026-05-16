import { Routes, Route } from "react-router-dom";

import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Apps from "../pages/user/Apps";
import Plans from "../pages/user/Plans";
import Dashboard from "../pages/user/Dashboard";
import Subscriptions from "../pages/user/Subscriptions";
import Payments from "../pages/user/Payments";
import Invoices from "../pages/user/Invoices";
import Profile from "../pages/user/Profile";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageApps from "../pages/admin/ManageApps";
import ManagePlans from "../pages/admin/ManagePlans";
import ManageSubscriptions from "../pages/admin/ManageSubscriptions";
import ManagePayments from "../pages/admin/ManagePayments";
import RevenueReports from "../pages/admin/RevenueReports";

import ProtectedRoute from "../components/layout/ProtectedRoute";
import AdminRoute from "../components/layout/AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User protected routes */}
      <Route
        path="/apps"
        element={
          <ProtectedRoute>
            <Apps />
          </ProtectedRoute>
        }
      />

      <Route
        path="/apps/:appId/plans"
        element={
          <ProtectedRoute>
            <Plans />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/subscriptions"
        element={
          <ProtectedRoute>
            <Subscriptions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/invoices"
        element={
          <ProtectedRoute>
            <Invoices />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Admin protected routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/saas-apps"
        element={
          <AdminRoute>
            <ManageApps />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/plans"
        element={
          <AdminRoute>
            <ManagePlans />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/subscriptions"
        element={
          <AdminRoute>
            <ManageSubscriptions />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/payments"
        element={
          <AdminRoute>
            <ManagePayments />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/reports"
        element={
          <AdminRoute>
            <RevenueReports />
          </AdminRoute>
        }
      />
    </Routes>
  );
}