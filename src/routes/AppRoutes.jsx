import { Routes, Route } from "react-router-dom";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import PageLayout from "../layouts/PageLayout";

// Pages
// Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Main
import Dashboard from "../pages/Dashboard";
import Groups from "../pages/Groups";
import Users from "../pages/Users";

// Errors
import Error404 from "../pages/errors/Error404";
import ProtectedRoute from "./ProtectedRoute";
import Error403 from "../pages/errors/Error403";

function AppRoutes() {
    return (
        <Routes>

            {/* Auth */}
            <Route element={<AuthLayout />}>
                <Route path="/" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Main */}
            <Route element={<PageLayout />}>

                {/* Dashboard */}
                <Route path="/dashboard" element={
                    <ProtectedRoute allowedRoles={["ADMIN", "SALES"]}>
                        <Dashboard />
                    </ProtectedRoute>
                    } />

                {/* Groups */}
                <Route path="/groups" element={
                    <ProtectedRoute allowedRoles={["ADMIN", "SALES"]}>
                        <Groups />
                    </ProtectedRoute>
                } />

                {/* Users */}
                <Route path="/users" element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <Users />
                    </ProtectedRoute>
                    } />
            </Route>

            <Route path="/unauthorized" element={<Error403 />} />
            <Route path="*" element={<Error404 />} />

        </Routes>
    );
}

export default AppRoutes;