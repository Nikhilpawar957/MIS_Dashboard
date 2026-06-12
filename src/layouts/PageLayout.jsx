import { Outlet } from "react-router-dom";
import Header from "../components/includes/Header";
import Sidebar from "../components/includes/Sidebar";
import Footer from "../components/includes/Footer";
import useMetronic from "../hooks/useMetronic";

function PageLayout() {
    useMetronic();
    return (
        <>
            <Header />
            <div className="app-wrapper flex-column flex-row-fluid min-vh-100" id="kt_app_wrapper">
                <Sidebar />
                <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
                    <div className="d-flex flex-column flex-column-fluid">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default PageLayout;