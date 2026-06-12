import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import AuthLayout from "../layouts/AuthLayout";
import PageLayout from "../layouts/PageLayout";
import SignIn from "../pages/auth/SignIn";

function AppRoutes() {
    return (
        <Routes>

            {/* Auth */}
            <Route element={<AuthLayout />}>
                <Route path="/" element={<SignIn />} />
            </Route>

            {/* Main */}
            <Route element={<PageLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            

        </Routes>
    );
}

export default AppRoutes;