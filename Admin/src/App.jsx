
import { Route, Routes } from "react-router-dom";
import AdminPanel from "./Pages/AdminPanel";
import Dashboard from "./Pages/Dashboard";
import UserTable from "./Components/UserTable";
import AdminLogin from "./Pages/AdminLogin";
import { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from "./Private/PrivateRoute";
import OrdersPage from "./Components/OrdersPage";
import AdminDashboard from "./Pages/AdminDashboard";

export default function App() {
  return <>
   <Routes>
        {/* Public routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected routes */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
       
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/products"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <PrivateRoute>
              <UserTable />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <PrivateRoute>
              <OrdersPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster />

  </>
  
}