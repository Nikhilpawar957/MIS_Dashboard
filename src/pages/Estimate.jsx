import React from 'react'

function Estimate() {
  document.title = "MIS - Estimate";
    return (
        <>
            <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex fw-bold fs-3 flex-column justify-content-center my-0">Estimate</h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li className="breadcrumb-item text-light">
                                <a href="/dashboard" className="text-light text-hover-primary">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-light w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-light">Estimate</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-fluid">
                    {/* UPDATED: Pass a setter down to the table so the Edit buttons can update the ID */}
                    
                </div>
            </div>
        </>
    );
}

export default Estimate