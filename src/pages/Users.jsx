import React, { useState } from 'react';
import UsersTable from '../components/tables/UsersTable';
import UserForm from '../components/forms/UserForm';

import toastr from "toastr";

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toastr-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

function Users() {
    const [dataTable, setDataTable] = useState(null);
    document.title = "MIS - Users";
    return (
        <>
            <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex fw-bold fs-3 flex-column justify-content-center my-0">Users
                        </h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li className="breadcrumb-item text-light">
                                <a href="/dashboard" className="text-light text-hover-primary">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-light w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-light">Users</li>
                        </ul>
                    </div>
                    <div className="d-flex align-items-center gap-2 gap-lg-3">
                        <button className="btn btn-sm fw-bold btn-primary hover-elevate-down" data-bs-toggle="modal"
                            data-bs-target="#addEditModal">Add New</button>
                    </div>
                </div>
            </div>
            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-fluid">
                    <UsersTable onTableReady={setDataTable} />
                </div>
            </div>

            <div className="modal fade" id="addEditModal" tabIndex="-1" aria-labelledby="addEditModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <UserForm dataTable={dataTable} toastr={toastr} />
                </div>
            </div>
        </>
    );
}

export default Users;