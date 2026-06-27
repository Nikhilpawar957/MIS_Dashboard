import React, { useState, useEffect } from 'react';
import ChainsTable from "../components/tables/ChainsTable";
import ChainForm from "../components/forms/ChainForm";
import toastr from "toastr";
import { getAllGroupsApi } from '../services';

function Chains() {
    const [dataTable, setDataTable] = useState(null);

    const [selectedChainId, setSelectedChainId] = useState(null);

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        getAllGroupsApi()
            .then((response) => {
                if (response.data) {
                    setGroups(response.data);
                }
            })
            .catch((error) => {
                console.error("Error Fetching Groups", error);
            });
    }, []);

    useEffect(() => {
        const modalElement = document.getElementById("addEditModal");
        
        const handleModalHidden = () => {
            // Wipes the ID clean. Next time you click edit, it's a guaranteed state change.
            setSelectedChainId(null); 
        };

        if (modalElement) {
            modalElement.addEventListener("hidden.bs.modal", handleModalHidden);
        }

        // Cleanup listener on unmount
        return () => {
            if (modalElement) {
                modalElement.removeEventListener("hidden.bs.modal", handleModalHidden);
            }
        };
    }, []);

    document.title = "MIS - Chains";

    const handleAddNew = () => {
        setSelectedChainId(null);
    };

    return (
        <>
            <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex fw-bold fs-3 flex-column justify-content-center my-0">Chains</h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li className="breadcrumb-item text-light">
                                <a href="/dashboard" className="text-light text-hover-primary">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-light w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-light">Chains</li>
                        </ul>
                    </div>

                    <div className="d-flex align-items-center gap-2 gap-lg-3">
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
                    <ChainsTable
                        groups={groups}
                        onTableReady={setDataTable}
                        onEditClick={setSelectedChainId}
                    />
                </div>
            </div>

            <div className="modal fade" id="addEditModal" tabIndex="-1" aria-labelledby="addEditModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    {/* UPDATED: Pass the selected ID down to the form */}
                    <ChainForm
                        groups={groups}
                        dataTable={dataTable}
                        toastr={toastr}
                        selectedChainId={selectedChainId}
                    />
                </div>
            </div>
        </>
    )
}

export default Chains