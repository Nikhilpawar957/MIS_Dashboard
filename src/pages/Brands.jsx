import React, { useState, useEffect } from 'react';
import BrandsTable from '../components/tables/BrandsTable';
import BrandForm from '../components/forms/BrandForm';
import toastr from "toastr";
import { getAllGroupsApi, getAllChainsApi } from '../services';

function Brands() {
    const [dataTable, setDataTable] = useState(null);

    // NEW: State to track if we are adding (null) or editing (an ID)
    const [selectedBrandId, setSelectedBrandId] = useState(null);

    const [groups, setGroups] = useState([]);
    const [chains, setChains] = useState([]);

    // 2. Wrap group fetching in a useEffect so it only runs once on mount
    useEffect(() => {
        getAllGroupsApi()
            .then((response) => {
                if (response.data) {
                    // Update state with the fetched array
                    setGroups(response.data);
                }
            })
            .catch((error) => {
                console.error("Error Fetching Groups", error);
            });

        getAllChainsApi().then((response) => {
            if (response.data) {
                // Update state with the fetched array
                setChains(response.data);
            }
        })
            .catch((error) => {
                console.error("Error Fetching Chains", error);
            });
    }, []); // Empty dependency array means this runs once on mount

    useEffect(() => {
        const modalElement = document.getElementById("addEditModal");

        const handleModalHidden = () => {
            // Wipes the ID clean. Next time you click edit, it's a guaranteed state change.
            setSelectedBrandId(null);
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

    document.title = "MIS - Brands";

    // NEW: Function to handle adding a new Brand
    const handleAddNew = () => {
        setSelectedBrandId(null); // Clears the ID so the form knows it's a fresh entry
    };
    return (
        <>
            <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
                <div id="kt_app_toolbar_container" className="app-container container-fluid d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex fw-bold fs-3 flex-column justify-content-center my-0">Brands</h1>
                        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                            <li className="breadcrumb-item text-light">
                                <a href="/dashboard" className="text-light text-hover-primary">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <span className="bullet bg-light w-5px h-2px"></span>
                            </li>
                            <li className="breadcrumb-item text-light">Brands</li>
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
                    <BrandsTable
                        groups={groups}
                        chains={chains}
                        onTableReady={setDataTable}
                        onEditClick={setSelectedBrandId} />
                </div>
            </div>

            <div className="modal fade" id="addEditModal" tabIndex="-1" aria-labelledby="addEditModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    {/* UPDATED: Pass the selected ID down to the form */}
                    <BrandForm
                        chains={chains}
                        dataTable={dataTable}
                        toastr={toastr}
                        selectedBrandId={selectedBrandId}
                    />
                </div>
            </div>
        </>
    );
}

export default Brands