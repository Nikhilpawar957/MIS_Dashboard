import { Routes, Route } from "react-router-dom";

// Layouts
import AuthLayout from "../layouts/AuthLayout";
import PageLayout from "../layouts/PageLayout";

// Pages
// Auth
import SignIn from "../pages/auth/SignIn";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Main
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";

// Errors
import Error_404 from "../pages/errors/Error_404";

function AppRoutes() {
    return (
        <Routes>

            {/* Auth */}
            <Route element={<AuthLayout />}>
                <Route path="/" element={<SignIn />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Main */}
            <Route element={<PageLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
            </Route>

            <Route path="*" element={<Error_404 />} />

        </Routes>
    );
}

export default AppRoutes;