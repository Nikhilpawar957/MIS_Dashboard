import React from "react";

function Dashboard() {
    document.title = "MIS - Dashboard";
    return (
        <>
            <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">Dashboard
                        </h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                        </ul>
                    </div>
                </div>
            </div>
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-fluid">
                    <div className="row">
                        <div className="col-xxl-2 col-xl-3 col-md-4 mb-4">
                            <div className="card card-flush">
                                <div className="card-header">
                                    <div className="card-title d-flex flex-column">
                                        <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">0</span>
                                        <span className="text-gray-500 pt-1 fw-semibold fs-6">Total Groups</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-md-4 mb-4">
                            <div className="card card-flush">
                                <div className="card-header">
                                    <div className="card-title d-flex flex-column">
                                        <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">0</span>
                                        <span className="text-gray-500 pt-1 fw-semibold fs-6">Total Chains</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-md-4 mb-4">
                            <div className="card card-flush">
                                <div className="card-header">
                                    <div className="card-title d-flex flex-column">
                                        <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">0</span>
                                        <span className="text-gray-500 pt-1 fw-semibold fs-6">Total Brands</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-md-4 mb-4">
                            <div className="card card-flush">
                                <div className="card-header">
                                    <div className="card-title d-flex flex-column">
                                        <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">0</span>
                                        <span className="text-gray-500 pt-1 fw-semibold fs-6">Total Estimate</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-md-4 mb-4">
                            <div className="card card-flush">
                                <div className="card-header">
                                    <div className="card-title d-flex flex-column">
                                        <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">0</span>
                                        <span className="text-gray-500 pt-1 fw-semibold fs-6">Total Invoices</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-md-4 mb-4">
                            <div className="card card-flush">
                                <div className="card-header">
                                    <div className="card-title d-flex flex-column">
                                        <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">0</span>
                                        <span className="text-gray-500 pt-1 fw-semibold fs-6">Total Users</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
