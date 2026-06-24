import React from 'react'
import { NavLink } from 'react-router-dom'
import { logoutUser } from '../../hooks/use-auth';

function Sidebar() {
  const role = localStorage.getItem("role");
  return (
    <div id="kt_app_sidebar" className="app-sidebar flex-column" data-kt-drawer="true" data-kt-drawer-name="app-sidebar"
      data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="225px"
      data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle">
      <div className="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
        <a href="/dashboard">
          <span className="app-sidebar-logo-default text-white fw-bolder fs-4">MIS Dashboard</span>
          <span className="app-sidebar-logo-minimize text-white fw-bolder fs-4">MIS</span>
        </a>
        <div id="kt_app_sidebar_toggle"
          className="app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary h-30px w-30px position-absolute top-50 start-100 translate-middle rotate active"
          data-kt-toggle="true" data-kt-toggle-state="active" data-kt-toggle-target="body"
          data-kt-toggle-name="app-sidebar-minimize">
          <i className="ki-duotone ki-left fs-3 rotate-180">
            <span className="path1"></span>
            <span className="path2"></span>
          </i>
        </div>
      </div>
      <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
        <div id="kt_app_sidebar_menu_wrapper" className="app-sidebar-wrapper">
          <div id="kt_app_sidebar_menu_scroll" className="scroll-y my-5 mx-3" data-kt-scroll="true"
            data-kt-scroll-activate="true" data-kt-scroll-height="auto"
            data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
            data-kt-scroll-wrappers="#kt_app_sidebar_menu" data-kt-scroll-offset="5px"
            data-kt-scroll-save-state="true">
            <div className="menu menu-column menu-rounded menu-sub-indention fw-semibold fs-6" id="kt_app_sidebar_menu" data-kt-menu="true" data-kt-menu-expand="false">
              <div className="menu-item">
                <NavLink className="menu-link" to="/dashboard">
                  <span className="menu-icon">
                    <i className="fa-solid fa-chart-line fs-1"></i>
                  </span>
                  <span className="menu-title">Dashboard</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink className="menu-link" to="/groups">
                  <span className="menu-icon">
                      <i className="fa-regular fa-object-group fs-1"></i>
                  </span>
                  <span className="menu-title">Groups</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink className="menu-link" to="/chains">
                  <span className="menu-icon">
                      <i className="fa-solid fa-link fs-1"></i>
                  </span>
                  <span className="menu-title">Chains</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink className="menu-link" to="/brands">
                  <span className="menu-icon">
                      <i className="fa-regular fa-copyright fs-1"></i>
                  </span>
                  <span className="menu-title">Brands</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink className="menu-link" to="/subzones">
                  <span className="menu-icon">
                      <i className="fa-solid fa-globe fs-1"></i>
                  </span>
                  <span className="menu-title">SubZones</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink className="menu-link" to="/estimate">
                  <span className="menu-icon">
                      <i className="fa-solid fa-calculator fs-1"></i>
                  </span>
                  <span className="menu-title">Estimate</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink className="menu-link" to="/invoices">
                  <span className="menu-icon">
                      <i className="fa-solid fa-file-invoice fs-1"></i>
                  </span>
                  <span className="menu-title">Invoices</span>
                </NavLink>
              </div>

            {/* User Management Only for ADMIN */}
            {role === "ADMIN" && (
              <div className="menu-item">
                <NavLink className="menu-link" to="/users">
                  <span className="menu-icon">
                    <i className="fa-solid fa-circle-user fs-1"></i>
                  </span>
                  <span className="menu-title">Users</span>
                </NavLink>
              </div>
              )}

              <div className="menu-item">
                <NavLink className="menu-link" to="/" onClick={logoutUser}>
                  <span className="menu-icon">
                    <i className="fa-solid fa-right-from-bracket fs-1"></i>
                  </span>
                  <span className="menu-title">Sign Out</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar