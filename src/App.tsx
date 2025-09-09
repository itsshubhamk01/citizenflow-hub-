import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Schemes from "./pages/Schemes";
import SchemeDetails from "./pages/SchemeDetails";
import ApplyScheme from "./pages/ApplyScheme";
import Applications from "./pages/Applications";
import ApplicationStatus from "./pages/ApplicationStatus";
import ApplicationReview from "./pages/ApplicationReview";
import Profile from "./pages/Profile";
import ManageSchemes from "./pages/admin/ManageSchemes";
import ManageOfficers from "./pages/admin/ManageOfficers";
import ManageCitizens from "./pages/admin/ManageCitizens";
import Analytics from "./pages/admin/Analytics";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import ServerError from "./pages/ServerError";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user?.role === "Admin" ? <>{children}</> : <Navigate to="/unauthorized" />;
};

const OfficerAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  return user?.role === "Admin" || user?.role === "Officer" ? <>{children}</> : <Navigate to="/unauthorized" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    
    {/* Protected Routes */}
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/schemes" element={<ProtectedRoute><Schemes /></ProtectedRoute>} />
    <Route path="/schemes/:id" element={<ProtectedRoute><SchemeDetails /></ProtectedRoute>} />
    <Route path="/apply/:schemeId" element={<ProtectedRoute><ApplyScheme /></ProtectedRoute>} />
    <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
    <Route path="/applications/:id" element={<ProtectedRoute><ApplicationStatus /></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
    
    {/* Officer/Admin Routes */}
    <Route path="/review/:id" element={<OfficerAdminRoute><ApplicationReview /></OfficerAdminRoute>} />
    
    {/* Admin Only Routes */}
    <Route path="/admin/schemes" element={<AdminRoute><ManageSchemes /></AdminRoute>} />
    <Route path="/admin/officers" element={<AdminRoute><ManageOfficers /></AdminRoute>} />
    <Route path="/admin/citizens" element={<AdminRoute><ManageCitizens /></AdminRoute>} />
    <Route path="/admin/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
    
    {/* Error Pages */}
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="/server-error" element={<ServerError />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
