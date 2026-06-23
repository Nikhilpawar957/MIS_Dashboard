import React, { useState } from 'react';
import GroupsTable from '../components/tables/GroupsTable';
import GroupForm from '../components/forms/GroupForm';
import toastr from "toastr";

// ... toastr options remain the same ...

function Groups() {
    const [dataTable, setDataTable] = useState(null);
    
    // NEW: State to track if we are adding (null) or editing (an ID)
    const [selectedGroupId, setSelectedGroupId] = useState(null); 

    document.title = "MIS - Groups";

    // NEW: Function to handle adding a new group
    const handleAddNew = () => {
        setSelectedGroupId(null); // Clears the ID so the form knows it's a fresh entry
    };

    return (
        <>
            <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex fw-bold fs-3 flex-column justify-content-center my-0">Groups</h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li className="breadcrumb-item text-light">
                                <a href="/dashboard" className="text-light text-hover-primary">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-light w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-light">Groups</li>
                        </ul>
                    </div>
                    
                    <div className="d-flex align-items-center gap-2 gap-lg-3">
                        {/* UPDATED: Add onClick to clear the state when opening the modal natively */}
                        <button 
                            className="btn btn-sm fw-bold btn-primary hover-elevate-down" 
                            data-bs-toggle="modal"
                            data-bs-target="#addEditModal"
                            onClick={handleAddNew}
                        >
                            Add New
                        </button>
                    </div>
                </div>
            </div>

            <div id="kt_app_content" className="app-content flex-column-fluid">
                <div id="kt_app_content_container" className="app-container container-fluid">
                    {/* UPDATED: Pass a setter down to the table so the Edit buttons can update the ID */}
                    <GroupsTable 
                        onTableReady={setDataTable} 
                        onEditClick={setSelectedGroupId} 
                    />
                </div>
            </div>

            <div className="modal fade" id="addEditModal" tabIndex="-1" aria-labelledby="addEditModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    {/* UPDATED: Pass the selected ID down to the form */}
                    <GroupForm 
                        dataTable={dataTable} 
                        toastr={toastr} 
                        selectedGroupId={selectedGroupId} 
                    />
                </div>
            </div>
        </>
    );
}

export default Groups;