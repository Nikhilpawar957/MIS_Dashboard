import { Outlet } from "react-router-dom";
import useMetronic from "../hooks/useMetronic";

function AuthLayout() {
    useMetronic();
    return (
        <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center p-12 p-lg-20" style={{ backgroundImage: "url(/media/misc/auth-bg.png)" }}>
            <Outlet />
        </div>
    );
}

export default AuthLayout;