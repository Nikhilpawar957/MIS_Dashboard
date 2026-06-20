import { useAuth } from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import React from 'react'
import { useEffect } from "react";
import { logoutUser } from '../../hooks/use-auth';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div id="kt_app_header" className="app-header bg-transparent">
      <div className="app-container container-fluid d-flex align-items-stretch justify-content-between" id="kt_app_header_container">
        <div className="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2" title="Show sidebar menu">
          <div className="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_sidebar_mobile_toggle">
            <i className="ki-duotone ki-abstract-14 fs-2 fs-md-1">
              <span className="path1"></span>
              <span className="path2"></span>
            </i>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center flex-grow-1 flex-lg-grow-0">
          <a href="/admin/dashboard" className="d-lg-none">
            <img alt="Logo" src="/media/logos/logo.webp" className="h-30px" />
          </a>
        </div>

        <div className="d-flex align-items-stretch justify-content-end flex-lg-grow-1" >
          <div className="app-navbar flex-shrink-0">
            <div className="app-navbar-item ms-1 ms-md-4" id="kt_header_user_menu_toggle">
              <div className="cursor-pointer symbol symbol-35px" data-kt-menu-trigger="{default: 'click', lg: 'hover'}" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                <img src="/media/avatars/blank.png" className="rounded-3" alt="user" />
              </div>
              <div className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px" data-kt-menu="true">
                <div className="menu-item px-3">
                  <div className="menu-content d-flex align-items-center px-3">
                    <div className="symbol symbol-50px me-5">
                      <img alt="Logo" src="/media/avatars/blank.png" />
                    </div>
                    <div className="d-flex flex-column">
                      <div className="fw-bold d-flex align-items-center fs-5">
                        {user && user.fullName ? user.fullName : "ABC"}
                      </div>
                      <p className="fw-semibold text-muted text-hover-primary fs-7">{user && user.email ? user.email : "abc@mail.com"}</p>
                    </div>
                  </div>
                </div>
                <div className="menu-item px-5">
                  <a href="#" className="menu-link px-5" onClick={logoutUser}>
                    Sign Out
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Header