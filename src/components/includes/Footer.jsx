import React from 'react'

function Footer() {    
    const currentYear = new Date().getFullYear();
    return (
        <div className="app-footer py-4 d-flex flex-lg-column" id="kt_footer">
            <div
                className="app-container container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between">
                <div className="text-gray-900 order-2 order-md-1">
                    <span className="text-muted fw-semibold me-1">
                        <span id="currentYear">{currentYear}</span>&nbsp;
                        &copy;
                        MIS Dashboard
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Footer